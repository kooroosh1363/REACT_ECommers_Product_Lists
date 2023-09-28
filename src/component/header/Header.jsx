import React from 'react'
import { BsSearch } from "react-icons/bs";
import { BsFillBasketFill } from "react-icons/bs";
import "./header.css"
import image from "../../assets/images/raad.png"

export default function Header() {
  return (
      <nav className='nav'>
          <div className="logo">
            <img src={image} alt="" />
          </div>
          <ul>
              <li><a href="#">HOME</a></li>
              <li><a href="#">ABOUT US</a></li>
              <li><a href="#">PRODUCT</a></li>
              <li><a href="#">CONTACT</a></li>
          </ul>

          <div className="search">
              <BsSearch className='boot'/>
              <BsFillBasketFill className='boot'/>
          </div>
      </nav>
  );
}
