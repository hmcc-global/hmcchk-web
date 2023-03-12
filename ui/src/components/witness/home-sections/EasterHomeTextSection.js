import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Text,
  Flex,
  Button,
  Link,
  Image,
} from '@chakra-ui/react';
import TextCard from '../text-prayer/TextCard';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { customAxios as axios } from '../../helpers/customAxios';
import SubmitPrayerButton from '../text-prayer/SubmitPrayerButton';
import { DateTime } from 'luxon';

const endDate = DateTime.fromISO('2023-02-22T00:00');
const evanglizeDate = DateTime.fromISO('2023-03-05T00:00');
const serveDate = DateTime.fromISO('2023-03-12T00:00');
const understandDate = DateTime.fromISO('2023-03-19T00:00');
const sendDate = DateTime.fromISO('2023-03-26T00:00');
const passionDate = DateTime.fromISO('2023-04-02T00:00');

const timeLeft = (eventTime) => {
  let display = eventTime.diffNow(['hours', 'minutes']);
  if (display < 0) return true;
  else return false;
};

export const getTopic = () => {
  if (timeLeft(passionDate)) return 'PASSION WEEK';
  else if (timeLeft(sendDate)) return 'SEND PEOPLE OUT';
  else if (timeLeft(understandDate)) return 'UNDERSTAND THE GOSPEL';
  else if (timeLeft(serveDate)) return 'SERVE OUR CITY AND CAMPUS';
  else if (timeLeft(evanglizeDate)) return 'EVANGELIZE THE CIRCLE';
  else return 'JOY IN THE JOURNEY';
};

