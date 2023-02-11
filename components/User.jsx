import React, {useState} from 'react';
import Image from 'next/image';
import Style from '../styles/User.module.css';
import CryptoPirateToken from '../assets/cryptopiratetoken.png';

const User = ({holderArray}) => {
  for(var i=0;i <holderArray.length; i++) {
    console.log("Tokens number: ", holderArray[i][3].toNumber());
  }
  return (
    <div className={Style.user}>
      {holderArray.map((el, i) => (
        <div key={i+1} className={Style.user_box}>
            <h4 className={Style.user_box_name}> 
              User #{el[0].toNumber()}
            </h4>
            <div className={Style.user_box_price_box}> 
              <p className={Style.user_box_price}>
                {el[3].toNumber()} Token
              </p>
              <p className={Style.user_box_status}>
                ${el[3].toNumber() * 50} / {el[3].toNumber()} Your Token worth
              </p>
            </div>
            <div className={Style.user_box_img}>
              <Image 
                className={Style.user_box_img_img} 
                src={CryptoPirateToken} 
                alt="token" 
                width={35} 
                height={35} 
              />
              <p>
                To:{""} {el[2].slice(0,22)}...
              </p>
            </div>
        </div>  
      ))}
    </div>
  )
}

export default User