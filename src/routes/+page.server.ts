import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ fetch }) {
   const response = await fetch(`/api/images?pageNumber=1&pageCount=10`);
   const newImages = await response.json()
 
   // Retrieve 4 standalone images
   const ids = ['abstract-2', 'christmas', 'abstract-1', 'quaint-cottage'];
   const responses = await Promise.all(ids.map(id => fetch(`/api/images?id=${id}`)));
   const images = await Promise.all(responses.map(response => response.json()));
   images[0].category = "Interior"
   images[1].category = 'Portraits'
   images[2].category = 'Abstract'
   images[3].category = 'Landscape'
 
   return {newImages, images}
}