import * as server from '../entries/pages/account/order/_id_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/account/order/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/account/order/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.2f4530ea.js","_app/immutable/chunks/scheduler.9d930ee3.js","_app/immutable/chunks/index.f2fb7d9e.js","_app/immutable/chunks/each.d75b621e.js","_app/immutable/chunks/public.415e40eb.js","_app/immutable/chunks/SEO.faa1ff8c.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/stores.fe4755fa.js","_app/immutable/chunks/entry.706d64df.js","_app/immutable/chunks/utils.41ca3d8f.js"];
export const stylesheets = [];
export const fonts = [];
