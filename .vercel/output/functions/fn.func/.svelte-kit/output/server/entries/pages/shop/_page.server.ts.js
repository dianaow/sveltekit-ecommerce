import { m as medusa } from "../../../chunks/medusa.js";
const load = async function({ fetch, params }) {
  let products = await medusa.products.list().then(({ products: products2 }) => products2);
  const response = await fetch(`/api/images?pageNumber=${params.pageNumber}&pageCount=${params.pageCount}`);
  const images = await response.json();
  if (products.length > 0) {
    products.forEach((p, i) => {
      const image = images.find((image2) => image2.public_id.split("/")[1] === p.handle);
      p.images = [{ url: image, alt: i }];
      p.thumbnail = image;
    });
  }
  return {
    products
  };
};
export {
  load
};
