import { APIGatewayEvent } from 'aws-lambda'
import { Context, ClientContext, User } from '../utils/types'
import { StripeConst } from '../utils/stripe-helpers'
import faunaFetch from '../utils/fauna'
import { Author } from '../../core/entities/Author'
import { Plan } from '../../core/entities/Plan'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  let stripeID: string | undefined = undefined;
  const clientContext: ClientContext | undefined = context.clientContext;
  if (!clientContext || !clientContext.user) {
    return {
      statusCode: 401,
      body: 'Forbidden'
    }
  }
  const user: User = clientContext.user;
  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub,
    },
  });
  if (result.data) {
    stripeID = result.data.getUserByNetlifyID.stripeID
  } else {
    const customer = await stripe.customers.create({ email: user.email } as Stripe.CustomerCreateParams);
    await faunaFetch({
      query: `
        mutation ($netlifyID: ID!, $stripeID: ID!) {
          createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
            netlifyID
            stripeID
          }
        }
      `,
      variables: {
        netlifyID: user.sub,
        stripeID: customer.id,
      },
    });
    stripeID = customer.id
  }
  
  const req = JSON.parse(event.body || '')
  const uuid = req.uuid
  const plan = require(`../../client/content/plan/${uuid}.json`) as Plan;
  const author = require(`../../client/content/author/${plan.authorId}.json`) as Author;
  let params: Stripe.Checkout.SessionCreateParams;
  if (plan.interval === "monthly") {
    const price = await stripe.prices.create({
      unit_amount: (plan.price as number),
      currency: StripeConst.Currency.JPY,
      recurring: { interval: 'month' },
      product_data: {
        name: `${author.title} - ${plan.title}`
      },
      metadata: {
        plan_uuid: uuid,
        author_id: (plan.authorId as string)
      }
    });
    params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        { price: price.id, quantity: 1 },
      ],
      success_url: `${event.headers.referer}/thanks`,
      cancel_url: event.headers.referer,
      customer: stripeID,
      metadata: {
        plan_uuid: uuid,
        author_id: (plan.authorId as string)
      },
    }
  } else {
    params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      line_items: [
        {
          name: `${author.title} - ${plan.title}`,
          amount: (plan.price as number),
          currency: StripeConst.Currency.JPY,
          quantity: 1,
        },
      ],
      success_url: `${event.headers.referer}/thanks`,
      cancel_url: event.headers.referer,
      customer: stripeID,
      metadata: {
        plan_uuid: uuid,
        author_id: (plan.authorId as string)
      },
    }
  }

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
  return {
    statusCode: 200,
    body: JSON.stringify(checkoutSession)
  }
}
