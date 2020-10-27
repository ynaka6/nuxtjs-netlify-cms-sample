import { APIGatewayEvent } from 'aws-lambda'
import { Context, ClientContext, User } from '../utils/types'
import { StripeConst } from '../utils/stripe-helpers'
import faunaFetch from '../utils/fauna'

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
  const plan = require(`../../client/assets/content/plan/${uuid}.json`);
  const author = require(`../../client/assets/content/author/${plan.authorId}.json`);
  let params: Stripe.Checkout.SessionCreateParams;
  if (plan.interval === "monthly") {
    const price = await stripe.prices.create({
      unit_amount: plan.price,
      currency: StripeConst.Currency.JPY,
      recurring: { interval: 'month' },
      product_data: {
        name: `${author.title} - ${plan.title}`
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
    }
  } else {
    params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      line_items: [
        {
          name: `${author.title} - ${plan.title}`,
          amount: plan.price,
          currency: StripeConst.Currency.JPY,
          quantity: 1,
        },
      ],
      success_url: `${event.headers.referer}/thanks`,
      cancel_url: event.headers.referer,
      customer: stripeID,
    }
  }

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
  return {
    statusCode: 200,
    body: JSON.stringify(checkoutSession)
  }
}
