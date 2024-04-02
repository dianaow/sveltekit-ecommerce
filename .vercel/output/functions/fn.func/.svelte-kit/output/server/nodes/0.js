import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.ad7d92d2.js","_app/immutable/chunks/scheduler.9d930ee3.js","_app/immutable/chunks/index.f2fb7d9e.js","_app/immutable/chunks/stores.fe4755fa.js","_app/immutable/chunks/entry.706d64df.js","_app/immutable/chunks/each.d75b621e.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/forms.31595f59.js","_app/immutable/chunks/utils.41ca3d8f.js"];
export const stylesheets = ["_app/immutable/assets/0.d5030f06.css"];
export const fonts = [];
