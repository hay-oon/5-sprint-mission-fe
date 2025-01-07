import Header from "./components/Header";
import Footer from "./components/Footer";
import BestItems from "./components/BestItems";
import OnSaleItems from "./components/OnSaleItems";
import "./App.css";

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
