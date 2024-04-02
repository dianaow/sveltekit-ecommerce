import type { RequestHandler } from './$types'
import medusa from '$lib/server/medusa'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   const data = await request.json()
   let shippingOptionId = data.option_id as string
   if (!locals.cartid || !shippingOptionId) { throw error(500, 'bad format') }
   let cart = await selectShippingOption(locals, shippingOptionId)
   
   if (cart.total) {
      return json(cart)
   } else { 
      throw error(404, 'not found') 
   }
}

async function selectShippingOption(locals: any, shippingOptionId: string) {
   // returns a cart array on success, otherwise null
   if (!locals.cartid || !shippingOptionId) {
       return null;
   }

   return await medusa.carts.addShippingMethod(locals.cartid, {
      option_id: shippingOptionId
   })
   .then(({ cart }) => cart)
   .catch((e) => console.log(e));
}