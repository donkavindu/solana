import { fetchProducts } from "@/lib/backend";
import Products from "../blog/Products";

export const ProductsServer = async () => {
  const result = await fetchProducts();
  const products = result?.data?.data || [];

  return <Products products={products} />;
};
