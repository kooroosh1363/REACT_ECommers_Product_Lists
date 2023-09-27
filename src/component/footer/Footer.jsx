import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="footer">
      <p>copy right @2023</p>
      <div className="social">
        <BsFacebook/>
        <BsInstagram/>
        <BsLinkedin/>
      </div>
    </div>
  )
}
