import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>copy right @2023</p>
      <div className="social">
        <BsFacebook className='icon'/>
        <BsInstagram className='icon'/>
        <BsLinkedin className='icon'/>
      </div>
    </div>
  )
}
