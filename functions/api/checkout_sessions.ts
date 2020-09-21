import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import { formatAmountForStripe } from '../utils/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export async function handler(event: APIGatewayEvent, context: Context) {
  console.log(event.headers.referer, context)
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  const req = JSON.parse(event.body || '')
  const amount: number = req.amount
  if (!(amount >= 1000 && amount <= 100000)) {
    throw new Error('Invalid amount.')
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'pay',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Custom amount pay',
        amount: formatAmountForStripe(amount, 'jpy'),
        currency: 'jpy',
        quantity: 1,
      },
    ],
    success_url: event.headers.referer,
    cancel_url: event.headers.referer,
  }
  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
  return {
    statusCode: 200,
    body: JSON.stringify(checkoutSession)
  }
}
