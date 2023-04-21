import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav>
        <ul className = "navlist">
          <li className = "navitem">
            <NavLink to="/"> ShopFront </NavLink>
          </li>
          <li className = "navitem">
            <NavLink to="/ShoppingCart"> ShoppingCart </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
