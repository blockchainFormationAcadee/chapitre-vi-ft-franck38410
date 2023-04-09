import { Heading, Flex, Text, Button, useToast, Box } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers';
// Dev : In production the ABI json will be stored into /config/JO2024.json
import Contract from '../../backend/artifacts/contracts/JO2024.sol/JO2024.json';
import { contractAddress } from 'config/constants';

export default function Quetes() {
    const {  isConnected } = useAccount()
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
      <Box>
        <Heading>Les quêtes du jour </Heading>
          <Flex height="40vh" justifyContent="space-between" alignItems="center" p="2rem">
              {(isConnected ? (
                <Flex direction="row">
                  <Flex mt="2rem">
                    <Box boxSize='100%'>
                      <Text align="left">Quel est le record du monde 100m ? Gain 100 JO</Text>
                      <Button onClick={() => nonValide()}>8s58s</Button><br/><br/>
                      <Button onClick={() => mint(0,100)}>9s58s</Button><br/><br/>
                      <Button onClick={() => nonValide()}>10s58</Button><br/><br/>
                    </Box>  
                    <Box boxSize='33%'>
                      <Text align="left">Qui a été champions olympiques d’aviron dans la catégorie deux de couple à Tokyo ? Gain 100 JO</Text>
                      <Button onClick={() => nonValide()}>Ruta et Oppo</Button><br/><br/>
                      <Button onClick={() => nonValide()}>Odonovan et Mc Carthy</Button><br/><br/>
                      <Button onClick={() => mint(1,100)}>Androdias et Boucheron</Button><br/><br/>
                    </Box>     
                    <Box boxSize='33%'>
                      <Text align="left">En quel année l'escrime est entrée au JO ? Gain 900 JO</Text>
                      <Button onClick={() => mint(2,900)}>1896</Button><br/><br/>
                      <Button onClick={() => nonValide()}>1925</Button><br/><br/>
                      <Button onClick={() => nonValide()}>1948</Button><br/><br/>
                    </Box>                                             
                  </Flex>
                </Flex>
              ) : (
                  <Box boxSize='100%' margin="100">
                      <Text align="center">Merci de vous connecter</Text>
                  </Box>          
              ))}
          </Flex>
        </Box>
   )
}