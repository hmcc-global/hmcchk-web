import { useCallback, useEffect, useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Link,
  Text,
  Container,
  Image,
} from '@chakra-ui/react';
import OnlinePageButtons from '../../sermons/OnlinePageButtons';
import OnlinePageTabs from '../../sermons/OnlinePageTabs';

const IgniteStreamContainer = (props) => {
  const { history } = props;
  const [onlineSermon, setOnlineSermon] = useState();

  const getOnlineSermon = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons', {
        params: {
          includeProtected: true,
          includePublic: false,
        },
      });
      if (status === 200) {
        const current = data.find(({ nextSermon }) => nextSermon == null);
        if (
          current.streamLink &&
          current.sermonNotes &&
          current.sermonSeries[0]
        ) {
          setOnlineSermon(current);
        } else {
          history.push(`/sermons/`);
        }
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  }, [history]);

  useEffect(() => {
    (async () => {
      await getOnlineSermon();
    })();
  }, [getOnlineSermon]);

  return (
    <Box
      w="100%"
      bgImage={`url(${process.env.PUBLIC_URL + '/images/ignite/bg.png'})`}
      bgPosition="center"
      bgSize="cover"
    >
      {onlineSermon && (
        <Container maxW={{ base: '100%', lg: '85%' }}>
          <VStack pt={3}>
            <Image
              src={`${process.env.PUBLIC_URL + '/images/ignite/title.png'}`}
              mt={4}
              mb={4}
              boxSize="35%"
            />
            <Box
              display="flex"
              flexDirection={{ base: 'column', lg: 'row' }}
              alignItems={{ base: 'center', lg: 'unset' }}
              w="100%"
            >
              <Box mb="20px" w={{ base: '100%', lg: '60%' }}>
                <VStack alignItems="left" alignContent="left">
                  <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                    <iframe
                      width="560"
                      height="315"
                      src={onlineSermon.streamLink}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
                      allowFullScreen
                    ></iframe>
                  </AspectRatio>

                  <Text
                    color="#FFFFFF"
                    textStyle="Rubik_bold"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mb="0.5rem !important"
                  >
                    {onlineSermon.title}
                  </Text>
                  <Stack spacing={8}>
                    <Box bgColor="#00000070" p={5} borderRadius={15}>
                      <Text
                        color="#FFFFFF"
                        fontSize="md"
                        textStyle="Rubik_bold"
                      >
                        Description:
                      </Text>
                      <Text color="#FFFFFF" textStyle="Rubik">
                        {onlineSermon.sermonDesc}
                      </Text>
                    </Box>
                    <OnlinePageButtons isIgnite />
                  </Stack>
                </VStack>
              </Box>
              <Box
                bg="black"
                ml={{ base: '0px', lg: '20px' }}
                mb="20px"
                w={{ base: '100%', lg: '40%' }}
                overflowY="auto"
                position="relative"
                boxShadow="0px 4px 18px rgba(0, 0, 0, 0.25)"
              >
                <OnlinePageTabs isIgnite />
              </Box>
            </Box>
          </VStack>
        </Container>
      )}
    </Box>
  );
};

export default IgniteStreamContainer;
