import {
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
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    const filteredSeries = allSermons.filter((sermon) => {
      return (
        sermon.sermonSeries &&
        sermon[0].sermonSeries &&
        sermon.sermonSeries[0].name === sermon[0].sermonSeries &&
        sermon.id !== sermon.id
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
                bg={hoveredIndex === i ? '#DFE7FF' : 'transparent'}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
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
                      fontWeight={hoveredIndex === i ? '700' : '400'}
                      fontSize={{ base: '0.688rem', md: '0.875rem' }}
                      isTruncated="false"
                    >
                      {sermon.title}
                    </Text>

                    <VStack
                      spacing={{ base: 1, md: 'auto' }}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="0.625rem"
                        textColor={hoveredIndex === i ? 'black' : '#818181'}
                        isTruncated
                      >
                        Speaker: {sermon.speaker[0].name}
                      </Text>
                      <Text
                        fontSize="0.625rem"
                        textColor={hoveredIndex === i ? 'black' : '#818181'}
                        isTruncated
                      >
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
