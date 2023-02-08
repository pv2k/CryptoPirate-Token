import React, { useState, useEffect, useContext} from 'react';
import Image from "next/image";
import Style from '../styles/Navbar.module.css';
import { ERC20ICOContext } from '../context/CryptoPirateToken';
import CryptoPirateToken from '../assets/cryptopiratetoken.png';
import Loader from '../assets/loder.gif';

const Navbar = () => {
    const {account, accountBalance, userId} = useContext(ERC20ICOContext);

    return (
        <div className={Style.navBar}>  
        <div className={Style.navBar_box}>
          <div className={Style.navBar_box_left}>
            <h1>CryptoPirate Token</h1>
          </div>
          <div className={Style.navBar_box_right}>
            <p>
              Token Balance {""} {""} <span>{accountBalance}</span>
            </p>
            <p>
              <span>
                UserId #{userId} {""} {""} {account} 
              </span>
            </p>
          </div>
        </div>
      </div>
    )
}

export default Navbar