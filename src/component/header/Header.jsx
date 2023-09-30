import React from 'react';
import { BsSearch } from "react-icons/bs";
import { BsFillBasketFill } from "react-icons/bs";
import "./header.css";
import image from "../../assets/images/raad.png";
import { Link } from "react-router-dom"
// import Product from '../../pages/product/Products';


function Header() {
  return (
    <div className="container">
      <nav className='nav'>
        <div className="logo">
          <img src={image} alt="" />
        </div>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><a href="#">ABOUT US</a></li>
          <li><Link to="/product">PRODUCT</Link></li>
          <li><a href="#">CONTACT</a></li>
        </ul>

        <div className="search">
          <BsSearch className='boot' />
          <BsFillBasketFill className='boot' />
        </div>
      </nav>
    </div>

  );
}

export default Header;
