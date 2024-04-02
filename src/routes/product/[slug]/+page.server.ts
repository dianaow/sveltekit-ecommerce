import type { PageServerLoad } from './$types'
import medusa from '$lib/server/medusa'
import { error } from '@sveltejs/kit'
import { filteredValues } from '$lib/utils'

export const load: PageServerLoad = async function ({ fetch, params }) {
   let product: any = await getProduct(params.slug)
   if (!product) throw error(404, 'Product not found')
   product.valid_until = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit'})

   const response = await fetch(`/api/images?id=${params.slug}`);
   const image = await response.json();
   product.images = [{url: image.url, alt: ""}]
   product.thumbnail = image.image

   return { 
      product
   }
}

async function getProduct(handle: string) {
   // returns a product object on success
   //let product = await medusa.products.retrieve(productId).then(({ product }) => product)
      //.then((res) => res.json()).then(({ product }) => product).catch(() => null);
      
   let product = await medusa.products.list({handle}).then(({ products }) => products[0])
   if (!product) {
       return null;
   }
   for (let option of product.options) {
      option.filteredValues = filteredValues(option);
   }
   return product
}