const EasterHomeTextSection = () => {
  const [texts, setTexts] = useState([]);
  const [eventDisplay, setEventDisplay] = useState(false);
  const [prayerWallDisplay, setPrayerWallDisplay] =
    useState('JOY IN THE JOURNEY');

  useEffect(() => {
    getTexts();
  }, []);

  const getTexts = async () => {
    try {
      const { data, status } = await axios.get('/api/easter/get-published');
      if (status === 200) {
        data.forEach((wv) => {
          wv.renderDate = wv.endDate;
        });
        data.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
        setTexts([...data]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setPrayerWallDisplay(getTopic());
  }, []);

  useEffect(() => {
    if (eventDisplay === false) {
      const timer = setInterval(() => {
        let display = timeLeft(endDate);
        setEventDisplay(display);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  return (
    <Box w="100%">
      {eventDisplay ? (
        <>
          <Container maxW="100%" centerContent>
            <Text
              fontFamily="concrete_demo"
              textColor="#E60053"
              fontWeight="1000"
              lineHeight="110%"
              fontSize={['2.1em', '3em']}
              marginBottom="15px"
              textAlign="center"
            >
              J-E-S-U-S PRAYER CAMPAIGN
            </Text>
            <Text
              w={['80%', '60%']}
              textStyle={'dm_sans'}
              textColor="#000000"
              fontWeight="800"
              fontSize={['14px', '18px']}
              marginBottom="15px"
              textAlign="center"
            >
              As we enter Lent, we want to witness God work through our prayers!
              That’s why throughout Lent, we’ll be re-focusing on JESUS through
              the JESUS Prayer Campaign as we prepare our hearts for Easter.
            </Text>
            <Text
              w={['80%', '60%']}
              textStyle={'dm_sans'}
              fontWeight="800"
              textColor="#000000"
              fontSize={['14px', '18px']}
              marginBottom="15px"
              textAlign="center"
            >
              Please feel free to lift up a prayer for whatever God is putting
              on your heart.
            </Text>
            <Text
              w={['80%', '60%']}
              textStyle={'dm_sans'}
              fontWeight="500"
              textColor="#000000"
              fontSize={['14px', '18px']}
              marginBottom="15px"
              marginTop="15px"
              textAlign="center"
            >
              This week we will be praying for:
            </Text>
            <Text
              textStyle={'dm_sans'}
              textColor="#E60053"
              fontWeight="700"
              fontSize={['20px', '27px']}
              marginBottom="15px"
            >
              {prayerWallDisplay}
            </Text>
            <Image
              w={{ base: '40px', md: '40px' }}
              src={process.env.PUBLIC_URL + '/images/witness/triangleicon.svg'}
            />
            <Flex justifyContent="center">
              <Box w={['90%', '100%']}>
                <SubmitPrayerButton />
              </Box>
            </Flex>
          </Container>
          <Grid
            mr={['3', '5']}
            ml={['3', '5']}
            mt={['6', '12']}
            mb={['6', '12']}
            templateColumns="repeat(3, minmax(0, 1fr))"
            gap={[3, 6]}
            display={{ base: 'none', md: 'grid' }}
          >
            {texts.length > 0 &&
              texts
                .slice(0, 6)
                .map((text) => <TextCard key={text.id} textData={text} />)}
          </Grid>
          <Grid
            mr={['3', '5']}
            ml={['3', '5']}
            mt={['6', '12']}
            mb={['6', '12']}
            templateColumns="repeat(2, 1fr)"
            gap={[3, 6]}
            display={{ base: 'grid', md: 'none' }}
          >
            {texts.length > 0 &&
              texts
                .slice(0, 4)
                .map((text) => <TextCard key={text.id} textData={text} />)}
          </Grid>
          <Button
            textStyle="dm_sans"
            as={Link}
            rightIcon={<ChevronRightIcon />}
            href="/witness/prayers/text"
            borderWidth="3px"
            borderColor="#E60053"
            borderRadius={15}
            color="#E60053"
            fontSize={20}
            mr={4}
            mx="auto"
            w="28%"
            size="lg"
            variant="outline"
            display={{ base: 'none', md: 'flex' }}
          >
            SEE ALL PRAYERS
          </Button>
          <Box display="flex" justifyContent="center">
            <Button
              textStyle="dm_sans"
              as={Link}
              rightIcon={<ChevronRightIcon />}
              href="/witness/prayers/text"
              border="2px"
              borderColor="#E60053"
              borderRadius={13}
              color="#E60053"
              fontSize={15}
              paddingX={8}
              size="md"
              variant="outline"
              display={{ base: 'flex', md: 'none' }}
            >
              SEE ALL PRAYERS
            </Button>
          </Box>
        </>
      ) : (
        <Container maxW="100%" centerContent>
          <Text
            fontFamily={'concrete_demo'}
            textColor="#E60053"
            fontWeight="1000"
            lineHeight="110%"
            fontSize={['2.1em', '3em']}
            marginBottom="15px"
          >
            J-E-S-U-S PRAYER CAMPAIGN
          </Text>
          <Text
            w={['80%', '60%']}
            textStyle={'dm_sans'}
            textColor="#000000"
            fontWeight="800"
            fontSize={['14px', '18px']}
            marginBottom="15px"
            textAlign="center"
          >
            As we enter Lent, we want to witness God work through our prayers!
            That’s why throughout Lent, we’ll be re-focusing on JESUS through
            the JESUS Prayer Campaign as we prepare our hearts for Easter.
          </Text>
          <Text
            w={['80%', '60%']}
            textStyle={'dm_sans'}
            fontWeight="500"
            textColor="#000000"
            fontSize={['14px', '18px']}
            marginBottom="15px"
            textAlign="center"
          >
            Throughout Lent, we will be praying through the following topics
            (J-E-S-U-S):
          </Text>
          <Text
            textStyle={'dm_sans'}
            textColor="#E60053"
            fontWeight="700"
            fontSize={['12px', '20px']}
            marginBottom="10"
            textAlign="center"
          >
            JOY IN THE JOURNEY <br />
            EVANGELIZE THE CIRCLE <br />
            SERVE OUR CITY AND CAMPUS <br />
            UNDERSTAND THE GOSPEL <br />
            SEND PEOPLE OUT <br />
            PASSION WEEK <br />
          </Text>
          <Box
            mx="auto"
            alignContent="center"
            w={['80%', '60%']}
            marginTop="9"
            py={'5'}
            textStyle={'dm_sans'}
            fontWeight="700"
            textColor="#000000"
            fontSize={['14px', '18px']}
            marginBottom="15px"
            textAlign="center"
            bgColor="#EACFC4"
          >
            The Prayer Wall will be launched on February 22 (when Lent begins)!{' '}
            <br />
            Come back and check it out :)
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default EasterHomeTextSection;
