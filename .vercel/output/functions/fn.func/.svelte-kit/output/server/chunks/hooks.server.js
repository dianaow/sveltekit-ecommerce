import cookie from "cookie";
import { m as medusa } from "./medusa.js";
async function handleRequest(event) {
  event.locals.sid = event.cookies.get("sid");
  if (event.locals.sid) {
    event.locals.user = await getCustomer(event.locals, event.cookies);
    event.locals.cartid = event.cookies.get("cartid");
  } else {
    event.locals.sid = "";
  }
  let cart = await getCart(event.locals, event.cookies);
  event.locals.cartid = cart?.id || "";
  event.locals.cart = cart || null;
  return event;
}
async function getCustomer(locals, cookies) {
  return await medusa.auth.getSession({ "Cookie": `connect.sid=${locals.sid}` }).then((res) => {
    parseAuthCookie(res.response.headers["set-cookie"], locals, cookies);
    return res.customer;
  }).catch((e) => console.log(e));
}
async function parseAuthCookie(setCookie = [], locals, cookies) {
  if (!setCookie)
    return false;
  try {
    for (let rawCookie of setCookie) {
      let parsedCookie = cookie.parse(rawCookie);
      if (parsedCookie["connect.sid"]) {
        locals.sid = parsedCookie["connect.sid"];
        let expires = new Date(parsedCookie["Expires"]);
        let maxAge = Math.floor((expires.getTime() - Date.now()) / 1e3);
        cookies.set("sid", locals.sid, {
          path: "/",
          maxAge,
          sameSite: "strict",
          httpOnly: true,
          secure: true
        });
        return true;
      }
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function getCart(locals, cookies) {
  let cart;
  if (locals.cartid) {
    cart = await medusa.carts.retrieve(locals.cartid).then(({ cart: cart2 }) => cart2);
    if (cart && cart.completed_at)
      cart = null;
  }
  if (locals.cartid && !cart) {
    locals.cartid = "";
    cookies.delete("cartid");
  }
  return cart;
}
const handle = async ({ event, resolve }) => {
  event = await handleRequest(event);
  const response = await resolve(event);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", 'payment=(self "https://js.stripe.com/"), accelerometer=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), gyroscope=(), hid=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()');
  return response;
};
export {
  handle
};
