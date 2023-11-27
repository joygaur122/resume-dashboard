import React from "react";
import './header.css'
import Img from '../../Assets/cropped-H-Instagram-Post-1.png'
import { Link } from "react-router-dom";
const Header = ()=>{
    return(
        <div className="header">
            <div className="header-logo">
            <Link to="/" key='dashboard'><h2>Hitori Tech</h2></Link>
            </div>
            <div className="profile">
                <img src={Img} alt="hitoritech" />
                <p>hitoritech</p>
            </div>
        </div>
    )
}
export default Header