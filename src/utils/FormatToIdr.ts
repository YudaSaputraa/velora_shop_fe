export function formatToIdr(price: number): string {
  if (price == null || isNaN(price)) return "";

  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    console.error("Invalid format:", price);
    return price.toString();
  }
}
