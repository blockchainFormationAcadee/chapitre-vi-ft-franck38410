import { useToast, Center,  Text,  Card, CardBody, CardFooter, Image, Stack, Heading, Divider, ButtonGroup,Button, Spinner  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSigner } from 'wagmi'
import { ethers } from 'ethers';
import Contract from '../../backend/artifacts/contracts/JO2024.sol/JO2024.json';
import JsonMetadatas from 'components/JsonMetadatas'
import { contractAddress } from 'config/constants';

function JoComponent(props) {
 
  const [json, setJson] = useState(null);
  const { data: signer } = useSigner()
  const toast = useToast()

  useEffect(() => {
    async function fetchData() {
      const jsonFetched = await JsonMetadatas(props.tokenID) ;
      setJson(jsonFetched) ;
    }
    fetchData();
  }, []);

  const burn = async(type) => {
    try {
      console.log("burn type= "+type);
      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      let transaction = await contract.burn(type);
      transaction.wait();
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien réalisé votre conversion !",
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

  if(json!=null) return (
      <Center mt="0px">
      <Card maxW='md'>
        <CardBody>
          <Image
            src={json.image}
            alt={json.description}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{json.name}</Heading>
            <Text align='center' color='blue.600' fontSize='20'>Tu en possèdes {props.jo}</Text>
            <Text align='center'>(sur un total de {props.minted}/{props.supply})</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            {(props.tokenID < 5 ? (
                <Button variant='solid' colorScheme='blue' onClick={() => burn(props.tokenID)}>Transforme pour {props.amountBurn}</Button>
              ) : (
                <Button variant='solid' colorScheme='blue' onClick={() => alert("Bientôt disponible")}>Voir le billet</Button>
            ))}
          </ButtonGroup>
        </CardFooter>
      </Card>
      </Center>
    );
  else return (
      <Center mt="0px">
        Json Contract not accessible 
      </Center>
      )
  }
  export default JoComponent;
  