import * as server from '../entries/pages/cart/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cart/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/cart/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.7168c723.js","_app/immutable/chunks/scheduler.9d930ee3.js","_app/immutable/chunks/index.f2fb7d9e.js"];
export const stylesheets = [];
export const fonts = [];
