import { useToast, Center,  Text,  Card, CardBody, CardFooter, Image, Stack, Heading, Divider, ButtonGroup,Button, Spinner  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi'

import { ethers } from 'ethers';

import Contract from '../../backend/artifacts/contracts/JO2024.sol/JO2024.json';
import { formAcadeeAddress, contractAddress } from 'config/constants';
import GetJO2024 from '../utils/getJO2024'

function JO2024Component(props) {
 
  const [json, setJson] = useState(null);
  const provider = useProvider()
  const { data: signer } = useSigner()
  const toast = useToast()

  useEffect(() => {
    async function fetchData() {
      const jsonFetched = await GetJO2024(props.tokenID) ;
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
            <Text>
              (Total minted {props.minted}/{props.supply})
            </Text>
            <Text color='blue.600' fontSize='l'>{props.jo} JO</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'onClick={() => burn(props.tokenID)}>Transforme pour {props.amountBurn}</Button>
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
  
  export default JO2024Component;
  