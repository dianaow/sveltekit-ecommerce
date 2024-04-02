import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { S as SEO } from "../../../chunks/SEO.js";
import { P as PUBLIC_SITE_NAME } from "../../../chunks/public.js";
import "devalue";
import "../../../chunks/stores.js";
import "@stripe/stripe-js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let user = data.user;
  let cart = data.cart;
  data.order;
  let shippingOptions = data.shippingOptions || [];
  cart.payment_session.data.client_secret;
  shippingOptions.length ? shippingOptions[0].id : 0;
  let contacts = [];
  if (user.shipping_addresses) {
    for (let address of user.shipping_addresses) {
      contacts.push({
        //name: address.first_name + ' ' + address.last_name,
        firstName: address.first_name,
        lastName: address.last_name,
        address: {
          line1: address.address_1,
          line2: address.address_2,
          city: address.city,
          state: address.province,
          postal_code: address.postal_code,
          country: address.country_code.toUpperCase()
        }
      });
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    cart?.items || [];
    $$rendered = `${validate_component(SEO, "SEO").$$render(
      $$result,
      {
        title: "Checkout",
        description: "Checkout page for " + PUBLIC_SITE_NAME
      },
      {},
      {}
    )} <noscript data-svelte-h="svelte-pfsbyk"><p>Please enable javascript to complete checkout.</p> <p>We use a third party (<a href="https://stripe.com">Stripe</a>) to process credit card payments for enhanced security.  Making payments on this site using Stripe requires javascript.</p></noscript> ${`${`${!cart?.items ? `<p data-svelte-h="svelte-iln0vq">Your cart is empty.</p>` : `${``}`}`}`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
