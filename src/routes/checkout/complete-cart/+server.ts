import type { RequestHandler } from './$types'
import medusa from '$lib/server/medusa'
import { fail, error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   if (!locals.cartid) { throw error(400, 'bad format') }
   if (await completeCart(locals)) {
      return json({ success: true })
   } else {
      throw error(500, 'server error')
   }
}

async function completeCart(locals: any) {
  if (!locals.cartid) {
    return null;
  }

  const reply = await medusa.carts.complete(locals.cartid)
    .then((res) => res)
    .catch((e) => console.log(e));

  console.log('completed cart', reply)
  const order = (reply.type === 'order') ? reply.data : false;

  if (order) {
    return { success: true, order: order }
  } else {
    return fail (400, { success: false })
  }
}