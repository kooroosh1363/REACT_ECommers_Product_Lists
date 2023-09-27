import React from 'react'
import { BsSearch } from "react-icons/bs";
import { BsFillBasketFill } from "react-icons/bs";


export default function Header() {
  return (
    <nav>
        <div className="logo">Hats</div>
        <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">PRODUCT</a></li>
            <li><a href="#">CONTACT</a></li>
        </ul>

        <div className="search">
            <BsSearch/>
            <BsFillBasketFill/>
        </div>
    </nav>
  )
}
