import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Heading,
  Container,
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
    titleStyle: { color: 'green' },
    textStyle: { color: 'black' },
    path: '/connect',
  },
  {
    title: 'Visit us',
    text: 'Every Sunday at 10AM HKT In-person & Online',
    image: 'visit-us-bg.png',
    titleStyle: { color: 'white' },
    textStyle: { color: 'white' },
    path: '/visit-us',
  },
  {
    title: 'About HMCC',
    text: 'Learn more about who we are',
    image: 'about-hmcc-bg.png',
    titleStyle: { color: 'white' },
    textStyle: { color: 'white' },
    path: 'about-us',
  },
];

const HelpCard = (props) => {
  return (
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
      height="auto"
      bgSize="cover"
      padding="6%"
      bgPosition="center center"
      borderRadius="10px"
      alignItems="center"
      justifyContent="center"
      display="flex"
      cursor="pointer"
      style={{ textDecoration: 'none' }}
    >
      <VStack>
        <Heading style={props.titleStyle}>{props.title}</Heading>
        <Text style={props.textStyle}>{props.text}</Text>
      </VStack>
    </Link>
  );
};

const HelloSermonSection = () => {
  const [sermons, setSermons] = useState([]);
  const [currentSermon, setCurrentSermon] = useState();
  const [onlineSermon, setOnlineSermon] = useState(false);
  const currentDate = currentSermon
    ? DateTime.fromISO(currentSermon.datePreached).toFormat('LLLL dd, yyyy')
    : '';
  const getLatestSermon = async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        setSermons([...data]);
        let current = data[1];
        if (
          current.streamLink &&
          current.sermonNotes &&
          current.sermonSeries[0]
        )
          setOnlineSermon(true);
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
      <Flex w="full" h={{ base: '100vh', md: 'auto' }} justify="center">
        <Container
          maxW="container.lg"
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
        >
          <VStack width="50%">
            <Heading style={{ alignSelf: 'flex-start' }}>
              How can we help you?
            </Heading>
            <VStack height="100%" width="100%" rowGap="24px">
              {HelpCardInfo.map((help, i) => {
                return <HelpCard key={i} {...help} />;
              })}
            </VStack>
          </VStack>
          <VStack width="50%" background="#172848">
            <Heading color="white" style={{ alignSelf: 'flex-start' }}>
              Latest Sermon
            </Heading>
            <Image
              src={
                currentSermon
                  ? currentSermon.sermonSeries[0].image.sourceUrl
                  : ''
              }
              objectFit="cover"
              borderRadius="10px"
            />
            <VStack>
              <Heading color="#A5CBFF">
                {currentSermon ? currentSermon.sermonSeries[0].name : ''}
              </Heading>
              <Text color="white">{currentDate}</Text>
            </VStack>
            <Text color="white">
              {currentSermon ? currentSermon.sermonDesc : ''}
            </Text>
            <Button>See All Past Sermons</Button>
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default HelloSermonSection;
