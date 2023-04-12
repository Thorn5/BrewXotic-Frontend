import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/"> ShopFront </NavLink>
          </li>
          <li>
            <NavLink to="/ProductDetail"> ProductDetail </NavLink>
          </li>
          <li>
            <NavLink to="/ShoppingCart"> ShoppingCart </NavLink>
          </li>
          <li>
            <NavLink to="/CheckOut"> CheckOut </NavLink>
          </li>
          <li>
            <NavLink to="/Confirmation"> Confirmation </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
