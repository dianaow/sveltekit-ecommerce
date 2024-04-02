import { c as create_ssr_component, i as escape, j as add_attribute, f as each, v as validate_component } from "../../../chunks/ssr.js";
const ProductCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  return `<a href="${"/product/" + escape(product.handle, true)}" class="group"><div class="overflow-hidden rounded-lg"><img${add_attribute("alt", product.title, 0)}${add_attribute("src", product.thumbnail.url, 0)} class="mx-auto h-auto w-auto object-center group-hover:opacity-75"></div> <div class="flex"><div class="mx-auto"><h3 class="mt-4 text-lg font-bold text-gray-700">${escape(product.title)}</h3></div> <p class="mt-1 text-lg font-medium text-gray-900"></p></div></a>`;
});
const Collection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { products } = $$props;
  if ($$props.products === void 0 && $$bindings.products && products !== void 0)
    $$bindings.products(products);
  return `<div class="bg-white"><div class="mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8"><h2 id="products-heading" class="sr-only" data-svelte-h="svelte-agzezc">Products</h2> <div class="grid grid-cols-1 gap-y-16 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">${each(products, (product) => {
    return `${validate_component(ProductCard, "ProductCard").$$render($$result, { product }, {}, {})}`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Collection, "Collection").$$render($$result, { products: data.products }, {}, {})}`;
});
export {
  Page as default
};
