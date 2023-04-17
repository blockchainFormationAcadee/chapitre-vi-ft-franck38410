import { Heading, Flex, Text, Button, useToast, Input, Box, Select, Badge } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Contract from 'config/JO2024.json';
import { contractAddress } from 'config/constants';

export default function ExchangeJo() {
    const { isConnected } = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner();
    const toast = useToast();
    const [exchangeStateToken, setExchangeStateToken] = useState(null);
    const [addressExchangeStart, setAddressExchangeStart] = useState(null);
    const [exchangeJoFrom, setExchangeJoFrom] = useState(null);
    const [exchangeJoTo, setExchangeJoTo] = useState(null);
    const [exchangeJoAmount, setExchangeJoAmount] = useState(null);

    useEffect(() => {
      if(isConnected) {
        getExchangeStateToken();
        getAddressExchangeStart();
      }
    }, []) 

    useEffect(() => {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider)
      contract.on("ExchangeEvent", (from, to, typeFom, typeTo, amount) => {
          getExchangeStateToken();
          toast({
              title: 'Evenement : échange terminé',
              description: "De : " + from + " - à " + to + " - pour une quantité de " + amount,
              status: 'success',
              duration: 8000,
              isClosable: true,
          })
      })
      return () => {
          contract.removeAllListeners();
      };
    }, [])

    const getExchangeStateToken = async() => {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      const state = await contract.exchangeState();
      console.log("getExchangeStateToken= "+state);
      setExchangeStateToken(state);
    }
    const getAddressExchangeStart = async() => {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      setAddressExchangeStart(await contract.getExchangeStart());
      console.log("exchangeStart addressExchangeStart= "+addressExchangeStart);
    }
    const exchangeStart = async() => {
        try {
          console.log("exchangeStart typeFrom= "+exchangeJoFrom+" typeTo= "+exchangeJoTo+" amount= "+exchangeJoAmount);
          const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
          let transaction = await contract.exchangeStart(exchangeJoFrom, exchangeJoTo, exchangeJoAmount);
          transaction.wait();
          getExchangeStateToken();
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien demandé un échange de sport JO2024 !",
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
          getExchangeStateToken();
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien annulé l'échange.",
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
          console.log("exchangeFound addressExchangeStart= "+addressExchangeStart);
          const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
          let transaction = await contract.exchangeFound(addressExchangeStart);
          transaction.wait();
          getExchangeStateToken();
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
          getExchangeStateToken();
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
        <Heading m={5}>Echange tes JO </Heading>
            {(isConnected ? (
                <Flex justifyContent="center">
                  <Box maxW='full' borderWidth='1px' borderRadius='lg' overflow='hidden' w={['100%', '100%', '100%', '50%']}>
                    <Box p='4' borderWidth='1px'> 
                      <Box p='4'>
                          <Badge fontSize='12' borderRadius='full' px='2' colorScheme='teal'>
                            Choississez les sports à échanger et la quantité de JO
                          </Badge>
                      </Box>
                      <Box p='2'>
                        <Box display='flex' alignItems='baseline'>
                          <Box
                            color='gray.500'
                            fontWeight='bold'
                            letterSpacing='wide'
                            fontSize='20'
                            textTransform='uppercase'
                            ml='5'
                          >
                          <select ml='5' onChange={(e) => { setExchangeJoFrom(e.target.value)} } >
                            <option value="">Sélectionner votre sport à échanger</option>
                            <option value="0">Athlétisme</option>
                            <option value="1">Aviron</option>
                            <option value="2">Escrime</option>
                            <option value="3">Basketball</option>
                            <option value="4">Boxe</option>
                          </select>
                          <select ml='5' onChange={(e) => { setExchangeJoTo(e.target.value)} } >
                            <option value="">Sélectionner votre sport recherché</option>
                            <option value="0">Athlétisme</option>
                            <option value="1">Aviron</option>
                            <option value="2">Escrime</option>
                            <option value="3">Basketball</option>
                            <option value="4">Boxe</option>
                          </select>
                          <Input ml='5' type="type" maxLength="5" width="100px" placeholder="Quantité " onChange={(e) => setExchangeJoAmount(e.target.value)} />
                          </Box>
                        </Box>
                      </Box>
                      <Box p='2'>
                        <Box display='flex' alignItems='baseline'>
                          <Button justifyContent="right" variant='solid' colorScheme='blue' onClick={() => exchangeStart()}>Démarre l'échange</Button>                   
                        </Box>
                      </Box>
                    </Box>
                    <Box><br/></Box>
                    <Box p='4' borderWidth='1px'>    
                      <Box p='4'>
                          <Badge fontSize='12' borderRadius='full' px='2' colorScheme='teal'>
                            Etat de l'échange en cours
                          </Badge>
                      </Box>                                                
                      <Box p='2'>
                       <Box display='flex' alignItems='baseline'>
                        <Button variant='solid' colorScheme='blue' onClick={() => exchangeCancelStart()}>Annuler l'échange</Button>                      
                        <Text m="30" color='blue.600' fontSize='20' align="left">Etat de l'échange : {exchangeStateToken}</Text>
                        <Button m="30" variant='solid' colorScheme='blue' onClick={() => exchangeClose()}>Clôturer l'échange</Button>
                       </Box>
                      </Box>
                    </Box>
                    <Box><br/></Box>
                    <Box p='4' borderWidth='1px'>    
                      <Box p='4'>
                          <Badge fontSize='12' borderRadius='full' px='2' colorScheme='teal'>
                            Liste des demandes d'échange
                          </Badge>
                      </Box>  
                      {(addressExchangeStart==="0x0000000000000000000000000000000000000000" ? (
                            <Text m="30" color='blue.600' fontSize='20' align="left">Pas de proposition d'échange</Text>
                          ) : (
                          <Box p='2'>
                            <Box display='flex' alignItems='baseline'>
                            <Button variant='solid' colorScheme='blue' onClick={() => exchangeFound()}>Faire l'échange avec : {addressExchangeStart}</Button>
                            </Box>
                          </Box>
                      ))}
                    </Box>
                  </Box>
                </Flex>
            ) : (
                <Box boxSize='100%' margin="100">
                    <Text color='blue.600' fontSize='30' align="center">Merci de vous connecter</Text>
                </Box>          
            ))}
      </Box>
   )
}