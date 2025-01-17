import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import BestItems from "../components/features/products/BestItems";
import OnSaleItems from "../components/features/products/OnSaleItems";

function Products() {
  return (
    <>
      <Header />
      <BestItems />
      <OnSaleItems />
      <Footer />
    </>
  );
}

export default Products;
