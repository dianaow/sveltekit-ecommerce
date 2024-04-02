import type { RequestHandler } from './$types'
import medusa from '$lib/server/medusa'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   const address = await request.json()
   if (!locals.cartid || !address) { throw error(400, 'bad format') }
   const cart = await updateCartShippingAddress(locals, address)
   if (cart) return json(cart)
   else throw error(500, 'server error')
}


async function updateCartShippingAddress(locals: any, address: string) {
   // returns a cart array on success, otherwise null
   if (!locals.cartid) {
       return null;
   }

   return await medusa.carts.update(locals.cartid, {
      shipping_address: address 
   })
   .then(({ cart }) => cart)
   .catch((e) => console.log(e));
}