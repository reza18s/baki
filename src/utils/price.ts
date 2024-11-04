export const calculatePriceWithDiscount = (
  price: number | string,
  discount?: number,
): number => {
  if (!discount) {
    discount = 0;
  }
  if (typeof price === "string") {
    price = parseFloat(price);
  }
  if (price) {
    return Math.max(price - (price * discount) / 100, 0);
  } else {
    return NaN;
  }
};

export const priceToString = (
  price: number | string,
  discount?: number,
): string => {
  return calculatePriceWithDiscount(price, discount).toLocaleString();
};
