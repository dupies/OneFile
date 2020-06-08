//overrides metamask v0.2 for 1.o version
//1.0 lets us use async and await instead of promises 

import Web3 from "web3";

const web3 = new Web3 (window.web3.currentProvider);
export default web3;


// import Web3 from 'web3';

// const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
// web3.eth.getAccounts().then(console.log);

// export default web3;

