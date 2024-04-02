import type { PageServerLoad, Actions } from './$types'
import medusa from '$lib/server/medusa'
import { error, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ params, locals }) {
   if (!locals.user) throw redirect(307, '/auth?rurl=account/order/' + params.id)
   const order = await medusa.orders.lookupOrder({
      display_id: params.id,
      email: locals.user.email
   })
   .then(({ order }) => order)
   .catch((e) => console.log(e));
       
   if (order.customer.id !== locals.user.id) throw error(403, 'You are not authorized to view this order')
   else return {
      order
   }
}

export const actions: Actions = {
   
}