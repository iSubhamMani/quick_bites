import { useState } from "react";
import logo from "../utils/img/logo_128.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  return (
    <div className="bg-white p-4 border-b-2 border-gray-40 shadow-lg">
      <div className="w-4/5 mx-auto max-w-screen-xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="logo-container">
            <img className="w-16" src={logo} />
          </div>
          <div className="brand-container">
            <h1 className="brand-text whitespace-nowrap text-xl font-medium text-[#F8366D]">
              Namaste Food
            </h1>
          </div>
        </div>
        <div className="nav-items">
          <ul className="flex gap-4 ">
            <li
              className="text-[#F8366D] border-b-2 border-b-transparent hover:text-[#3D006B] whitespace-nowrap font-medium
            transition ease-in-out hover:border-b-2 hover:border-b-[#3D006B]"
            >
              <Link to="/groceries">Grocery</Link>
            </li>
            <li
              className="text-[#F8366D] border-b-2 border-b-transparent hover:text-[#3D006B] whitespace-nowrap font-medium
            transition ease-in-out hover:border-b-2 hover:border-b-[#3D006B]"
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="text-[#F8366D] border-b-2 border-b-transparent hover:text-[#3D006B] whitespace-nowrap font-medium
            transition ease-in-out hover:border-b-2 hover:border-b-[#3D006B]"
            >
              <Link to="/about">About us</Link>
            </li>
            <li
              className="text-[#F8366D] border-b-2 border-b-transparent hover:text-[#3D006B] whitespace-nowrap font-medium
            transition ease-in-out hover:border-b-2 hover:border-b-[#3D006B]"
            >
              <Link to="/contact">Contact us</Link>
            </li>
            <li
              className="text-[#F8366D] border-b-2 border-b-transparent hover:text-[#3D006B] whitespace-nowrap font-medium
            transition ease-in-out hover:border-b-2 hover:border-b-[#3D006B]"
            >
              Cart
            </li>
            <button
              className="text-[#F8366D] border-b-2 border-b-transparent hover:text-[#3D006B] whitespace-nowrap font-medium
              transition ease-in-out hover:border-b-2 hover:border-b-[#3D006B]"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
