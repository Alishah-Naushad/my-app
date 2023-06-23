import { ethers } from "ethers";

export default async function getContractInstance(abi, contractAddress) {

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  const Contract =  new ethers.Contract(contractAddress, abi, signer)

  return Contract;

}