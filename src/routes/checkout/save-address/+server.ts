import type { RequestHandler } from './$types'
import medusa from '$lib/server/medusa'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   const address = await request.json()

   if (!locals.cartid || !address) { throw error(400, 'bad format') }
   if (await addShippingAddress(locals, address)) {
      return json({ success: true })
   } else {
      throw error(500, 'server error')
   }
}

async function addShippingAddress(locals: any, address: any) {
   if (!locals.user) {
       return false;
   }

   const success = await medusa.customers.addresses.addAddress(
      { address },
      { "Cookie": `connect.sid=${locals.sid}` }
   )
   .then(({ customer }) => customer)
   //.then(({ response }) => response.status === 200)
   .catch((e) => console.log(e))

   return { success }
}