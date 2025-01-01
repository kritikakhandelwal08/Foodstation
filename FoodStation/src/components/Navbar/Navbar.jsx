import React, { useState } from "react";
import "./Navbar.css";
import logo from "/public/logo white.png";
import { PiShoppingCartFill } from "react-icons/pi";
import { ImLocation } from "react-icons/im";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = ({onLoginClick}) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Your Location");

  // Sample location options
  const locations = ["Alwar", "Jaipur", "Delhi"];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/" onClick={() => setMenu("home")}
          className={menu === "/" ? "active" : ""}>
          <img className="logo" src={logo} alt=""></img>
        </Link>
      </div>

      <div className="center-nav">
        <ul>
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            <Link to="/">Home</Link>
          </li>
          {/* <li
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            <Link to="/menu">Menu</Link>
          </li> */}
          <li
            onClick={() => setMenu("contact us")}
            className={menu === "contact us" ? "active" : ""}
          >
            <Link to="/partner">Partner with Us</Link>
          </li>
        </ul>
      </div>

      <div className="right-nav">
        <div className="location">
          {<ImLocation className="location-icon" />
          /*<input
            type="text"
            value={selectedLocation}
            readOnly
            className="location-bar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Open dropdown on click
          />
          <RiArrowDropDownLine className="location-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {locations.map((location, index) => (
                <li key={index} onClick={() => handleLocationSelect(location)}>
                  {location}
                </li>
              ))}
            </ul>
          )} */}
          <select name="location" id="location">
            <option value="" disabled selected>Your Location</option>
            <option value="alwar">Alwar</option>
            <option value="jaipur">Jaipur</option>
            <option value="delhi">Delhi</option>
          </select>

        </div>

        {/* <input type="text" placeholder="Search..." className="search-bar" /> */}

        <div
          onClick={() => setMenu("cart")}
          className={menu === "cart" ? "active" : ""}
        >
          <Link to="/cart">
            <PiShoppingCartFill className="cart" />
          </Link>
        </div>
        
        <button onClick={onLoginClick} className="sign-in-btn">Sign In</button>
        
      </div>
    </nav>
  );
};

export default Navbar;
