import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BestItems from "./components/features/products/BestItems";
import OnSaleItems from "./components/features/products/OnSaleItems";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <BestItems />
        <OnSaleItems />
      </main>
      <Footer />
    </div>
  );
}

export default App;
