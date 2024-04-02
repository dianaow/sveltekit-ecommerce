import type { PageServerLoad, Actions } from './$types'
import { fail, error, redirect } from '@sveltejs/kit'
import medusa from '$lib/server/medusa'
//import stripe from '$lib/server/stripe'

export const load: PageServerLoad = async function ({ locals }) {
   if (!locals.user) throw redirect(302, '/auth?rurl=checkout')
      
   // const options = {
	// 	amount: 1000, 
	// 	currency: 'USD',
   //    payment_method: 'pm_card_visa',
   //    automatic_payment_methods: {
   //       enabled: true
   //    }
	// }

	// const paymentIntent = await stripe.paymentIntents.create(options)

   if (!locals.cartid) {
      return false;
   }
   
   let cart = await medusa.carts.createPaymentSessions(locals.cartid)
      .then(({ cart }) => cart)
      .catch((e) => console.log(e))
   if (!cart.total) { throw error(400, { message: 'Could not create payment sessions' })}

   cart = await medusa.carts.setPaymentSession(locals.cartid, { provider_id: 'stripe'})
      .then(({ cart }) => cart)
      .catch((e) => console.log(e))
   if (!cart.total) { throw error(400, { message: 'Could not select payment provider' })}

   let shippingOptions = await medusa.shippingOptions.listCartOptions(locals.cartid)
      .then(({ shipping_options }) => shipping_options)
      .catch((e) => console.log(e));
   if (!shippingOptions) { throw error(400, { message: 'Could not get shipping options' })}

   if(shippingOptions && shippingOptions.length > 0) {
      cart = await medusa.carts.addShippingMethod(locals.cartid, {option_id: shippingOptions[0].id})
      .then(({ cart }) => cart)
      .catch((e) => console.log(e));
   }

   return {
      user: locals.user,
      //cart: locals.cart,
      //clientSecret: paymentIntent.client_secret
      cart,
      shippingOptions
   }
}

export const actions: Actions = {
   default: async ({ locals, cookies }) => {
      //remove cookie first because customer has already paid for the cart
      if (!locals.cartid) {
         return null;
     }

      const reply = await medusa.carts.complete(locals.cartid)
         .catch((e) => console.log(e));

      const order = (reply.type === 'order') ? reply.data : false;

      cookies.set('cartid', '', {
         path: '/',
         maxAge: 0,
         sameSite: 'strict',
         httpOnly: true,
         secure: true
      })
      locals.cartid = ''
      if (order) {
         console.log("PAID WITH ORDER THROUGH")
         return { success: true, order }
      } else {
         console.log('PAID BUT AN ERROR MESSAGE SHOWS')
         return fail (400, { success: false })
      }

   }
}