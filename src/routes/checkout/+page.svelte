<script lang="ts">
   import type { PageData } from './$types'
   import { onMount } from 'svelte'
   import SEO from '$lib/components/SEO.svelte'
   import { PUBLIC_SITE_NAME } from '$env/static/public'
   import { PUBLIC_STRIPE_KEY } from '$env/static/public'
   import { enhance } from '$app/forms'
   import { formatPrice } from '$lib/utils'
   import { PaymentElement, Address, Elements, type StripeElements, type StripeAddressElementOptions } from 'svelte-stripe'
   import { loadStripe } from '@stripe/stripe-js'

   export let data: PageData
   let stripe: any = null
   let user = data.user
   let cart = data.cart
   let order = data.order
   let shippingOptions = data.shippingOptions || []
   //let clientSecret = data?.clientSecret
   $: items = cart?.items || []

   let clientSecret: string = cart.payment_session.data.client_secret
   let shippingOptionId: string = shippingOptions.length ? shippingOptions[0].id : 0

   let orderSummaryOpen = false
   let success = false
   let processing = false
   let loading = true
   let errorMessage = ''
   let elements: StripeElements
   let contacts: StripeAddressElementOptions["contacts"][] = []

   if (user.shipping_addresses) {
      for (let address of user.shipping_addresses) {
         contacts.push({
            //name: address.first_name + ' ' + address.last_name,
            firstName: address.first_name,
            lastName: address.last_name,
            address: {
               line1: address.address_1,
               line2: address.address_2,
               city: address.city,
               state: address.province,
               postal_code: address.postal_code,
               country: address.country_code.toUpperCase(),
            }
         })
      }
   }

   const toggleOrderSummary = () => {
      let orderSummary = document.getElementById('order-summary') as HTMLElement
      if (orderSummaryOpen) {
         orderSummary.classList.add('hidden')
         orderSummaryOpen = false
      } else {
         orderSummary.classList.remove('hidden')
         orderSummaryOpen = true
      }
   }

   const splitName = (name = '') => {
      const [firstName, ...lastName] = name.split(' ').filter(Boolean)
      return {
         firstName: firstName,
         lastName: lastName.join(' ')
      }
   }

   const saveAddress = async (value: StripeAddressElementOptions['contact']) => {
      let address = {
         first_name: value.firstName,
         last_name: value.lastName,
         address_1: value.address.line1,
         address_2: value.address.line2,
         city: value.address.city,
         province: value.address.state,
         postal_code: value.address.postal_code,
         country_code: value.address.country.toLowerCase(),
      }

      let newAddress = true
      // if no first_name, this must be coming from stripe, so address is not new.  
      // sometimes stripe sends full name despite setting cause who knows why
      if (!address.first_name) {
         newAddress = false
         let { firstName, lastName } = splitName(value.name)
         address.first_name = firstName
         address.last_name = lastName
      } else {
         for (let existing of user.shipping_addresses) {
            if (JSON.stringify(address) === JSON.stringify(existing)) {
               newAddress = false
            }
         }
      }

      if (newAddress) {
         const success = await fetch('/checkout/save-address', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(address)
         })
         .then(res => res.ok)
         .catch((e) => console.log(e))
         if (!success) return false
      }
      return await fetch('/checkout/shipping-address', { 
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(address) })
      .then(res => res.json())
      .catch((e) => console.log(e))
   }

   const saveShippingOption = async (id: string) => {
      return await fetch('/checkout/shipping-option', { 
         method: 'POST', 
         body: JSON.stringify({ 'option_id': id }) 
      })
      .then(res => res.json())
      .catch((e) => console.log(e))
   }

   onMount(async() => {
      stripe = await loadStripe(PUBLIC_STRIPE_KEY)
      loading = false
   })
</script>

<SEO title="Checkout" description="Checkout page for {PUBLIC_SITE_NAME}"/>

<noscript>
   <p>Please enable javascript to complete checkout.</p>
   <p>We use a third party (<a href="https://stripe.com">Stripe</a>) to process credit card payments for enhanced security.  Making payments on this site using Stripe requires javascript.</p>
</noscript>

