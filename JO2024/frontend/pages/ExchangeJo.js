import { Heading, Flex, Text, Button, useToast, Input, Box, Select } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Contract from '../../backend/artifacts/contracts/JO2024.sol/JO2024.json';
import { formAcadeeAddress, contractAddress } from 'config/constants';

export default function ExchangeJo() {
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner();
    const toast = useToast();
    const [exchangeStateToken, setExchangeStateToken] = useState(null);
    const [exchangeJoFrom, setExchangeJoFrom] = useState(null);
    const [exchangeJoTo, setExchangeJoTo] = useState(null);
    const [exchangeJoAmount, setExchangeJoAmount] = useState(null);

    useEffect(() => {
      if(isConnected) {
        getExchangeStateToken()
      }
    }, [address])

    const getExchangeStateToken = async() => {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      let stateToken = await contract.exchangeState();
      setExchangeStateToken(stateToken.toString());
    }

    const exchangeStart = async() => {
        try {
          console.log("exchangeStart typeFrom= "+exchangeJoFrom+" typeTo= "+exchangeJoTo+" amount= "+exchangeJoAmount);
          const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
          let transaction = await contract.exchangeStart(exchangeJoFrom, exchangeJoTo, exchangeJoAmount);
          transaction.wait();
          getExchangeStateToken()
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien demandé un échange de vos NFT JO2024 !",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
        catch {
          toast({
            title: 'Erreur !',
            description: "Une erreur est survenue",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      }
      const exchangeCancelStart = async() => {
        try {
          console.log("exchangeCancelStart");
          const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
          let transaction = await contract.exchangeCancelStart();
          transaction.wait();
          getExchangeStateToken()
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien demandé un échange de vos NFT JO2024 !",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
        catch {
          toast({
            title: 'Erreur !',
            description: "Une erreur est survenue",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      }
      const exchangeFound = async() => {
        try {
          console.log("exchangeFound");
          const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
          let transaction = await contract.exchangeFound(formAcadeeAddress);
          transaction.wait();
          getExchangeStateToken()
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien trouvé un échange de vos NFT JO2024 !",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
        catch {
          toast({
            title: 'Erreur !',
            description: "Une erreur est survenue",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      }
      const exchangeClose = async() => {
        try {
          console.log("exchangeClose");
          const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
          let transaction = await contract.exchangeClose();
          transaction.wait();
          getExchangeStateToken()
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien fermé l'échange de vos NFT JO2024 !",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
        catch {
          toast({
            title: 'Erreur !',
            description: "Une erreur est survenue",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
    }

    return (
        <Box>
        <Heading>Echange </Heading>
        <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
            {(isConnected ? (
                <Box boxSize='100%' margin="100">
                    <Text color='blue.600' fontSize='24' align="left">JO Sport à échanger :</Text>
                    <select onChange={(e) => { setExchangeJoFrom(e.target.value)} } >
                      <option value="0">Athlétisme</option>
                      <option value="1">Aviron</option>
                      <option value="2">Escrime</option>
                      <option value="3">Basketball</option>
                      <option value="4">Boxe</option>
                    </select><br/>
                    <Text color='blue.600' fontSize='24' align="left">JO Sport recherché :</Text>
                    <select onChange={(e) => { setExchangeJoTo(e.target.value)} } >
                      <option value="0">Athlétisme</option>
                      <option value="1">Aviron</option>
                      <option value="2">Escrime</option>
                      <option value="3">Basketball</option>
                      <option value="4">Boxe</option>
                    </select>
                    <Text color='blue.600' fontSize='24' align="left">Quantité : </Text>
                    <Input mt="1rem" placeholder="Quantité : " onChange={(e) => setExchangeJoAmount(e.target.value)} />
                    <Button variant='solid' colorScheme='blue' onClick={() => exchangeStart()}>Démarre un échange</Button>
                    <Button variant='solid' colorScheme='blue' onClick={() => exchangeCancelStart()}>Arrêter l'échange</Button>
                    <Text color='blue.600' fontSize='24' align="left">Etat de l'échange :{exchangeStateToken}</Text>
                    <br/><br/>
                    <Button variant='solid' colorScheme='blue' onClick={() => exchangeFound()}>Faire l'échange</Button><br/><br/>
                    <Button variant='solid' colorScheme='blue' onClick={() => exchangeClose()}>Clôturer l'échange</Button><br/>
                </Box>
            ) : (
                <Box boxSize='100%' margin="100">
                    <Text color='blue.600' fontSize='30' align="center">Merci de vous connecter</Text>
                </Box>          
            ))}
        </Flex>
        </Box>
   )
}