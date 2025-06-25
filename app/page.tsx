import FeaturesSection from "./_components/feature-section";
import Products from "./_components/product/products";
import Slider from "./_components/Slider";
import TopCategories from "./_components/categorry/top-category";
import { GetQuery } from "@/lib/queries";

export default async function Home() {
  const { data: productList } = GetQuery(
    "getProducts",
    {},
    true,
    null,
    Infinity
  );
  const { data: categoryList } = GetQuery(
    "getCategoryList",
    {},
    true,
    null,
    Infinity
  );

  return (
    <div>
      <Slider />
      <TopCategories categoryList={categoryList} />
      <Products productList={productList} />
      <FeaturesSection />
    </div>
  );
}
