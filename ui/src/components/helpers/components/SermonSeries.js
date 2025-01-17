import {
  Container,
  Stack,
  AspectRatio,
  Image,
  Box,
  VStack,
  Text,
  HStack,
  Link,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { customAxios as axios } from '../customAxios';

const SermonSeries = () => {
  const [sermon, setSermon] = useState(null);
  const [allSermons, setAllSermons] = useState([]);
  const [sermonSeries, setSermonSeries] = useState([]);
  const history = useHistory();

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        setAllSermons(data);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  }, [history]);

  const getCurrentSermon = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/live-sermon/get-live-sermon');
      setSermon(data); // Set the current sermon directly
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getSermonSeries = useCallback(() => {
    if (!sermon) return; // Ensure sermon is available
    const filteredSeries = allSermons.filter((series) => {
      return (
        series.sermonSeries &&
        sermon[0].sermonSeries &&
        series.sermonSeries[0].name === sermon[0].sermonSeries &&
        series.id !== sermon.id
      );
    });
    setSermonSeries(filteredSeries);
  }, [allSermons, sermon]);

  useEffect(() => {
    (async () => {
      await getData();
      await getCurrentSermon();
    })();
  }, [getData, getCurrentSermon]);

  // Call getSermonSeries when allSermons and sermon are updated
  useEffect(() => {
    getSermonSeries();
  }, [allSermons, sermon, getSermonSeries]);

  return (
    <>
      {sermon &&
        sermonSeries.length > 0 &&
        sermonSeries.map((sermon, i) => (
          <Link
            key={i}
            href={
              sermonSeries.streamLink === ''
                ? `/online`
                : `/sermons/${sermon.id}`
            }
          >
            <Stack direction="row">
              <Box
                overflow="hidden"
                p="3"
                w="93%"
                borderWidth="1px"
                borderRadius="10px"
                mx="auto"
                borderColor="#DFE7FF"
                fontFamily="Manrope"
                my="3"
              >
                <HStack gap="3">
                  <AspectRatio ratio={16 / 9} minW="25%">
                    <Image
                      borderRadius="10"
                      src={sermon.sermonSeries[0].image.sourceUrl}
                      objectFit="cover"
                    />
                  </AspectRatio>
                  <VStack
                    alignItems="left"
                    spacing={{ base: 1, md: 2 }}
                    w="70%"
                  >
                    <Text
                      fontWeight="600"
                      fontSize="0.875rem"
                      isTruncated="false"
                    >
                      {sermon.title}
                    </Text>

                    <VStack
                      spacing={{ base: 1, md: 'auto' }}
                      alignItems="flex-start"
                    >
                      <Text fontSize="0.625rem" isTruncated>
                        Speaker: {sermon.speaker[0].name}
                      </Text>
                      <Text fontSize="0.625rem" isTruncated>
                        Passage: {sermon.passage}
                      </Text>
                    </VStack>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
          </Link>
        ))}
    </>
  );
};

export default SermonSeries;
