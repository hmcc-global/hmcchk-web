import React, { useEffect, useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { Container, Heading, Stack, Box } from "@chakra-ui/react";
import PopUpGrid from './PopUpGrid';

export default function AdminPopUpContainer(props) {
  const [popUps, setPopUps] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/popup/get');
      console.log(data);
      if (data)
        setPopUps(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <Container w='100%' maxW='100%'>
      <Heading as="h5" mb={5}>
        Pop Up Manager
      </Heading>
        <Stack direction={['column', 'row']} w='100%'>
          <Box w={['100%', '50%']}>
            <h1>test</h1>
          </Box>
          <Box w={['100%', '50%']}>
            <PopUpGrid popUps={popUps} />
          </Box>
        </Stack>
    </Container>
  );
}

