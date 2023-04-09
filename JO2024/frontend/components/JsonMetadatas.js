import { ethers } from "ethers";
import { contractAddress } from './../config/constants';
import contractAbi from './../config/JO2024.json';

 const JsonMetadatas = async (tokenID) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('contractAddress ', contractAddress) ;
        const contractJO2024 = new ethers.Contract(contractAddress, contractAbi.abi, provider);
        const ipfsURI = await contractJO2024.uri(tokenID)
        console.log('ipfsURI ' + ipfsURI) ;
        const nftURI = ipfsURI.replace("{id}", "000000000000000000000000000000000000000000000000000000000000000"+tokenID);
        console.log('json URI ' + nftURI) ;
        const response = await fetch(nftURI);
    
            if(!response.ok)
              throw new Error(response.statusText);
            
        const json = await response.json();
        return json ;

    };
    export default JsonMetadatas ;