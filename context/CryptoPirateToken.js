import React, { useState, useEffect, useRef, useContext} from 'react';
import Web3Modal from "web3modal";
import { BigNumber, Contract, providers, utils, ethers } from "ethers";
import { cryptoPirateTokenAddress, cryptoPirateTokenABI } from "./constants";

const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(cryptoPirateTokenAddress, cryptoPirateTokenABI, signerOrProvider);

export const ERC20ICOContext = React.createContext();

export const ERC20ICOContextProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [holderArray, setholderArray] = useState([]);
  const [account, setAccount] = useState("");
  const [accountBalance, setaccountBalance] = useState("");
  const [userId, setuserId] = useState("");
  const [noOfToken, setNoOfToken] = useState("");
  const [tokenName, settokenName] = useState("");
  const [tokenStandard, settokenStandard] = useState("");
  const [tokenSymbol, settokenSymbol] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenOwnerBal, settokenOwnerBal] = useState("");

  const web3modalRef = useRef();

  const getProviderOrSigner = async(needSigner=false) => {
    const provider = await web3modalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");      
    }
    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;      
    }
    return web3Provider;
  }

/**
 * @dev Connect Metamask Wallet
 */
  const connectWallet = async() => {
    try {
      if(!window.ethereum){
        return console.log("Install metamask");
      }
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0]);
      setWalletConnected(true);

      // //connection with the smart contract 
      // const web3modal = new Web3Modal();
      // const connection = await web3modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        cryptoPirateTokenAddress,
        cryptoPirateTokenABI,
        provider
      )
      console.log("contract: ", await contract.balanceAddress(accounts[0]));
      //Get TokenHolderInfo Data
      const getAccountBalance = await contract.balanceAddress(accounts[0]);
      console.log("Big number of balance: ", getAccountBalance);
      setaccountBalance(getAccountBalance.toNumber()); 
      const tokenHolder = await contract._transactionId();
      setuserId(tokenHolder.toNumber());
    } catch (error) {
      console.error(error);
    }
  }

  const ERC20CryptoPirateToken = async() => {
    try {
      //connection with the smart contract 
      // const web3modal = new Web3Modal();
      // const connection = await web3modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // const signer = provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      // const contract = fetchContractERC20(signer);
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        cryptoPirateTokenAddress,
        cryptoPirateTokenABI,
        provider
      )
      console.log("Owner of contract: ", await contract.owner());
      
      const supply = await contract.totalSupply();
      setNoOfToken(supply.toNumber());
      const name = await contract.name();
      settokenName(name);
      const symbol = await contract.symbol();
      settokenSymbol(symbol);
      const standard = await contract.standard();
      settokenStandard(standard);
      const owner = await contract.owner();
      setTokenOwner(owner);
      const ownerBalance = await contract.balanceAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      settokenOwnerBal(ownerBalance.toNumber());

    } catch (error) {
      console.log(error);
    }
  }

  const transferToken = async(address, value) => {
    try {
      // const web3modal = new Web3Modal();
      // const connection = await web3modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // // const signer = provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      // const signer = provider.getSigner();
      // const contract = fetchContractERC20(signer);

      const provider = await getProviderOrSigner();
      const contract = new Contract(
        cryptoPirateTokenAddress,
        cryptoPirateTokenABI,
        provider
      )

      const transfer = await contract.transfer(address, BigInt(value * 1));
      transfer.wait();
      window.location.reload();    
    } catch (error) {
      console.log(error);
    }
  }

  const tokenHolderData = async() => {
    try {
      // const web3modal = new Web3Modal();
      // const connection = await web3modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // // const signer = provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      // const signer = provider.getSigner();
      // const contract = fetchContractERC20(signer);

      const provider = await getProviderOrSigner();
      const contract = new Contract(
        cryptoPirateTokenAddress,
        cryptoPirateTokenABI,
        provider
      )
      const tokenHolder = await contract.getTokenHolder();
      tokenHolder.map(async(el) => {
        const tokenHolderData = await contract.getTokenHolderData(el);
        holderArray.push(tokenHolderData);
        console.log(holderArray);
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!walletConnected) {
      web3modalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  return (
    <ERC20ICOContext.Provider 
      value={{
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
      }}
    >
      {children}
    </ERC20ICOContext.Provider>
  );
};