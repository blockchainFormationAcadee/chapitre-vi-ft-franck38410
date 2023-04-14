import { Heading, Text, Box, SimpleGrid } from '@chakra-ui/react';
import { useAccount, useProvider} from 'wagmi'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import JoComponent from "../components/JoComponent"
import Contract from 'config/JO2024.json';
import { contractAddress } from 'config/constants';

const MyUnique = () => {
    const { address, isConnected } = useAccount()
    const provider = useProvider()
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

        setMintedAthletisme((await contract.minted(5)).toString());
        setMintedAviron((await contract.minted(6)).toString());
        setMintedEscrime((await contract.minted(7)).toString());
        setMintedBasketball((await contract.minted(8)).toString());
        setMintedBoxe((await contract.minted(9)).toString());

        setSupplyAthletisme((await contract.supplies(5)).toString());
        setSupplyAviron((await contract.supplies(6)).toString());
        setSupplyEscrime((await contract.supplies(7)).toString());
        setSupplyBasketball((await contract.supplies(8)).toString());
        setSupplyBoxe((await contract.supplies(9)).toString());

        setNbMintedAthletisme((await contract.balanceOf(address, 5)).toString());
        setNbMintedAviron((await contract.balanceOf(address, 6)).toString());
        setNbMintedEscrime((await contract.balanceOf(address, 7)).toString());
        setNbMintedBasketball((await contract.balanceOf(address, 8)).toString());
        setNbMintedBoxe((await contract.balanceOf(address, 9)).toString());
    }

    return ( 
        <Box>
        <Heading m={5}>Mes Uniques 2024 </Heading>
        <SimpleGrid columns={[1, null]} spacing='40px'>
        {isConnected ? 
            (
                <Box>
                <SimpleGrid columns={[1, null, 2, null, 3, null, 4, null, 5, null]} spacing='10px'>
                    <JoComponent tokenID = '5' jo={nbMintedAthletisme} amountBurn={amountBurn} supply={supplyAthletisme} minted={mintedAthletisme}/>
                    <JoComponent tokenID = '6' jo={nbMintedAviron} amountBurn={amountBurn} supply={supplyAviron} minted={mintedAviron}/>
                    <JoComponent tokenID = '7' jo={nbMintedEscrime} amountBurn={amountBurn} supply={supplyEscrime} minted={mintedEscrime}/>
                    <JoComponent tokenID = '8' jo={nbMintedBasketball} amountBurn={amountBurn} supply={supplyBasketball} minted={mintedBasketball}/>
                    <JoComponent tokenID = '9' jo={nbMintedBoxe} amountBurn={amountBurn} supply={supplyBoxe} minted={mintedBoxe}/>
                </SimpleGrid>
                </Box>
            ) :
            (  
                <Text color='blue.600' fontSize='30' align="center">Merci de vous connecter</Text>
            )
        }
        </SimpleGrid>
        </Box>
    );
    };
    
export default MyUnique;