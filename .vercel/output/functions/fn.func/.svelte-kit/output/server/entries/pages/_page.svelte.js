import { c as create_ssr_component, j as add_attribute, i as escape, f as each, v as validate_component } from "../../chunks/ssr.js";
const ArtworkSimple_svelte_svelte_type_style_lang = "";
const css = {
  code: ".artwork.svelte-2zglsk.svelte-2zglsk{padding:10px;width:100%;height:auto;max-width:300px}.artwork.svelte-2zglsk img.svelte-2zglsk{width:100%;height:auto;pointer-events:none}.artwork-info.svelte-2zglsk.svelte-2zglsk{margin-top:-20px;background-color:black;opacity:0.6;color:white}",
  map: null
};
const ArtworkSimple = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { artwork } = $$props;
  let { width = "300px" } = $$props;
  if ($$props.artwork === void 0 && $$bindings.artwork && artwork !== void 0)
    $$bindings.artwork(artwork);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  $$result.css.add(css);
  return `<div class="artwork svelte-2zglsk"${add_attribute("style", `max-width: ${width};`, 0)}><img${add_attribute("src", artwork.url, 0)}${add_attribute("alt", artwork.public_id, 0)} class="svelte-2zglsk"> ${artwork.category ? `<div class="artwork-info svelte-2zglsk"><div>${escape(artwork.category)}</div></div>` : ``} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.newImages;
  let category_artworks = data.images;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="max-w-full space-y-20 md:space-y-40 py-10 md:py-20 px:0 xl:px-20"><section id="intro" class="block lg:flex"><div class="w-full lg:w-1/2 pr-0 lg:pr-16" data-svelte-h="svelte-114yjlj"><h1 class="text-4xl lg:text-6xl">Digital Arworks</h1> <p class="py-8">Embrace innovation and creativity with our curated selection of artworks.</p> <button class="text-base md:text-xl lg:text-2xl px-6 py-4 bg-indigo-600 text-white rounded-full border-indigo-600 border px-4 py-2 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition duration-300 ease-in-out;">Join Us</button> <a href="/shop"><button class="text-base md:text-xl lg:text-2xl px-6 py-4 rounded-full text-xs my-1 mr-2 bg-transparent border-indigo-600 text-indigo-600 border px-4 py-2 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition duration-300 ease-in-out;">Start browsing</button></a></div> <div class="w-full lg:w-1/2"><div class="grid grid-cols-2">${each(category_artworks, (artwork) => {
    return `${validate_component(ArtworkSimple, "ArtworkSimple").$$render($$result, { artwork }, {}, {})}`;
  })}</div></div></section> <section id="process" class="block lg:flex"><div class="w-full lg:w-1/3">${category_artworks.length > 0 ? `${validate_component(ArtworkSimple, "ArtworkSimple").$$render(
    $$result,
    {
      width: "100%",
      artwork: category_artworks[0]
    },
    {},
    {}
  )}` : ``}</div> <div class="w-full lg:w-2/3 pl-0 lg:pl-16" data-svelte-h="svelte-1tc26ci"><h1>What We Do</h1> <p class="py-8">We take pride in our professional approach when it comes to producing and selling high-quality digital artworks for our customers.</p></div></section></div>`;
});
export {
  Page as default
};
