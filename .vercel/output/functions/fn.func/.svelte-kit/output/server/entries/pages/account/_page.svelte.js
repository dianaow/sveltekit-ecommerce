import { c as create_ssr_component, h as subscribe, f as each, i as escape, v as validate_component, j as add_attribute } from "../../../chunks/ssr.js";
import { P as PUBLIC_SITE_NAME } from "../../../chunks/public.js";
import { S as SEO } from "../../../chunks/SEO.js";
import "devalue";
import { p as page } from "../../../chunks/stores.js";
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let numPages;
  let nextPage;
  let prevPage;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { currentPage = 1 } = $$props;
  let { itemCount = 0 } = $$props;
  let { itemsPerPage = 10 } = $$props;
  let pages = [];
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.itemCount === void 0 && $$bindings.itemCount && itemCount !== void 0)
    $$bindings.itemCount(itemCount);
  if ($$props.itemsPerPage === void 0 && $$bindings.itemsPerPage && itemsPerPage !== void 0)
    $$bindings.itemsPerPage(itemsPerPage);
  numPages = Math.ceil(itemCount / itemsPerPage);
  {
    {
      currentPage = parseInt(currentPage) || 1;
      if (currentPage > numPages || currentPage < 1) {
        currentPage = numPages;
      }
    }
  }
  nextPage = parseInt(currentPage) === parseInt(numPages) ? null : parseInt(currentPage) + 1;
  prevPage = currentPage == 1 ? null : currentPage - 1;
  {
    {
      pages = [];
      for (let i = 1; i <= Math.min(numPages, 10); i++) {
        pages.push(i);
      }
    }
  }
  $$unsubscribe_page();
  return `${numPages > 1 ? `<div class="flex w-full ml-auto items-center mt-6 sm:mt-8"><nav class="mx-auto isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination"><button ${!prevPage ? "disabled" : ""} type="button" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"> <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd"></path></svg></button> ${each(pages, (i, j) => {
    return `${i === currentPage ? ` <span class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">${escape(i)}</span>` : `${j > 4 ? ` <a href="#" class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">${escape(i)}</a>` : `<button type="button" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">${escape(i)}</button>`}`}`;
  })} <button ${!nextPage ? "disabled" : ""} type="button" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"> <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg></button></nav></div>` : ``}`;
});
let opp = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let id;
  let email;
  let first_name;
  let last_name;
  let phone;
  let billing_address_id;
  let shipping_addresses;
  let orders;
  let currentPage;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    ({ id, email, first_name, last_name, phone, billing_address_id, shipping_addresses, orders } = data.user);
    {
      orders && orders.length > 0 ? orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : null;
    }
    currentPage = data?.currentPage || 1;
    $$rendered = `${validate_component(SEO, "Meta").$$render(
      $$result,
      {
        title: "Account",
        description: "Manage your account at " + PUBLIC_SITE_NAME
      },
      {},
      {}
    )} <div class="max-w-screen-2xl mx-auto py-6 px-6 md:px-8 sm:px-6"><h1 class="text-2xl font-semibold mb-8 sm:mb-12 text-center" data-svelte-h="svelte-zx08q8">Your Account</h1> <div class="max-w-screen-lg mx-auto"> <div class="flex items-center border-b border-gray-500 pb-3"><h2 class="text-xl font-semibold text-gray-900" data-svelte-h="svelte-m0jvib">Contact Information</h2> <button type="button" class="ml-6 font-medium text-indigo-600 hover:text-indigo-500">${`Edit`}</button></div> ${`${`<p class="mt-3">${escape(first_name)} ${escape(last_name)}</p> <p>${escape(email)}</p> ${phone ? `<p>${escape(phone)}</p>` : ``} <button class="text-indigo-600 hover:text-indigo-500 mb-8 sm:mb-12 mt-3 " data-svelte-h="svelte-ekyxe1">Change Password</button>`}`}  <div class="flex items-center border-b border-gray-500 pb-3"><h2 class="text-xl font-semibold text-gray-900" data-svelte-h="svelte-htcnud">Addresses</h2> <button type="button" class="ml-6 font-medium text-indigo-600 hover:text-indigo-500">${`Add`}</button></div> ${`<div class="flex flex-wrap mt-3 mb-8 sm:mb-12">${shipping_addresses.length ? each(shipping_addresses, (address) => {
      return `<div class="border rounded-md p-4 mr-3 mb-2"><p>${escape(address.first_name)} ${escape(address.last_name)}</p> <p>${escape(address.address_1)}</p> ${address.address_2 ? `<p>${escape(address.address_2)}</p>` : ``} <p>${escape(address.city)}, ${escape(address.province)}</p> <p>${escape(address.postal_code)}</p> ${address.phone ? `<p>${escape(address.phone)}</p>` : ``} <div class="mt-3"><button class="text-indigo-600 hover:text-indigo-500 pr-2" data-svelte-h="svelte-1pchm4j">Edit</button> <form class="inline" action="?/deleteAddress" method="POST"><button type="submit" class="text-indigo-600 hover:text-indigo-500 pl-2" data-svelte-h="svelte-1jhpzsd">Delete</button> <input type="hidden" name="addressId"${add_attribute("value", address.id, 0)}> </form></div> </div>`;
    }) : `No addresses saved`}</div>`}  ${orders?.length ? `<div class="flex items-center border-b border-gray-500 pb-3" data-svelte-h="svelte-1efgcic"><h2 class="text-xl font-semibold text-gray-900">Orders</h2></div> ${each(orders, (order, i) => {
      return `${i >= currentPage * opp - opp && i < currentPage * opp ? `<div class="sm:flex sm:flex-wrap my-3 justify-between"><div class="mr-2 block sm:inline">${escape(new Date(order.created_at).toLocaleDateString("us-EN", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }))}</div> <div class="mr-2 block sm:inline">Order Num: ${escape(order.display_id)}</div> <div class="mr-2 block sm:inline">${escape(order.fulfillment_status === "fulfilled" ? "Shipped" : "Pending")}</div> <div><a${add_attribute("href", `/account/order/${order.id}`, 0)} class="text-indigo-600 hover:text-indigo-500 mr-3">View / Track</a></div> </div>` : ``}`;
    })} ${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        itemCount: orders.length,
        itemsPerPage: opp,
        currentPage
      },
      {
        currentPage: ($$value) => {
          currentPage = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `<div class="my-3" data-svelte-h="svelte-1kiwaon">No orders yet</div>`}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
