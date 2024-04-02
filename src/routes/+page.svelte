<script>
   import ArtworkSimple from '$lib/components/ArtworkSimple.svelte'
   export let data;
 
   let new_artworks = data.newImages;
   let category_artworks = data.images;
 </script>
 
 <div class="max-w-full space-y-20 md:space-y-40 py-10 md:py-20 px:0 xl:px-20">  
   <section id="intro" class='block lg:flex'>
     <div class="w-full lg:w-1/2 pr-0 lg:pr-16">
       <h1 class="text-4xl lg:text-6xl">Digital Arworks</h1>
       <p class='py-8'>Embrace innovation and creativity with our curated selection of artworks.</p>
       <button class="text-base md:text-xl lg:text-2xl px-6 py-4 bg-indigo-600 text-white rounded-full border-indigo-600 border px-4 py-2 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition duration-300 ease-in-out;">Join Us</button>
       <a href="/shop"><button class="text-base md:text-xl lg:text-2xl px-6 py-4 rounded-full text-xs my-1 mr-2 bg-transparent border-indigo-600 text-indigo-600 border px-4 py-2 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition duration-300 ease-in-out;">Start browsing</button></a>
     </div>
 
     <div class="w-full lg:w-1/2">
       <div class='grid grid-cols-2'>
         {#each category_artworks as artwork (artwork.public_id)}
           <ArtworkSimple {artwork} />
         {/each}
       </div>
     </div>
   </section>
 
   <section id="process" class='block lg:flex'>
     <div class="w-full lg:w-1/3">
       {#if category_artworks.length > 0}
         <ArtworkSimple width="100%" artwork={category_artworks[0]} />
       {/if}
     </div>
     <div class="w-full lg:w-2/3 pl-0 lg:pl-16">
       <h1>What We Do</h1>
       <p class='py-8'>We take pride in our professional approach when it comes to producing and selling high-quality digital artworks for our customers.</p>
     </div>
   </section>

 </div>
 