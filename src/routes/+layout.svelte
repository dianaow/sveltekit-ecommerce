<script lang="ts">
   import '$src/app.postcss'
   import type { PageData } from './$types'
   import { page } from '$app/stores'
   import NavBar from '$lib/components/NavBar.svelte'
   import Footer from '$lib/components/Footer.svelte'
   export let data: PageData
   const nakedPaths = ['/auth', '/checkout', '/sitemap.xml']
   $: naked = nakedPaths.includes($page.url.pathname)
   $: user = data?.user
   $: cart = data?.cart
   $: count = cart?.items?.length || null
</script>
{#if naked}
   <main>
      <slot />
   </main>
{:else}
   <NavBar bind:user={user} bind:cart={cart} bind:count={count} />
   <main>
      <slot />
   </main>
   <Footer />
{/if}

<style>
   main {
     width: 85%;
     margin: auto;
     padding: 20px;
     min-height: 100vh;
   }
 
   /* For tablets: */
   @media screen and (max-width: 768px) {
     main {
       width: 95%;
     }
   }
 
   /* For mobile phones: */
   @media screen and (max-width: 480px) {
     main {
       width: 100%;
     }
   }
 </style>
 