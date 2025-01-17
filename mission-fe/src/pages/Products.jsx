import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import BestItems from "../components/features/products/bestitems/BestItems";
import OnSaleItems from "../components/features/products/onsaleitems/OnSaleItems";

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
