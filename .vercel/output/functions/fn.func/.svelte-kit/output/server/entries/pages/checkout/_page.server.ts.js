import { r as redirect, e as error, f as fail } from "../../../chunks/index.js";
import { m as medusa } from "../../../chunks/medusa.js";
const load = async function({ locals }) {
  if (!locals.user)
    throw redirect(302, "/auth?rurl=checkout");
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
  if (shippingOptions && shippingOptions.length > 0) {
    cart = await medusa.carts.addShippingMethod(locals.cartid, { option_id: shippingOptions[0].id }).then(({ cart: cart2 }) => cart2).catch((e) => console.log(e));
  }
  return {
    user: locals.user,
    //cart: locals.cart,
    //clientSecret: paymentIntent.client_secret
    cart,
    shippingOptions
  };
};
const actions = {
  default: async ({ locals, cookies }) => {
    if (!locals.cartid) {
      return null;
    }
    const reply = await medusa.carts.complete(locals.cartid).catch((e) => console.log(e));
    const order = reply.type === "order" ? reply.data : false;
    cookies.set("cartid", "", {
      path: "/",
      maxAge: 0,
      sameSite: "strict",
      httpOnly: true,
      secure: true
    });
    locals.cartid = "";
    if (order) {
      console.log("PAID WITH ORDER THROUGH");
      return { success: true, order };
    } else {
      console.log("PAID BUT AN ERROR MESSAGE SHOWS");
      return fail(400, { success: false });
    }
  }
};
export {
  actions,
  load
};
