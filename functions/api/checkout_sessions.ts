import { Context, APIGatewayEvent } from 'aws-lambda'
import { StripeConst } from '../utils/stripe-helpers'

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

  const req = JSON.parse(event.body || '')
  const uuid = req.uuid
  const plan = require(`../../client/assets/content/plan/${uuid}.json`);
  let params: Stripe.Checkout.SessionCreateParams;
  if (plan.interval === "monthly") {
    const price = await stripe.prices.create({
      unit_amount: plan.price,
      currency: StripeConst.Currency.JPY,
      recurring: { interval: 'month' },
      product_data: {
        name: 'Price Testing'
      }
    });
    params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        { price: price.id, quantity: 1 },
      ],
      success_url: event.headers.referer,
      cancel_url: event.headers.referer,
    }
  } else {
    params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'Custom amount pay',
          amount: plan.price,
          currency: StripeConst.Currency.JPY,
          quantity: 1,
        },
      ],
      success_url: event.headers.referer,
      cancel_url: event.headers.referer,
    }
  }

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
  return {
    statusCode: 200,
    body: JSON.stringify(checkoutSession)
  }
}
