import { Heading, Flex, Text, Button, useToast, Image, Box, SimpleGrid } from '@chakra-ui/react';

import { useAccount, useProvider, useSigner } from 'wagmi'
import { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import JO2024 from "../components/JO2024"

import Contract from '../../backend/artifacts/contracts/JO2024.sol/JO2024.json';
import { formAcadeeAddress, contractAddress } from 'config/constants';

const MyJo2024 = () => {
    const { address, isConnected } = useAccount()
    const provider = useProvider()
    const { data: signer } = useSigner()
    const toast = useToast()
    const [amountBurn, setAmountBurn] = useState(null)
    const [supplyAthletisme, setSupplyAthletisme] = useState(null)
    const [supplyAviron, setSupplyAviron] = useState(null)
    const [supplyEscrime, setSupplyEscrime] = useState(null)
    const [supplyBasketball, setSupplyBasketball] = useState(null)
    const [supplyBoxe, setSupplyBoxe] = useState(null)
    const [mintedAthletisme, setMintedAthletisme] = useState(null)
    const [mintedAviron, setMintedAviron] = useState(null)
    const [mintedEscrime, setMintedEscrime] = useState(null)
    const [mintedBasketball, setMintedBasketball] = useState(null)
    const [mintedBoxe, setMintedBoxe] = useState(null)
    const [nbMintedAthletisme, setNbMintedAthletisme] = useState(null)
    const [nbMintedAviron, setNbMintedAviron] = useState(null)
    const [nbMintedEscrime, setNbMintedEscrime] = useState(null)
    const [nbMintedBasketball, setNbMintedBasketball] = useState(null)
    const [nbMintedBoxe, setNbMintedBoxe] = useState(null)

    useEffect(() => {
        if(isConnected) {
          getDatas()
        }
    }, [address])

    const getDatas = async() => {
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        setAmountBurn((await contract.amountBurn()).toString());

        setMintedAthletisme((await contract.minted(0)).toString());
        setMintedAviron((await contract.minted(1)).toString());
        setMintedEscrime((await contract.minted(2)).toString());
        setMintedBasketball((await contract.minted(3)).toString());
        setMintedBoxe((await contract.minted(4)).toString());

        setSupplyAthletisme((await contract.supplies(0)).toString());
        setSupplyAviron((await contract.supplies(1)).toString());
        setSupplyEscrime((await contract.supplies(2)).toString());
        setSupplyBasketball((await contract.supplies(3)).toString());
        setSupplyBoxe((await contract.supplies(4)).toString());

        setNbMintedAthletisme((await contract.balanceOf(address, 0)).toString());
        setNbMintedAviron((await contract.balanceOf(address, 1)).toString());
        setNbMintedEscrime((await contract.balanceOf(address, 2)).toString());
        setNbMintedBasketball((await contract.balanceOf(address, 3)).toString());
        setNbMintedBoxe((await contract.balanceOf(address, 4)).toString());
    }

    return ( 
        <Box>
        <Heading>Mes JO 2024 </Heading>
        <SimpleGrid columns={[1, null]} spacing='40px'>
        {isConnected ? 
            (
                <Box>
                <SimpleGrid columns={[1, null, 2, null, 3, null, 4, null, 5, null]} spacing='10px'>
                    <JO2024 tokenID = '0' jo={nbMintedAthletisme} amountBurn={amountBurn} supply={supplyAthletisme} minted={mintedAthletisme}/>
                    <JO2024 tokenID = '1' jo={nbMintedAviron} amountBurn={amountBurn} supply={supplyAviron} minted={mintedAviron}/>
                    <JO2024 tokenID = '2' jo={nbMintedEscrime} amountBurn={amountBurn} supply={supplyEscrime} minted={mintedEscrime}/>
                    <JO2024 tokenID = '3' jo={nbMintedBasketball} amountBurn={amountBurn} supply={supplyBasketball} minted={mintedBasketball}/>
                    <JO2024 tokenID = '4' jo={nbMintedBoxe} amountBurn={amountBurn} supply={supplyBoxe} minted={mintedBoxe}/>
                </SimpleGrid>
                </Box>
            ) :
            (  
                <Text>non connecté</Text>
            )
        }
        </SimpleGrid>
        </Box>
    );
    };
    
export default MyJo2024;