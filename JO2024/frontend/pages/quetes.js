import { Flex, Text, Button, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/JO2024.json
import Contract from '../../backend/artifacts/contracts/JO2024.sol/JO2024.json';
import { formAcadeeAddress, contractAddress } from 'config/constants';

export default function ExchangeToken() {
    const { address, isConnected } = useAccount()
    const provider = useProvider()
    const { data: signer } = useSigner()
    const toast = useToast()

    const mint = async(type, amount) => {
      try {
        console.log("mint type= "+type+" amount= "+amount);

        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        // type : Athletisme = 0 Aviron = 1 Escrime = 2 Basketball = 3 Boxe = 4
        let transaction = await contract.mint(type, amount);
        transaction.wait();
        toast({
          title: 'Félicitations !',
          description: "Vous avez bien ajouté des JO de sport sur votre compte !",
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
    const nonValide = async(type, amount) => {
        toast({
          title: 'Essayes encore !',
          description: "Réponse non valide",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
    }
    return (
        <Flex height="40vh" justifyContent="space-between" alignItems="center" p="2rem">
            {(isConnected ? (
              <Flex direction="row">
                <Text align="center">Les quêtes du jour</Text>
                <Flex mt="2rem">
                  <Box boxSize='50%'>
                    <Text align="left">Quel est le record du monde 100m</Text>
                    <Button onClick={() => nonValide()}>8s58s</Button><br/><br/>
                    <Button onClick={() => mint(0,50)}>9s58s</Button><br/><br/>
                    <Button onClick={() => nonValide()}>10s58</Button><br/><br/>
                  </Box>  
                  <Box boxSize='50%'>
                    <Text align="left">Qui a été champions olympiques d’aviron dans la catégorie deux de couple à Tokyo ?</Text>
                    <Button onClick={() => nonValide()}>Ruta et Oppo</Button><br/><br/>
                    <Button onClick={() => nonValide()}>Odonovan et Mc Carthy</Button><br/><br/>
                    <Button onClick={() => mint(1,500)}>Androdias et Boucheron</Button><br/><br/>
                  </Box>             
                </Flex>
              </Flex>
            ) : (
                <Box boxSize='100%' margin="100">
                    <Text align="center">Pas connecté</Text>
                </Box>          
            ))}
        </Flex>
   )
}