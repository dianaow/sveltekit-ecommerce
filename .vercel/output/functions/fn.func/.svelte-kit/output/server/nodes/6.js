import * as server from '../entries/pages/auth/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.690f1f76.js","_app/immutable/chunks/scheduler.9d930ee3.js","_app/immutable/chunks/index.f2fb7d9e.js","_app/immutable/chunks/entry.706d64df.js","_app/immutable/chunks/stores.fe4755fa.js","_app/immutable/chunks/forms.31595f59.js","_app/immutable/chunks/index.60829b93.js","_app/immutable/chunks/public.415e40eb.js"];
export const stylesheets = ["_app/immutable/assets/6.e2a79dc8.css"];
export const fonts = [];
