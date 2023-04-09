import { Flex, Text, Box } from '@chakra-ui/react';
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()
  return (
    <>
      <Flex>
        {(isConnected ? (

          <Box boxSize='100%' margin="100">
            <Text color='blue.600' fontSize='30' align="center">Tu es bien connecté tu peux remplir tes quêtes et gagner des JO !</Text>
          </Box>  
        ) : (
          <Box boxSize='100%' margin="100">
              <Text color='blue.600' fontSize='30' align="center">Plateforme de collection NFTs des Jeux Olympiques Paris 2024.<br/><br/>
                                   Collectionne des JO d'un sport que tu aimes en complétant des quêtes.<br/>
                                   Echange tes JO d'un sport contre un autre sport.<br/>
                                   Transforme tes JO en NFT Unique et gagne des places pour aller voir les JO.<br/><br/>
                                   Merci de vous connecter avec le bouton 'Connexion JO2024'.</Text>
          </Box>          
        ))}
      </Flex>
    </>
  )
}
