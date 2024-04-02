import { m as medusa } from "../../../../chunks/medusa.js";
import { e as error } from "../../../../chunks/index.js";
import { b as filteredValues } from "../../../../chunks/utils.js";
const load = async function({ fetch, params }) {
  let product = await getProduct(params.slug);
  if (!product)
    throw error(404, "Product not found");
  product.valid_until = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 7).toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
  const response = await fetch(`/api/images?id=${params.slug}`);
  const image = await response.json();
  product.images = [{ url: image.url, alt: "" }];
  product.thumbnail = image.image;
  return {
    product
  };
};
async function getProduct(handle) {
  let product = await medusa.products.list({ handle }).then(({ products }) => products[0]);
  if (!product) {
    return null;
  }
  for (let option of product.options) {
    option.filteredValues = filteredValues(option);
  }
  return product;
}
export {
  load
};
