import type { PageServerLoad } from './$types'
import medusa from '$lib/server/medusa'

export const load: PageServerLoad = async function ({ fetch, params }) {
   
   let products = await medusa.products.list().then(({ products }) => products)

    // @ts-ignore 
   const response = await fetch(`/api/images?pageNumber=${params.pageNumber}&pageCount=${params.pageCount}`);
   const images = await response.json()

   if(products.length > 0) {
    products.forEach((p:any, i:number) => {
      const image = images.find((image: any) => image.public_id.split('/')[1] === p.handle)
      p.images = [{url: image, alt: i}]
      p.thumbnail = image
    })
   }

   return { 
      products
   }
}