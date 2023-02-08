import React, { useState, useEffect, useContext} from 'react';
import Image from "next/image";
import { ERC20ICOContext } from '../context/CryptoPirateToken';
import Style from '../styles/Index.module.css';
import Banner from '../assets/home-banner.png';
import CryptoPirateToken from '../assets/cryptopiratetoken.png';
import Transfer from '../components/Transfer';
import User from '../components/User';

const Home = () => {
  const {
    connectWallet, 
    ERC20CryptoPirateToken, 
    transferToken, 
    tokenHolderData, 
    walletConnected,
    holderArray,
    account,
    accountBalance,
    userId,
    noOfToken,
    tokenName,
    tokenStandard,
    tokenSymbol,
    tokenOwner,
    tokenOwnerBal
  } = useContext(ERC20ICOContext);

  useEffect(()=>{
    connectWallet();
    tokenHolderData();
    ERC20CryptoPirateToken();
  }, []);

  console.log(tokenOwner);
  
  return (
    <div className={Style.home}> 
      <div className={Style.heroSection}>
        <div className={Style.heroSection_left}>
          <h1>Launching Crypto Pirate(CP) Token</h1>
          <p>
            Based on One Piece Anime.
          </p>
          <div className={Style.heroSection_left_btn}>
            <button className={Style.btn}>White Paper</button>
            <button className={Style.btn}>About Coin</button>
          </div>
        </div>
        <div className={Style.heroSection_right}>
          <Image src={CryptoPirateToken} alt="Token" className={Style.heroSection_right_img_one} width={300} heigt={300}/>
          <Image src={CryptoPirateToken} alt="Token" className={Style.heroSection_right_img} width={200} height={200}/>
          <Image src={CryptoPirateToken} alt="Token" className={Style.heroSection_right_img} width={100} height={100}/>
          <Image src={CryptoPirateToken} alt="Token" className={Style.heroSection_right_img} width={50} height={50}/>
          <Image src={CryptoPirateToken} alt="Token" className={Style.heroSection_right_img} width={20} height={20}/>
        </div>
      </div>
      <Transfer 
        noOfToken={noOfToken} 
        tokenName={tokenName} 
        tokenStandard={tokenStandard}
        tokenSymbol={tokenSymbol}
        tokenOwnerBal={tokenOwnerBal}
        transferToken={transferToken}
      />
      <User holderArray={holderArray}/>
    </div>
  )
};

export default Home;