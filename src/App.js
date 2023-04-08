import "./App.css";
import { Route, Routes, Switch, NavLink, Link } from "react-router-dom";
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
