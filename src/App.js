import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //todo ask Nuria about Route being needed but not called
import { Route, Routes } from "react-router-dom";
import Grid from "./elements/Grid";
import ShopFront from "./views/ShopFront";
import ShoppingCart from "./views/ShoppingCart";
import CheckOut from "./views/CheckOut";
import CartProvider from "./hooks/CartProvider";

function App() {
  return (
    <div className="App">
      <Grid>
        {/* Navbar.js incorporated in Grid */}
        <CartProvider> 
          <Routes>
            <Route path="/" element={<ShopFront />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/CheckOut" element={<CheckOut />} />
          </Routes>
        </CartProvider>
      </Grid>
    </div>
  );
}

export default App;
