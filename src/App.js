import "./App.css";
import { Route, Routes } from "react-router-dom";
import Grid from "./elements/Grid";
import ShopFront from "./components/ShopFront"
import ProductDetail from "./components/ProductDetail"
import ShoppingCart from "./components/ShoppingCart"
import CheckOut from "./components/CheckOut"
import Confirmation from "./components/Confirmation"

function App() {
  return (
    <div className="App">
      <Grid> {/* Navbar.js incorporated in Grid */}
      <Routes>
        <Route path="/" element={<ShopFront />}>
          {/* <Route index element={<ShopFront />} /> */}
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
      </Grid>
    </div>
  );
}

export default App;
