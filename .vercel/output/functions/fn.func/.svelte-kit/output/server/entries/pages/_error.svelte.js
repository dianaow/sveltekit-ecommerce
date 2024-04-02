import { c as create_ssr_component, h as subscribe, i as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-z2l0d2_START -->${$$result.title = `<title>${escape($page.status)}</title>`, ""}<!-- HEAD_svelte-z2l0d2_END -->`, ""} <div>${$page.status === 404 ? `<h1 data-svelte-h="svelte-8jstxt">Not found</h1>` : `<h1 data-svelte-h="svelte-14xyslb">Something went wrong</h1>`}</div>`;
});
export {
  Error as default
};
