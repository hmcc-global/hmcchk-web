import {
  Flex,
  Text,
  Container,
  Grid,
  GridItem,
  Center,
  Box,
  Image,
} from '@chakra-ui/react';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';
import { useState } from 'react';

const titleFontSize = '3em';
const descriptionFontSize = '1.4em';

const StepText = ({ title, headers, description, hover }) => {
  let titleBgColor = '#2A3A58';
  if (hover) {
    titleBgColor = '#fff';
  } else {
    titleBgColor = '#2A3A58';
  }

  return (
    <>
      <Text
        fontSize={titleFontSize}
        textStyle="darker_grotesque_black"
        bgColor={titleBgColor}
        color="#34486F"
        lineHeight="0.9em"
        pl={4}
      >
        {title}
      </Text>
      {headers.map((item, i) => (
        <Text
          fontSize={descriptionFontSize}
          textStyle="darker_grotesque"
          color="white"
          key={i}
          px={2}
          lineHeight={1.2}
        >
          <b>{headers[i].bold}</b>: {headers[i].normal}
        </Text>
      ))}

      <Text
        fontSize={descriptionFontSize}
        textStyle="darker_grotesque"
        color="white"
        textAlign="justify"
        px={2}
        lineHeight={1}
      >
        {description}
      </Text>
    </>
  );
};

const RippleOutStepsContainer = () => {
  const [dropHover, setDropHover] = useState(false);

  const onHover = (e) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/drop.png`;
    setDropHover(true);
  };

  const onOut = (e) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/drop-blue.png`;
    setDropHover(false);
  };

  return (
    <>
      <RippleOutHeroSection />
      <Flex
        minH="100%"
        flexDir="column"
        background="linear-gradient(180deg, #F0F5FF 10.74%, #E9F6FF 22.35%, #FFFAEC 99.87%)"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
          mb={10}
        >
          <Flex flexDir="column" gap={9}>
            <Flex flexDir="column" gap={3}>
              <Text
                fontSize={headerFontSize}
                textStyle="darker_grotesque_black"
                color="#182E57"
                lineHeight="0.9em"
              >
                THE STEPS
              </Text>
              <Text fontSize={bodyFontSize}>
                As you prayerfully consider giving to the campaign, you are not
                just simply giving a sum to a campaign or facility, but you are
                giving towards a larger vision so that we can accomplish all
                that God has called us and see life transformation through the
                Gospel.
              </Text>
            </Flex>
          </Flex>
        </Container>
        {/* Ripple steps drops hover */}
        <Flex bgColor="#34486F">
          <Grid
            mt={7}
            py={5}
            templateColumns="repeat(7, 1fr)"
            autoFlow="column dense"
          >
            <GridItem colStart={5} colSpan={3}>
              <StepText
                title="THE DROP"
                headers={[
                  {
                    bold: 'Exaltation',
                    normal: 'Inspired people, inspire people',
                  },
                ]}
                description="A space for our corporate church gatherings, e.g. Sunday Celebration 
              and Encounter, where we can encounter and experience God as we exalt and worship Him."
                hover={dropHover}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <Box mt={10}>
                <StepText
                  title="INNER RIPPLE"
                  headers={[
                    {
                      bold: 'Edification',
                      normal: 'Loved people, love people',
                    },
                  ]}
                  description="A space where we can love God and love people as we fellowship and
              live out community in LIFE Groups and other community gatherings."
                />
              </Box>
            </GridItem>
            <GridItem rowStart={4} colStart={5} colSpan={3}>
              <Box mt={5}>
                <StepText
                  title="MIDDLE RIPPLE"
                  headers={[
                    {
                      bold: 'Education',
                      normal: 'Discipled people, disciple people',
                    },
                  ]}
                  description="A space where we can grow in our knowledge of the glory of God and 
              be equipped for discipleship through our Experiencing Classes and other trainings 
              and courses."
                />
              </Box>
            </GridItem>
            <GridItem rowStart={4} colSpan={3}>
              <Box mt={12} mr={10}>
                <StepText
                  title="OUTER RIPPLE"
                  headers={[
                    {
                      bold: 'Extension',
                      normal: 'Served people, serve people',
                    },
                    {
                      bold: 'Evangelism',
                      normal: 'Found people, found people',
                    },
                  ]}
                  description="A space where we can invite our friends, family, and colleagues through 
              our outreaches and serve and reach out to the community and city of Hong Kong through 
              after-school programs and missional initiatives so that they may experience the Gospel."
                />
              </Box>
            </GridItem>
            <GridItem rowStart={2} colStart={4}>
              <Center>
                <Image
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/steps/drop-blue.png`}
                  onMouseOver={onHover}
                  onMouseOut={onOut}
                />
              </Center>
            </GridItem>
            <GridItem colStart={2} colSpan={5}>
              <Center mt={12}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/steps/ripples.svg`}
                  alt=""
                  usemap="#image-map"
                />
              </Center>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
      <RippleOutFaqSection pageTopic="ripple-out-steps" />
    </>
  );
};

export default RippleOutStepsContainer;
