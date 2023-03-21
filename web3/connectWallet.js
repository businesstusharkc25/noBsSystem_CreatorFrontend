import { ethers } from "ethers";

const connectUserWalletToDapp = async () => {
  try {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer;
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();

    return signer.address;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default connectUserWalletToDapp;
