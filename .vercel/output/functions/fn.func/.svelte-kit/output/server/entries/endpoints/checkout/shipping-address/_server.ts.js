import { m as medusa } from "../../../../chunks/medusa.js";
import { e as error, j as json } from "../../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const address = await request.json();
  if (!locals.cartid || !address) {
    throw error(400, "bad format");
  }
  const cart = await updateCartShippingAddress(locals, address);
  if (cart)
    return json(cart);
  else
    throw error(500, "server error");
};
async function updateCartShippingAddress(locals, address) {
  if (!locals.cartid) {
    return null;
  }
  return await medusa.carts.update(locals.cartid, {
    shipping_address: address
  }).then(({ cart }) => cart).catch((e) => console.log(e));
}
export {
  POST
};
