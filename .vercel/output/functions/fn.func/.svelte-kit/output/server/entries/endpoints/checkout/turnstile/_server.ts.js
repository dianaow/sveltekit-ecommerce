import { v as validateToken } from "../../../../chunks/validateToken.js";
import { m as medusa, S as SECRET_TURNSTILE_KEY } from "../../../../chunks/medusa.js";
import { e as error, j as json } from "../../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const data = await request.json();
  let token = data.token;
  if (token !== "no-token-required") {
    if (!await validateToken(token, SECRET_TURNSTILE_KEY))
      throw error(400, { message: "Bot risk" });
  }
  if (!locals.cartid) {
    return false;
  }
  let cart = await medusa.carts.createPaymentSessions(locals.cartid).then(({ cart: cart2 }) => cart2).catch((e) => console.log(e));
  if (!cart.total) {
    throw error(400, { message: "Could not create payment sessions" });
  }
  cart = await medusa.carts.setPaymentSession(locals.cartid, { provider_id: "stripe" }).then(({ cart: cart2 }) => cart2).catch((e) => console.log(e));
  if (!cart.total) {
    throw error(400, { message: "Could not select payment provider" });
  }
  let shippingOptions = await medusa.shippingOptions.listCartOptions(locals.cartid).then(({ shipping_options }) => shipping_options).catch((e) => console.log(e));
  if (!shippingOptions) {
    throw error(400, { message: "Could not get shipping options" });
  }
  return json({ cart, shippingOptions });
};
export {
  POST
};
