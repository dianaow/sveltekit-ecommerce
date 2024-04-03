import type { Handle } from '@sveltejs/kit'
import cookie from 'cookie';
import medusa from '$lib/server/medusa'

async function handleRequest(event: any) {
   // this middleware function is called by src/hooks.server.ts or src/hooks.server.js
   event.locals.sid = event.cookies.get('sid')
   if (event.locals.sid) event.locals.user = await getCustomer(event.locals, event.cookies) 
   else event.locals.sid = ''

   event.locals.cartid = event.cookies.get('cartid')
   let cart: any = await getCart(event.locals, event.cookies)
   event.locals.cartid = cart?.id || ''
   event.locals.cart = cart || null

   return event
}

async function getCustomer(locals: any, cookies: any) {
   // returns a user object if found, or null if not
   return await medusa.auth.getSession({"Cookie": `connect.sid=${locals.sid}`})
      .then((res) => {
        parseAuthCookie(res.response.headers['set-cookie'], locals, cookies);
        return res.customer
      })
      .catch((e) => console.log(e));
}

async function parseAuthCookie(setCookie = [], locals: any, cookies: any) {
    if (!setCookie)
        return false;
    try {
        for (let rawCookie of setCookie) {
            let parsedCookie = cookie.parse(rawCookie);
            if (parsedCookie['connect.sid']) {
                locals.sid = parsedCookie['connect.sid'];
                let expires = new Date(parsedCookie['Expires']);
                let maxAge = Math.floor((expires.getTime() - Date.now()) / 1000);
                cookies.set('sid', locals.sid, {
                    path: '/',
                    maxAge: maxAge,
                    sameSite: 'strict',
                    httpOnly: true,
                    secure: true
                });
                return true;
            }
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
 }

async function getCart(locals: any, cookies: any) {
   // returns a cart array on success, otherwise null
   let cart;
   if (locals.cartid) {
       cart = await medusa.carts.retrieve(locals.cartid).then(({ cart }) => cart);
       // if this cart was completed on another device, we don't want to use it
       if (cart && cart.completed_at)
           cart = null;
   }
   if (locals.cartid && !cart) {
       locals.cartid = '';
       cookies.delete('cartid', { path: '/' });
   }
   return cart;
}

export const handle: Handle = async ({ event, resolve }) => {

   // MEDUSA SESSION MIDDLEWARE  
   // Sets locals.user and locals.cart if they are found.
   event = await handleRequest(event)

   const response = await resolve(event)

   // CACHE CONTROL	
   //response.headers.set['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate'
   //response.headers.set['Cache-Control'] = 'public, max-age=0, s-maxage=1'
   
   // SECURITY HEADERS
   // CSP directives are set elsewhere in svelte.config.js and added automatically by SvelteKit.
   // CSRF mitigation in SvelteKit is handled by header-checking and is enabled by default. More secure token-based CSRF mitigation must be added manually.
   // Token-based CSRF mitigation for the most sensitive endpoints/form actions is handled by Cloudflare Turnstile.
   response.headers.set('X-Frame-Options', 'DENY')
   response.headers.set('X-Content-Type-Options', 'nosniff')
   response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
   response.headers.set('Permissions-Policy', 'payment=(self "https://js.stripe.com/"), accelerometer=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), gyroscope=(), hid=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()')

   return response
}