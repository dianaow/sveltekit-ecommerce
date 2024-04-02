import * as server from '../entries/pages/shop/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shop/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/shop/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.038f0ece.js","_app/immutable/chunks/scheduler.9d930ee3.js","_app/immutable/chunks/index.f2fb7d9e.js","_app/immutable/chunks/each.d75b621e.js"];
export const stylesheets = [];
export const fonts = [];
