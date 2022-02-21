import {
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Link,
  Text,
  Container,
  Flex,
  Center,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import StreamButtons from './StreamButtons';
import { customAxios as axios } from '../../helpers/customAxios';
import React, { useState, useEffect, useCallback } from 'react';
import '@fontsource/sora';
import '@fontsource/inter';

const StreamContainer = (props) => {
  const [title, setTitle] = useState(
    'With Everything Church Wide Conference 2022'
  );
  const [url, setUrl] = useState('');
  // TODO-aparedan: test with real data
  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons', {
        params: {
          includeProtected: true,
          includePublic: false,
        },
      });
      if (status === 200 && data[0]) {
        setTitle(data[0].title);
        setUrl(data[0].streamLink);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const isZoom = url.includes('zoom');

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [getData]);

  const OnlineSection = () => {
    return (
      <>
        <StreamButtons />
      </>
    );
  };

  return (
    <Flex
      w="full"
      minH="full"
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
                CWC Homepage
              </Button>
            </Link>
            <AspectRatio
              mb="5"
              width="100%"
              ratio={16 / 9}
              background="#333333"
            >
              {isZoom ? (
                <Center>
                  <VStack p={5} spacing={5}>
                    <Text
                      color="white"
                      textStyle="sora"
                      textAlign="center"
                      fontWeight={700}
                    >
                      Our next session is on Zoom, please click the button
                      below!
                    </Text>
                    <Button
                      bg="#6DCED3"
                      color="white"
                      fontSize={['md', 'xl']}
                      as="a"
                      href={url}
                      target="_blank"
                      padding={[4, 8]}
                      borderRadius={17}
                      textStyle="sora"
                      _hover={{ opacity: '0.9', transform: 'scale(1.1)' }}
                    >
                      Zoom Link
                    </Button>
                  </VStack>
                </Center>
              ) : (
                // <iframe
                //   src="https://hkust.zoom.us/j/95848566431?pwd=VVJBUHZ3dzBDOE1sY3VVWkhlazIvQT09"
                //   title="Zoom site"
                //   frameBorder="0"
                // ></iframe>
                <iframe
                  width="560"
                  height="315"
                  src={url}
                  title="Video player"
                  frameBorder="0"
                  allow={`accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;`}
                  allowFullScreen
                ></iframe>
              )}
            </AspectRatio>

            <Text
              fontWeight="bold"
              fontSize={{ base: 'xl', md: '3xl' }}
              color="white"
              textStyle="sora"
            >
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
