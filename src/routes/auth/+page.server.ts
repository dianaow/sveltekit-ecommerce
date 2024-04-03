import type { PageServerLoad, Actions } from './$types'
import { error, redirect, type Cookies } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { validateToken } from 'sveltekit-turnstile'
import { SECRET_TURNSTILE_KEY } from '$env/static/private'
import { loginPostReq, registerPostReq, forgotPostReq, resetPostReq } from '$lib/validators'
import medusa from '$lib/server/medusa'
import cookie from 'cookie';

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

async function medusalogin(locals: App.Locals, cookies: Cookies, email: string, password: string) {
   // returns true or false based on success
   const response = await medusa.auth.authenticate({email, password}).then(({response}) => response).catch((e) => console.log(e));
   if (!response || response.status !== 200) return false;
   return await parseAuthCookie(response.headers['set-cookie'], locals, cookies).catch((e) => console.log(e));
}

async function medusaregister(locals: App.Locals, cookies: Cookies, user: { first_name?: string; last_name?: string; email: any; password: any }) {
   // returns true or false based on success
   const { email, password } = user;
   return await medusa.customers.create(user)
      .then(({response}) => {
         if (response.status === 200) {
            return medusalogin(locals, cookies, email, password).then(() => true).catch((e) => console.log(e));
         }
         else
            return false;
      }).catch((e) => console.log(e));
}

async function medusalogout(locals: App.Locals, cookies: Cookies) {
   // returns true or false based on success
   let success = await medusa.auth.deleteSession().then(() => true).catch((e) => console.log(e));
   if (!success)
       return false;
   locals.sid = '';
   locals.user = {};
   cookies.delete('sid', { path: '/' });
   cookies.delete('cartid', { path: '/' });
   return true;
}


export const load: PageServerLoad = async ({ locals, url }) => {
   let rurl = url.searchParams.get('rurl') || ''
   let code = url.searchParams.get('code') || ''

   if (locals.user) { throw redirect(302, `/${rurl}`) }

   const loginForm = await superValidate(loginPostReq, { id: 'login' })
   const registerForm = await superValidate(registerPostReq, { id: 'register' })
   const forgotForm = await superValidate(forgotPostReq, { id: 'forgot' })
   const resetForm = await superValidate(resetPostReq, { id: 'reset' })

   return {
      rurl,
      code,
      loginForm,
      registerForm,
      forgotForm,
      resetForm
   }
}

export const actions: Actions = {
   login: async ({ request, locals, cookies }) => {
      const form = await superValidate(request, loginPostReq, { id: 'login' })
      if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
      // If Turnstile public key is not set in env, the token sent by form will be 'no-token-required'
      // If the token is anything else, check for validity
      if (form.data.token !== 'no-token-required') {
         if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) {
            return message(form, 'Security token timed out or invalid. Please try again.', { status: 418 })
         }
      }
      if (await medusalogin(locals, cookies, form.data.email, form.data.password)) {
         throw redirect(302, `/${form.data.rurl}`)
      } else { 
         return message(form, 'Invalid email/password combination', { status: 401 })
      }
   },

   register: async ({ request, locals, cookies }) => {
      const form = await superValidate(request, registerPostReq, { id: 'register' })
      if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
      // If Turnstile public key is not set in env, the token sent by form will be 'no-token-required'
      // If the token is anything else, check for validity
      if (form.data.token !== 'no-token-required') {
         if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) {
            return message(form, 'Security token timed out or invalid. Please try again.', { status: 418 })
         }
      }
      const user = {
         first_name: form.data.firstName,
         last_name: form.data.lastName,
         email: form.data.email,
         password: form.data.password
      }

      if (await medusaregister(locals, cookies, user)) {
         throw redirect(302, `/${form.data.rurl}`)
      } else {
         return message(form, 'Unable to register a new user with that email address', { status: 400 })
      }
   },
   
   forgot: async ({ request }) => {
      const form = await superValidate(request, forgotPostReq, { id: 'forgot' })
      if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
      // If Turnstile public key is not set in env, the token sent by form will be 'no-token-required'
      // If the token is anything else, check for validity
      if (form.data.token !== 'no-token-required') {
         if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) {
            return message(form, 'Security token timed out or invalid. Please try again.', { status: 418 })
         }
      }
      if (await medusa.customers.generatePasswordToken({email: form.data.email})) {
         return message(form, 'If an account with that email exists, a reset code has been sent to your email address')
      } else {
         return message(form, 'Unable to send reset code', { status: 400 })
      }
   },
   
   reset: async ({ request, locals, cookies }) => {
      const form = await superValidate(request, resetPostReq, { id: 'reset' })
      if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
      // If Turnstile public key is not set in env, the token sent by form will be 'no-token-required'
      // If the token is anything else, check for validity
      if (form.data.token !== 'no-token-required') {
         if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) {
            return message(form, 'Security token timed out or invalid. Please try again.', { status: 418 })
         }
      }
      if (await medusa.customers.resetPassword({email: form.data.email, password: form.data.password, token:form.data.code})) {
         if (await medusalogin(locals, cookies, form.data.email, form.data.password)) {
            throw redirect(302, `/${form.data.rurl}`)
         }
      } else {
         return message(form, 'The link was expired or invalid.', { status: 400 })
      }
   },

   logout: async ({ locals, cookies }) => {
      if (await medusalogout(locals, cookies)) {
         throw redirect(302, '/auth')
      }
      else throw error(500, 'server error')
   }
}