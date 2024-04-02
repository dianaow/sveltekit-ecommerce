import { c as create_ssr_component, g as get_store_value, f as each, j as add_attribute, h as subscribe, v as validate_component, i as escape } from "../../../../chunks/ssr.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import { p as page } from "../../../../chunks/stores.js";
import { d as derived } from "../../../../chunks/index2.js";
import "devalue";
import { a as findSelectedOptions, f as formatPrice } from "../../../../chunks/utils.js";
const JsonLd = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let json;
  let { output = "head" } = $$props;
  let { schema = void 0 } = $$props;
  const createSchema = (schema2) => {
    const addContext = (context) => ({
      "@context": "https://schema.org",
      ...context
    });
    return Array.isArray(schema2) ? schema2.map((context) => addContext(context)) : addContext(schema2);
  };
  if ($$props.output === void 0 && $$bindings.output && output !== void 0)
    $$bindings.output(output);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  isValid = schema && typeof schema === "object";
  json = `${'<script type="application/ld+json">'}${JSON.stringify(createSchema(schema))}${"<\/script>"}`;
  return `${$$result.head += `<!-- HEAD_svelte-1rghca7_START -->${isValid && output === "head" ? `<!-- HTML_TAG_START -->${json}<!-- HTML_TAG_END -->` : ``}<!-- HEAD_svelte-1rghca7_END -->`, ""} ${isValid && output === "body" ? `<!-- HTML_TAG_START -->${json}<!-- HTML_TAG_END -->` : ``}`;
});
const DEFAULT_ENCODER_DECODER = {
  encode: (value) => value.toString(),
  decode: (value) => value ? value.toString() : null
};
function queryParam(name, { encode = DEFAULT_ENCODER_DECODER.encode, decode = DEFAULT_ENCODER_DECODER.decode, defaultValue } = DEFAULT_ENCODER_DECODER, { debounceHistory = 0, pushHistory = true, sort = true } = {}) {
  function set(value) {
    return;
  }
  const { subscribe: subscribe2 } = derived(page, ($page) => {
    const actualParam = $page?.url?.searchParams?.get?.(name);
    if (actualParam == void 0 && defaultValue != void 0) {
      return defaultValue;
    }
    return decode(actualParam);
  });
  return {
    set,
    subscribe: subscribe2,
    update: (updater) => {
      const currentValue = get_store_value({ subscribe: subscribe2 });
      updater(currentValue);
    }
  };
}
const FAQ = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <div id="tab-panel-faq" class="text-sm text-gray-500" aria-labelledby="tab-faq" role="tabpanel" tabindex="0" data-svelte-h="svelte-f3qdct"><h3 class="sr-only">Frequently Asked Questions</h3> <dl><dd class="prose prose-sm mt-2 max-w-none text-gray-500"><p>Common questions and answers</p> <ul><li></li></ul> </dd><dt class="mt-8 font-medium text-gray-900"></dt><dd class="prose prose-sm mt-2 max-w-none text-gray-500"><p></p></dd></dl></div>`;
});
const Gallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { images = [] } = $$props;
  let selectedImage = images[0]?.url || "/img/noimg.png";
  if ($$props.images === void 0 && $$bindings.images && images !== void 0)
    $$bindings.images(images);
  return `<div class="flex flex-col-reverse"> <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none"><div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">${images.length ? each(images, (image, i) => {
    return `<button class="ring-indigo-600 relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" aria-controls="tabs-1-panel-1" role="tab" type="button"><span class="absolute inset-0 overflow-hidden rounded-md"><img${add_attribute("src", image.url, 0)}${add_attribute("alt", image.alt, 0)} class="h-full w-full object-cover object-center"></span> </button>`;
  }) : `<div></div>`}</div></div>  <div class="aspect-square w-full overflow-hidden sm:rounded-lg"><div role="tabpanel" tabindex="0"><img${add_attribute("src", selectedImage, 0)}${add_attribute("alt", selectedImage.alt, 0)} class="h-full w-full object-cover object-center overflow-hidden sm:rounded-lg"></div></div></div>`;
});
const Highlights = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mt-10" data-svelte-h="svelte-a05tbv"><h3 class="text-sm font-medium text-gray-900">Highlights</h3> <div class="prose prose-sm mt-4 text-gray-500"><ul role="list"><li>List item 1</li> <li>List item 2</li> <li>List item 3</li></ul></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $v, $$unsubscribe_v;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  data.user;
  let product = data.product;
  let images = product.images;
  let urlVariantId;
  const v = queryParam("v");
  $$unsubscribe_v = subscribe(v, (value) => $v = value);
  if ($v) {
    if ($v.toString().length > 40)
      urlVariantId = "";
    else
      urlVariantId = $v.toString();
  }
  let selectedOptions = null;
  let selectedVariantId;
  if (urlVariantId) {
    selectedVariantId = urlVariantId;
    selectedOptions = findSelectedOptions(selectedVariantId, product);
  }
  if (!selectedOptions) {
    selectedVariantId = product.variants[0].id;
    selectedOptions = findSelectedOptions(selectedVariantId, product);
  }
  let price = product.variants[0].prices[0].amount / 100;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_v();
  $$unsubscribe_page();
  return `${validate_component(SEO, "SEO").$$render(
    $$result,
    {
      title: product.title,
      images: product.images,
      description: product.title + ", " + product.subtitle + " - " + product.description
    },
    {},
    {}
  )} ${validate_component(JsonLd, "JsonLd").$$render(
    $$result,
    {
      schema: {
        "@type": "Product",
        name: `${product.title}`,
        image: [`${product.thumbnail}`],
        // 'https://example.com/photos/1x1/photo.jpg',
        // 'https://example.com/photos/4x3/photo.jpg',
        // 'https://example.com/photos/16x9/photo.jpg'
        description: (
          //   `${product.subtitle} - ${product.description}`,
          `${product.description}`
        ),
        //  sku: '0446310786',
        //  mpn: '925872',
        brand: { "@type": "Brand", name: "Company" },
        offers: {
          "@type": "Offer",
          url: `${$page.url.href}`,
          priceCurrency: "USD",
          price: `${price}`,
          priceValidUntil: `${product.valid_until}`,
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          shippingDetails: {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "USD"
            },
            "shippingDestination": [
              {
                "@type": "DefinedRegion",
                "addressCountry": "US"
              }
            ]
          }
        }
      }
    },
    {},
    {}
  )} <div class="max-w-screen-2xl mx-auto py-6 px-6 md:px-8 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-6"><div class="lg:max-w-lg lg:self-end"><h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">${escape(product.title)}</h1> <h2 id="information-heading" class="sr-only" data-svelte-h="svelte-1h644gr">Product information</h2>  ${each(product.options, (option) => {
    return `<div class="mt-6"><h3 class="text-sm font-medium">${escape(option.title)}</h3> <div class="mt-4"><div class="flex flex-wrap">${each(option.filteredValues, (value) => {
      return `${value === selectedOptions[option.id] ? `<button type="button" class="uppercase whitespace-nowrap px-3 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-gray-700 border-4 border-indigo-600 bg-white hover:bg-white">${escape(value)} </button>` : `<button type="button" class="uppercase whitespace-nowrap px-3 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-400 bg-white hover:bg-stone-200">${escape(value)} </button>`}`;
    })} </div></div> </div>`;
  })} <div class="mt-6"><h3 class="text-sm font-medium" data-svelte-h="svelte-16tn0r7">Price</h3> <div class="mt-1 flex items-baseline"><p class="text-2xl font-bold">${escape(formatPrice(product.variants[product.variants.findIndex((v2) => v2.id === selectedVariantId)].prices[0].amount))}</p> <p class="ml-1 text-sm font-medium text-gray-600">/ ${escape(product.variants[product.variants.findIndex((v2) => v2.id === selectedVariantId)].title)}</p></div></div> <form action="/cart?/add" method="post"><input type="hidden" name="variantId"${add_attribute("value", product.variants[product.variants.findIndex((v2) => v2.id === selectedVariantId)].id, 0)}> <button type="submit" class="mt-6 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700" data-svelte-h="svelte-8wqrc2">Add to Cart</button></form></div> <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 items-start">${validate_component(Gallery, "Gallery").$$render($$result, { images }, {}, {})}</div> <div class="mb-4">${validate_component(Highlights, "Highlights").$$render($$result, {}, {}, {})}</div>  <div class="max-w-screen-lg lg:col-span-2"><div class="flex" aria-orientation="horizontal" role="tablist"><button type="button"${add_attribute(
    "class",
    "whitespace-nowrap p-3 px-4 mr-4 border-b-2 font-medium border-indigo-600 text-gray-800",
    0
  )}>FAQ</button> <button type="button"${add_attribute(
    "class",
    "whitespace-nowrap p-3 pr-4 mr-4 text-gray-500 hover:text-gray-700 border-b border-gray-300 hover:border-b-2 hover:border-gray-300",
    0
  )}>Other Tab</button></div> ${`${validate_component(FAQ, "FAQ").$$render($$result, {}, {}, {})}`}</div></div>`;
});
export {
  Page as default
};
