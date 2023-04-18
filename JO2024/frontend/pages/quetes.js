import { Heading, Flex, Text, Button, useToast, Box } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import Contract from 'config/JO2024.json';
import { contractAddress } from 'config/constants';

const quetes = () => {
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
        <Heading m={5}>Les quêtes du jour </Heading>
              {(isConnected ? (
                  <Flex width="full" align="left" justifyContent="center">
                    <Box py={10}>
                      <Text color='blue.600' fontSize='24'>Quel est le record du monde 100m ? (Gain 100 JO Athlétisme)</Text>
                      <Button onClick={() => nonValide()}>8s58</Button>
                      <Button m={5} onClick={() => mint(0,100)}>9s58</Button>
                      <Button onClick={() => nonValide()}>10s58</Button>

                      <Text color='blue.600' fontSize='24' pt={8}>Qui a été champion olympique d’aviron dans la catégorie deux de couple à Tokyo ? (Gain 100 JO Aviron)</Text>
                      <Button onClick={() => nonValide()}>Ruta et Oppo</Button>
                      <Button m={5} onClick={() => nonValide()}>Odonovan et Mc Carthy</Button>
                      <Button onClick={() => mint(1,100)}>Androdias et Boucheron</Button><br/>

                      <Text color='blue.600' fontSize='24' pt={8}>En quelle année l'escrime est entrée au JO ? (Gain 900 JO Escrime)</Text>
                      <Button onClick={() => mint(2,900)}>1896</Button>
                      <Button m={5} onClick={() => nonValide()}>1925</Button>
                      <Button onClick={() => nonValide()}>1948</Button>
                    </Box>                                             
                  </Flex>
              ) : (
                  <Box boxSize='100%' margin="100">
                      <Text color='blue.600' fontSize='30' align="center">Merci de vous connecter</Text>
                  </Box>          
              ))}
      </Box>
   );
};
export default quetes;