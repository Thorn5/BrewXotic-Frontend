import "./App.css";
import { Route, Routes, Switch, NavLink, Link } from "react-router-dom";
import Navbar from "./elements/Navbar";
import ShopFront from "./components/ShopFront"
import ProductDetail from "./components/ProductDetail"
import ShoppingCart from "./components/ShoppingCart"
import CheckOut from "./components/CheckOut"
import Confirmation from "./components/Confirmation"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<ShopFront />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
