import React, { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  Link,
  Image,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Link as ReactLink } from 'react-router-dom';

const HelpCardInfo = [
  {
    title: "I'm New",
    text: 'Connect with us',
    image: 'im-new-bg.png',
    titleStyle: { color: 'green', fontFamily: 'Inter' },
    textStyle: { color: 'black' },
    path: '/connect',
    id: 'homepage-connect',
  },
  {
    title: 'Visit Us',
    text: 'Every Sunday at 10AM HKT \n In-person & Online',
    image: 'visit-us-bg.png',
    titleStyle: { color: 'white' },
    textStyle: { color: 'white' },
    path: '/visit-us',
    id: 'homepage-visit',
  },
  {
    title: 'About HMCC',
    text: 'Learn more about who we are',
    image: 'about-hmcc-bg.png',
    titleStyle: { color: 'white' },
    textStyle: { color: 'white' },
    path: 'about-us',
    id: 'homepage-about',
  },
];

const HelpCard = (props) => {
  const [mdHeadingSize, setMdHeadingSize] = useState('2.5em');
  const [mdTitleSize, setMdTitleSize] = useState('1.5em');

  return (
    <>
      <Link
        to={{ pathname: props.path }}
        as={ReactLink}
        backgroundImage={
          props.title === "I'm New"
            ? process.env.PUBLIC_URL + '/images/home/' + props.image
            : `linear-gradient(0deg, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.22)), url(${
                process.env.PUBLIC_URL + '/images/home/' + props.image
              })`
        }
        backdropFilter="blur(4px)"
        width="100%"
        height={['auto', '220']}
        bgSize="cover"
        padding="6%"
        bgPosition="center center"
        borderRadius="10px"
        alignItems="center"
        justifyContent="center"
        display="flex"
        cursor="pointer"
        style={{ textDecoration: 'none', zIndex: 1 }}
        overflow="hidden"
        onMouseOver={() => {
          setMdHeadingSize('2.7em');
          setMdTitleSize('1.7em');
        }}
        onMouseOut={() => {
          setMdHeadingSize('4xl');
          setMdTitleSize('1.5rem');
        }}
        id={props.id}
      >
        <VStack>
          <Heading
            style={props.titleStyle}
            fontSize={{ base: '1.8em', md: mdHeadingSize }}
            fontWeight={600}
          >
            {props.title}
          </Heading>
          <Text
            style={props.textStyle}
            fontSize={{ base: '1em', md: mdTitleSize }}
            textAlign="center"
            whiteSpace="pre-wrap"
          >
            {props.text}
          </Text>
        </VStack>
      </Link>
      <Box
        style={{
          background: '#9E9E9E',
          filter: 'blur(20px)',
          height: '5vh',
          width: '80%',
          position: 'relative',
          bottom: '4%',
          zIndex: 0,
          marginTop: '-20px',
        }}
      />
    </>
  );
};

const HelloSermonSection = React.forwardRef((props, ref) => {
  const [currentSermon, setCurrentSermon] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const currentDate = currentSermon
    ? isOnline
      ? DateTime.fromISO(currentSermon.sermonDateTime).toFormat(
          'dd MMM yyyy, hh:mm a'
        )
      : DateTime.fromISO(currentSermon.datePreached).toFormat(
          'EEEE, dd LLLL yyyy'
        )
    : '';
  const getLatestSermon = async () => {
    try {
      const res = await axios.get('/api/live-sermon/get-live-sermon');

      if (res.status === 200 && res.data && res.data.length !== 0) {
        setIsOnline(true);
        setCurrentSermon(res.data[0]);
        return;
      }

      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        let current = data[0];
        setCurrentSermon(current);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLatestSermon();
  }, []);
  return (
    <>
      <Flex
        w="full"
        h="auto"
        justify="center"
        background={{
          base: '',
          md: ' linear-gradient(270deg, #172848 0%, #172848 50%, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%)',
        }}
        id="hello"
      >
        <Box
          justifyContent="space-between"
          width="100%"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box
            ref={ref}
            width={{ base: '100%', md: '50%' }}
            h="auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="rgba(164,164,164,0.5)"
            blur="20px"
          >
            <VStack width="80%" py={{ base: '3rem', md: '5rem' }} gap={4}>
              <Heading
                alignSelf="flex-start"
                color="#0628A3"
                fontSize={{ base: '1.875em', md: '4xl' }}
                fontWeight={['bold', '600']}
                fontFamily="Inter"
              >
                How can we help you?
              </Heading>
              <VStack height="100%" width="100%">
                {HelpCardInfo.map((help, i) => {
                  return (
                    <React.Fragment key={i}>
                      <HelpCard {...help} />
                    </React.Fragment>
                  );
                })}
              </VStack>
            </VStack>
          </Box>
          <Box
            width={{ base: '100%', md: '50%' }}
            h="auto"
            background={{ base: '#172848', md: '' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <VStack width="80%" py={{ base: '3rem', md: '5rem' }} gap={4}>
              <Heading
                color="white"
                alignSelf="flex-start"
                fontWeight={600}
                fontSize={['1.875em', '4xl']}
              >
                Latest Sermon
              </Heading>
              <Box>
                <Image
                  src={
                    currentSermon
                      ? isOnline
                        ? currentSermon.sermonSeriesUrl
                        : currentSermon.sermonSeries[0].image?.sourceUrl
                      : ''
                  }
                  objectFit="cover"
                  borderRadius="10px"
                />
              </Box>
              <VStack alignSelf="flex-start">
                <Heading
                  width="100%"
                  color="#A5CBFF"
                  display="flex"
                  justifyContent="flex-start"
                  fontSize={{ base: '2xl', md: '4xl' }}
                  fontWeight={600}
                >
                  {currentSermon
                    ? isOnline
                      ? '[LIVE NOW] ' + currentSermon.title
                      : '' + currentSermon.sermonSeries[0].name
                    : ''}
                </Heading>
                <Text
                  alignSelf="flex-start"
                  marginTop="0px"
                  color="white"
                  fontSize={{ base: '14px', md: '16px' }}
                >
                  {currentDate}
                </Text>
              </VStack>

              <Button
                alignSelf="flex-start"
                padding="15px 20px"
                gap="10px"
                border="2px solid #A5CBFF"
                borderRadius="7px"
                background="transparent"
                color="#A5CBFF"
                marginTop="7%"
                as={ReactLink}
                to={{ pathname: '/sermons' }}
                fontFamily="Inter"
                fontWeight="semibold"
                fontSize="1.2em"
                _hover={{
                  bg: '#A5CBFF',
                  color: '#172848',
                }}
                id={`homepage-sermons-${isOnline ? 'online' : 'list'}`}
              >
                {isOnline ? 'Watch HMCC LIVE' : 'See All Past Sermons'}
              </Button>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
});

export default HelloSermonSection;
