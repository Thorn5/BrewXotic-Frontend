import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Grid from "./elements/Grid";
import ShopFront from "./views/ShopFront";
import ProductDetail from "./views/ProductDetail";
import ShoppingCart from "./views/ShoppingCart";
import CheckOut from "./views/CheckOut";
import Confirmation from "./views/Confirmation";

function App() {
  return (
    <div className="App">
      <Grid> {/* Navbar.js incorporated in Grid */}
        <Routes>
          <Route path="/" element={<ShopFront />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Confirmation" element={<Confirmation />} />
        </Routes>
      </Grid>
    </div>
  );
}

export default App;
