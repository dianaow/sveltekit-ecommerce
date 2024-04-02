import { m as medusa } from "../../../../chunks/medusa.js";
import { e as error, j as json } from "../../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const data = await request.json();
  let shippingOptionId = data.option_id;
  if (!locals.cartid || !shippingOptionId) {
    throw error(500, "bad format");
  }
  let cart = await selectShippingOption(locals, shippingOptionId);
  if (cart.total) {
    return json(cart);
  } else {
    throw error(404, "not found");
  }
};
async function selectShippingOption(locals, shippingOptionId) {
  if (!locals.cartid || !shippingOptionId) {
    return null;
  }
  return await medusa.carts.addShippingMethod(locals.cartid, {
    option_id: shippingOptionId
  }).then(({ cart }) => cart).catch((e) => console.log(e));
}
export {
  POST
};
