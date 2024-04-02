import type { PageServerLoad, Actions } from './$types'
import { fail } from '@sveltejs/kit'
import medusa from '$lib/server/medusa'

export const actions: Actions = {

   add: async ({ request, locals, cookies }) => {
    console.log(request, locals)
      const data = await request.formData()
      const variantId = data.get('variantId') as string
      const cartId = locals.cartid || (await createCart(locals, cookies));
      const cart = await addToCart(cartId, variantId)
      console.log('added to cart', data)
      if (cart) return { success: true, cart }
   },

   remove: async({ request, locals }) => {
      const data = await request.formData()
      const itemId = data.get('itemId') as string
      const cartId = locals.cartid
      const cart = await removeFromCart(cartId, itemId)
      if (cart !== undefined && cart !== null) {
        return { success: true, cart }
      } else {
        return fail (400, { success: false })
      }
   },

   update: async({ request, locals }) => {
      const data = await request.formData()
      const itemId = data.get('itemId') as string
      const cartId = locals.cartid
      const quantity = parseInt(data.get('quantity') as string)
      if (quantity === 0) { 
         const cart = await removeFromCart(cartId, itemId)
         if (cart !== undefined && cart !== null) {
          return { success: true, cart }
        } else {
          return fail (400, { success: false })
        }
      } else if (quantity > 0 && quantity < 12) {
         const cart = await updateCart(cartId, itemId, quantity)
         if (cart !== undefined && cart !== null) {
          return { success: true, cart }
        } else {
          return fail (400, { success: false })
        }
      }
   }
}

interface Cart {
   id: string;
   items: { id: string; productId: string }[];
 }

// Function to get the line item ID for a given product ID
function getProductLineItemId(cart: Cart, productId: string): string | null {
   const lineItem = cart.items.find((item) => item.id === productId);
   return lineItem ? lineItem.id : null;
 }

// Create a cart and store its ID
async function createCart(locals: any, cookies: any) {
   try {
    let { cart } = await medusa.carts.create().then((res) => res)
    if(locals && locals.user) {
      cart = await medusa.carts.update(cart.id, {
        customer_id: locals.user.id,
        email: locals.user.email
      })
      .then(({ cart }) => cart)
      .catch((e) => console.log(e))  
    }
    cookies.set('cartid', cart.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 400,
      sameSite: 'strict',
      httpOnly: true,
      secure: true
    });
    locals.cartid = cart.id;
    console.log(`Created cart (Cart ID: ${cart.id})`);
    if (cart) return cart.id
   } catch (error) {
    console.error('Error creating cart:', error);
    return null;
   }
 }
 
 async function addToCart(cartId: string, variantId: string, quantity = 1) {

  if (!variantId) {
    return null;
  }
  try {
    return await medusa.carts.lineItems.create(cartId, { variant_id: variantId, quantity }).then(({ cart }) => cart)
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
}
 
 async function removeFromCart(cartId: string, itemId: string): Promise<void> {
   try {
     // Get the line item ID for the product (from your cart data)
     const cart = await medusa.carts.retrieve(cartId).then(({ cart }) => cart);
     const lineItemId = getProductLineItemId(cart, itemId) as string;
     return await medusa.carts.lineItems.delete(cartId, lineItemId).then(({ cart }) => cart)
   } catch (error) {
     console.error('Error removing product from cart:', error);
   }
 }

 async function updateCart(cartId: string, itemId: string, newQuantity: number): Promise<void> {
   try {
     // Get the line item ID for the product (from your cart data)
     const cart = await medusa.carts.retrieve(cartId).then(({ cart }) => cart)
     const lineItemId = getProductLineItemId(cart, itemId)  as string;
     return await medusa.carts.lineItems.update(cartId, lineItemId, { quantity: newQuantity }).then(({ cart }) => cart)
   } catch (error) {
     console.error('Error updating quantity:', error);
   }
 }
 