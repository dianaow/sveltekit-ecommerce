const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price / 100);
};
const findSelectedOptions = (variantId, product) => {
  let selectedOptions = [];
  if (!variantId)
    return selectedOptions;
  let variantIndex = product.variants.findIndex((v) => v.id === variantId);
  if (variantIndex === -1)
    return selectedOptions;
  for (let option of product.variants[variantIndex].options) {
    let index = product.options.findIndex((o) => o.filteredValues.includes(option.value));
    selectedOptions[product.options[index].id] = option.value;
  }
  return selectedOptions;
};
const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const filteredValues = (option) => option.values.map((v) => v.value).filter(onlyUnique);
export {
  findSelectedOptions as a,
  filteredValues as b,
  formatPrice as f
};
