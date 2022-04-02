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
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import OnlinePageButtons from '../../sermons/OnlinePageButtons';
import OnlinePageTabs from '../../sermons/OnlinePageTabs';

const GoodFridayStreamContainer = (props) => {
  const { history } = props;
  const [onlineSermon, setOnlineSermon] = useState();

  const getOnlineSermon = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
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
      bgImage={`url(${
          process.env.PUBLIC_URL + "/images/easter/good-friday-streaming.gif"
      })`}
      bgPosition="center"
      bgSize="cover"
    >
      { onlineSermon && (
        <Container maxW={{base: '100%', lg: '85%' }}>
          <VStack pt={3}>
            <Link href="/good-friday" alignSelf="baseline">
              <Button
                variant="link"
                fontSize="lg"
                color="#935963"
                justifyContent="left"
                leftIcon={<ChevronLeftIcon />}
                display={{ base: 'none', md: 'flex' }}
                textStyle="Quicksand_bolder"
              >
                Return to Good Friday Homepage
              </Button>
            </Link>
            <Box display="flex" flexDirection={{base: 'column', lg: 'row'}} alignItems={{base: 'center', lg: 'unset'}} w="100%">
              <Box mb="20px" w={{base: '100%', lg: '60%'}}>
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

                  <Text color="#935963" textStyle="NextSoutherlandSerif" fontSize={{ base: 'xl', md: '2xl' }} mb="0.5rem !important">
                    {onlineSermon.title}
                  </Text>
                  <Stack spacing={8}>
                    <Box bgColor="#F6E5E1" p={5} borderRadius={15}>
                      <Text
                        color="#935963"
                        fontSize="md"
                        textStyle="Quicksand_bolder"
                      >
                        Description:
                      </Text>
                      <Text color="#935963" textStyle="Quicksand">{onlineSermon.sermonDesc}</Text>
                    </Box>
                    <OnlinePageButtons isGoodFri={true}/>
                  </Stack>
                </VStack>
              </Box>
              <Box bg="white" ml={{base: '0px', lg: '20px' }} mb="20px" w={{base: '100%', lg: '40%'}} overflowY="auto" position="relative" borderRadius={10} boxShadow="0px 4px 18px rgba(0, 0, 0, 0.25)">
                <Box position={{base: 'unset', lg: 'absolute '}} top={{base: 'unset', lg: 0 }} left={{base: 'unset', lg: 0 }} w="100%" h="100%">
                  <OnlinePageTabs
                    sermonNotes={onlineSermon.sermonNotes}
                  />
                </Box>
              </Box>
            </Box>
          </VStack>
        </Container>
      )}
    </Box>
  );
};

export default GoodFridayStreamContainer;
