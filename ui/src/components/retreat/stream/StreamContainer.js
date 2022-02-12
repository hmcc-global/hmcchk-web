import {
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Link,
  Text,
  Container,
  Flex
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import OnlinePageButtons from './StreamButtons';
import { customAxios as axios } from '../../helpers/customAxios';
import React, { useState, useEffect, useCallback } from 'react';
import '@fontsource/sora';
import '@fontsource/inter';

const StreamContainer = (props) => {
  const [title, setTitle] = useState("With Everything Congregational Retreat 2022")
  const [url, setUrl] = useState("");

  // TODO-aparedan: test with real data
  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons', {
        params: {
          includeProtected: true,
          includePublic: false
        }
      });
      if (status === 200 && data[0]) {
        setTitle(data[0].title);
        setUrl(data[0].streamLink);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [getData]);

  const OnlineSection = () => {
    return (
      <>
        <OnlinePageButtons />
      </>
    );
  };

  return (
    <Flex
      w="full"
      h="100vh"
      bgImage={process.env.PUBLIC_URL + '/images/retreat/retreat.png'}
      bgSize="cover"
      bgPosition="center center"
      justify="center"
    >
      <Container maxW="container.lg">
        <Box mb="20px" mt="20px">
          <VStack alignItems="left" alignContent="left">
            <Link href="/sermons">
              <Button
                variant="link"
                fontSize="lg"
                color="white"
                justifyContent="left"
                leftIcon={<ChevronLeftIcon />}
                display={{ base: 'none', md: 'flex' }}
                textStyle="inter"
              >
                Retreat Homepage
              </Button>
            </Link>
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
              <iframe
                width="560"
                height="315"
                src={url}
                title="Video player"
                frameBorder="0"
                allow={`accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;`}
                allowFullScreen
              ></iframe>
            </AspectRatio>

            <Text fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }} color="white" textStyle="sora">
              {title}
            </Text>
            <Stack spacing={4}>
              <OnlineSection />
            </Stack>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default StreamContainer;