{#if errorMessage}
   <p>{errorMessage}</p>
{:else if success}
<main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:max-h-screen lg:overflow-hidden">
   <section class="flex-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-0">
      <div class="mx-auto max-w-lg">
         <!-- Logo on thank you screen -->
         <div class="py-10 lg:flex">
            <span class="sr-only">{PUBLIC_SITE_NAME}</span>
            <!-- <a href="/"><img src="/logo.png" alt="{PUBLIC_SITE_NAME}" class="h-14 w-auto"></a> -->
         </div>
         <p>Thank you for your order!</p>
         <p>Your order number is <a class="font-bold text-lime-600" href={`/account/order/${order.id}`}>{order.display_id}</a></p>
         <p class="mt-6"><a href={"/"}>&larr; Continue Shopping</a></p>
      </div>
   </section>
</main>
{:else if (!cart?.items)}
   <p>Your cart is empty.</p>
{:else if !loading}
   <main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:max-h-screen lg:overflow-hidden">
      <h1 class="sr-only">Checkout</h1>

      <!-- Logo on sm screen -->
      <div class="px-4 py-6 sm:px-6 lg:hidden">
         <div class="mx-auto flex max-w-lg">
            <span class="sr-only">{PUBLIC_SITE_NAME}</span>
            <!-- <a href="/"><img src="/logo.png" class="mx-auto h-14 w-auto" alt="{PUBLIC_SITE_NAME}" /></a> -->
         </div>
      </div>
      
      <!-- Order Summary -->
      <section class="w-full flex-col lg:max-w-md bg-gray-50 p-6 overflow-auto">
         <h2 id="summary-heading" class="sr-only">Order summary</h2>
         <div class="mx-auto max-w-lg">

            <!-- Mobile order summary toggle -->
            <div class="lg:hidden flex items-center justify-between">
               <h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
               <button on:click={toggleOrderSummary} type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                  {#if orderSummaryOpen} Hide full summary {:else} Show full summary {/if}
               </button>
            </div>
      
            <div id="order-summary" class="hidden lg:block lg:max-h-screen">
               <ul role="list" class="flex-auto">
                  {#each items as item}
                  <li class="flex space-x-6 py-6 border-b border-gray-200">
                     <img src="{item.thumbnail}" alt="item.description" class="h-28 w-auto flex-none rounded-md bg-gray-200 object-cover object-center">
                     <div class="flex flex-col justify-between space-y-4 my-auto">
                        <div class="space-y-1 text-sm font-medium">
                           <h3 class="text-gray-900">{item.title}</h3>
                           <p class="text-gray-900">{item.description}</p>
                           <p class="text-gray-500">Price: {formatPrice(item.unit_price)}</p>
                           <p class="text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                     </div>
                  </li>
                  {/each}
               </ul>
               
               <form class="hidden mt-10">
                  <label for="discount-code-mobile" class="block text-sm font-medium text-gray-700">Discount code</label>
                  <div class="mt-1 flex space-x-4">
                     <input type="text" id="discount-code-mobile" name="discount-code-mobile" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                     <button type="submit" class="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Apply</button>
                  </div>
               </form>
      
               <dl class="py-6 space-y-6 text-sm font-medium text-gray-500">
                  <div class="flex justify-between">
                     <dt>Subtotal</dt>
                     <dd class="text-gray-900">{formatPrice(cart?.subtotal)}</dd>
                  </div>
                  {#if cart?.discount_total}
                  <div class="flex justify-between">
                     <dt class="flex">
                        Discount
                        <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{cart.discounts[0]}</span>
                     </dt>
                     <dd class="text-gray-900">{formatPrice(cart.discount_total)}</dd>
                  </div>
                  {/if}
                  <div class="flex justify-between">
                     <dt>Taxes</dt>
                     <dd class="text-gray-900">{formatPrice(cart?.tax_total)}</dd>
                  </div>
                  <div class="flex justify-between">
                     <dt>Shipping</dt>
                     <dd class="text-gray-900">{formatPrice(cart?.shipping_methods[0]?.price)}</dd>
                  </div>
               </dl>
               
               <p class="py-6 flex items-center justify-between border-t border-gray-200 text-sm font-medium text-gray-900">
                  <span class="text-base">Total</span>
                  <span class="text-base">{formatPrice(cart?.total)}</span>
               </p>

            </div>
         </div>
      </section>
   
      <!-- Checkout form -->
      <section aria-labelledby="payment-heading" class="flex-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-0 overflow-auto">
         <div class="mx-auto max-w-lg">

            <!-- Logo on lg screen -->
            <div class="hidden py-10 lg:flex">
               <span class="sr-only">{PUBLIC_SITE_NAME}</span>
               <!-- <a href="/"><img src="/logo.png" alt="{PUBLIC_SITE_NAME}" class="h-14 w-auto"></a> -->
            </div>
            
            <Elements {stripe} {clientSecret} bind:elements>
               <form class="grid gap-y-8" method="POST" use:enhance={ async ({ cancel }) => {

                  if (processing) cancel()
                  processing = true
                  
                  const addressContainer = elements.getElement('address');
                  const {complete, value} = await addressContainer.getValue()
                  if (complete) {
                     cart = await saveAddress(value)
                     if (!cart) {
                        errorMessage = 'Something went wrong while saving your address.'
                        cancel()
                     }
                  }
         
                  const stripeResponse = await stripe.confirmPayment({ 
                     elements,
                     redirect: 'if_required',
                  })
    
                  if (stripeResponse.error) { 
                     errorMessage = 'Something went wrong while confirming Stripe payment'
                     processing = false
                     cancel()
                  } else {
                     processing = false
                     success = true
                  }             
               }}>
                  <Address mode='billing' defaultValues={contacts[0]} display={{name: 'split'}}/>

                  <select bind:value={shippingOptionId} on:change={async () => { cart = await saveShippingOption(shippingOptionId) } } name="shippingOptionId" class="block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-300 focus:ring-blue-300 text-gray-600 py-3">
                     {#each shippingOptions as shippingOption}
                        <option value={shippingOption.id}>{shippingOption.name} {formatPrice(shippingOption.price_incl_tax)}</option>
                     {/each}
                  </select>
   
                  <PaymentElement />			
            
                  <button disabled={processing} type="submit" class="w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700">
                     {#if processing} Processing...{:else} Complete Your Order {/if}
                  </button>
               </form>
            </Elements>

         </div>
      </section>
   </main>
{/if}




 