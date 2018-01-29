import React from "react";
import classes from "./Logo.css";
import chatLogo from "../../assets/images/chat_social.png";
const logo =(props)=>(
    <div className={classes.Logo} >
        <img src={chatLogo} alt="chatApp"/>
    </div>
);

export default logo;