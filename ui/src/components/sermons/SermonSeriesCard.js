import {
  AspectRatio,
  Box,
  Image,
  Text,
  VStack,
  Stack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import SermonSeries from './SermonSeries';

const SermonSeriesCard = ({
  sermonSeries,
  allSermons,
  isSermonsPage = false,
}) => {
  const [sermonImage, setSermonImage] = useState(
    process.env.PUBLIC_URL + '/images/sermons/placeholder.svg'
  );
  const [sermonSeriesYear, setSermonSeriesYear] = useState('');
  const [sermonSpeaker, setSermonSpeaker] = useState('');
  const [sermonCount, setSermonCount] = useState(0);
  const [sermonSeriesTitle, setSermonSeriesTitle] = useState('');
  const [sermonSeriesDescription, setSermonSeriesDescription] = useState('');

  useEffect(() => {
    if (sermonSeries && allSermons && allSermons.length > 0) {
      const sermonList = allSermons.filter((sermon) =>
        sermon.sermonSeries[0].name.includes(sermonSeries)
      );

      if (sermonList && sermonList.length > 0) {
        const sermonData = sermonList[0];
        if (
          sermonData.sermonSeries &&
          sermonData.sermonSeries[0].image !== null
        )
          setSermonImage(sermonData.sermonSeries[0].image.sourceUrl);
        if (sermonData.datePreached) {
          setSermonSeriesYear(
            DateTime.fromISO(sermonData.datePreached).toFormat('yyyy')
          );
        }
        if (sermonData.speaker[0].name) {
          setSermonSpeaker(sermonData.speaker[0].name);
        }
        setSermonCount(sermonList.length);

        if (sermonData.title.includes('Part')) {
          setSermonSeriesTitle(sermonSeries + ' Sermon Series');
        } else {
          setSermonSeriesTitle(sermonSeries);
        }

        setSermonSeriesDescription(sermonData.sermonDesc);
      }
    }
  }, [sermonSeries, allSermons]);

  const sermonSeriesCardStyle = {
    overflow: 'hidden',
    align: 'stretch',
    maxW: '100%',
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Box
        style={sermonSeriesCardStyle}
        // to={{
        //   pathname: `/sermons/${firstSermon.id}`,
        //   state: { sermonData: firstSermon, allSermons: allSermons },
        // }}
        onClick={onOpen}
        cursor="pointer"
      >
        <Stack direction={['row', 'column']} columnGap={'0.5rem'}>
          <AspectRatio minW={{ base: '36%', md: '18%' }} ratio={16 / 9}>
            <>
              <Image borderRadius="15px" src={sermonImage} objectFit="cover" />
            </>
          </AspectRatio>
          <Box
            overflow="hidden"
            position="relative"
            paddingBottom={[2, 4]}
            paddingTop={'0.25rem'}
          >
            <VStack
              alignItems={isSermonsPage ? 'center' : 'left'}
              spacing={'1rem'}
              fontFamily="Manrope"
            >
              <Stack
                direction={'column'}
                alignItems={isSermonsPage ? 'center' : 'left'}
                spacing="auto"
              >
                <Text
                  fontSize={
                    isSermonsPage
                      ? { base: '1rem', md: '1.125rem' }
                      : { base: '0.75rem', md: '0.875rem' }
                  }
                  fontWeight={700}
                >
                  {sermonSeriesTitle}
                </Text>
                <HStack spacing={'0.5rem'}>
                  <Text
                    fontSize={
                      isSermonsPage
                        ? { base: '0.875rem', md: '1rem' }
                        : { base: '0.75rem', md: '0.875rem' }
                    }
                    isTruncated
                  >
                    {sermonSeriesYear}
                  </Text>
                  <Text>|</Text>
                  <Text
                    fontSize={
                      isSermonsPage
                        ? { base: '0.875rem', md: '1rem' }
                        : { base: '0.75rem', md: '0.875rem' }
                    }
                    isTruncated
                  >
                    {sermonCount + ' Sermons'}
                  </Text>
                </HStack>
              </Stack>
              <Text
                fontSize={
                  isSermonsPage
                    ? { base: '0.875rem', md: '1rem' }
                    : { base: '0.75rem', md: '0.875rem' }
                }
                display={isSermonsPage ? 'none' : 'block'}
                isTruncated
              >
                {sermonSpeaker}
              </Text>
            </VStack>
          </Box>
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <ModalCloseButton />
          <ModalHeader>
            <Text
              fontFamily={'DMSerifDisplay_Italic'}
              fontWeight={400}
              fontSize={{ base: '2rem', md: '2.625rem' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              {sermonSeriesTitle}
            </Text>
          </ModalHeader>

          <ModalBody>
            <Box
              display={'flex'}
              flexDir={{ base: 'column', lg: 'row' }}
              alignItems={{ base: 'center', lg: 'flex-start' }}
              justifyContent={{ base: 'flex-start', lg: 'space-between' }}
              w="100%"
              gap={'1.5rem'}
            >
              <VStack spacing={'0.5rem'} alignItems="left" mb={'1rem'} w="45%">
                <AspectRatio minW={{ base: '80%', lg: '100%' }} ratio={16 / 9}>
                  <>
                    <Image
                      borderRadius="15px"
                      src={sermonImage}
                      objectFit="cover"
                    />
                  </>
                </AspectRatio>
                <VStack spacing={'0.5rem'} alignItems="left" mb={'1rem'}>
                  <Text
                    fontFamily={'DMSerifDisplay_Italic'}
                    fontWeight={400}
                    fontSize={{ base: '1.5rem', md: '1.75rem' }}
                  >
                    Description
                  </Text>
                  <Text
                    fontFamily={'Manrope'}
                    fontWeight={400}
                    fontSize={{ base: '0.875rem', md: '1rem' }}
                  >
                    {sermonSeriesDescription}
                  </Text>
                </VStack>
              </VStack>
              <VStack spacing={'0.5rem'} alignItems="left" mb={'1rem'} flex={1}>
                <Text
                  fontFamily={'DMSerifDisplay_Italic'}
                  fontWeight={400}
                  fontSize={{ base: '1.5rem', md: '1.75rem' }}
                >
                  Choose Sermon
                </Text>
                <SermonSeries sermonSeriesName={sermonSeries} />
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SermonSeriesCard;
