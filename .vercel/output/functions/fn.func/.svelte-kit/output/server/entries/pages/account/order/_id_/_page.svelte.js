import { c as create_ssr_component, v as validate_component, i as escape, f as each, j as add_attribute } from "../../../../../chunks/ssr.js";
import { P as PUBLIC_SITE_NAME } from "../../../../../chunks/public.js";
import { S as SEO } from "../../../../../chunks/SEO.js";
import { f as formatPrice } from "../../../../../chunks/utils.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const order = data.order;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(SEO, "SEO").$$render(
    $$result,
    {
      title: "Order Details",
      description: "Details about your order from " + PUBLIC_SITE_NAME
    },
    {},
    {}
  )} <h1 class="text-2xl font-semibold my-5 sm:my-8 text-center">Order #${escape(order.display_id)}</h1> <div class="grid grid-cols-1 sm:grid-cols-2 max-w-screen-lg mx-auto"><div class="col-span-1"><h2 class="mt-6 mb-2 text-xl font-semibold text-gray-900" data-svelte-h="svelte-1tylvad">Status</h2> ${order.fulfillment_status === "shipped" ? `<p>Shipped on ${escape(new Date(order.fulfillments[0]?.shipped_at).toLocaleDateString("us-EN", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }))}</p> ${order.fulfillments[0].tracking_links[0]?.tracking_number ? `<p>Tracking # ${escape(order.fulfillments[0].tracking_links[0]?.tracking_number)}</p>` : ``}` : `${order.fulfillment_status === "filled" ? `<p data-svelte-h="svelte-1rboenq">Ready to Ship</p>` : `<p data-svelte-h="svelte-13n4yq6">In Process</p>`}`} <h2 class="mt-6 mb-2 text-xl font-semibold text-gray-900" data-svelte-h="svelte-tmgm1t">Shipping Address</h2> <p>${escape(order.shipping_address.first_name)} ${escape(order.shipping_address.last_name)}<br> ${escape(order.shipping_address.address_1)}<br> ${order.shipping_address.address_2 ? `${escape(order.shipping_address.address_2)}<br>` : ``} ${escape(order.shipping_address.city)}, ${escape(order.shipping_address.province)} ${escape(order.shipping_address.postal_code)}<br></p> <h2 class="mt-6 mb-2 text-xl font-semibold text-gray-900" data-svelte-h="svelte-1xu508d">Payment</h2> <p>Order Subtotal: ${escape(formatPrice(order.subtotal))}</p> <p>Shipping: ${escape(formatPrice(order.shipping_total))}</p> <p>Payment: ${escape(formatPrice(order.payments[0]?.amount))}</p> ${order.payments[0]?.amount_refunded ? `<p>Refunded: ${escape(formatPrice(order.payments[0]?.amount_refunded))}</p>` : ``}</div> <div class="col-span-1"><h2 class="mt-6 mb-2 text-xl font-semibold text-gray-900" data-svelte-h="svelte-cn7pi3">Items</h2> <ul role="list" class="flex-auto">${each(order.items, (item) => {
    return `<li class="flex space-x-6 py-3"><img${add_attribute("src", item.thumbnail, 0)} alt="Product image" class="h-28 w-auto flex-none rounded-md bg-gray-200 object-cover object-center"> <div class="flex flex-col justify-between space-y-4 my-auto"><div class="space-y-1 text-sm font-medium"><h3 class="text-gray-900">${escape(item.title)}</h3> <p class="text-gray-900">${escape(item.description)}</p> <p class="text-gray-500">Price: ${escape(formatPrice(item.unit_price))}</p> <p class="text-gray-500">Quantity: ${escape(item.quantity)}</p> </div></div> </li>`;
  })}</ul></div></div>`;
});
export {
  Page as default
};
