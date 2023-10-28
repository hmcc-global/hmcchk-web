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
import { useState, useRef } from 'react';

const titleFontSize = ['1.3em', '3em'];
const subtitleFontSize = ['1em', '1.4em'];
const descriptionFontSize = ['0.8em', '1.4em'];

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
          fontSize={subtitleFontSize}
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
  const [outerHover, setOuterHover] = useState(false);
  const [middleHover, setMiddleHover] = useState(false);
  const [innerHover, setInnerHover] = useState(false);

  const ripplesImage = useRef(null);

  const onDropHover = (e) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/drop.png`;
    setDropHover(true);
  };

  const onDropOut = (e) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/drop-blue.png`;
    setDropHover(false);
  };

  const onOuterHover = (e) => {
    ripplesImage.current.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/ripple-outer-white.png`;
    setOuterHover(true);
  };

  const onMiddleHover = (e) => {
    ripplesImage.current.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/ripple-middle-white.png`;

    setMiddleHover(true);
  };

  const onInnerHover = (e) => {
    ripplesImage.current.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/ripple-inner-white.png`;
    setInnerHover(true);
  };

  const onRippleOut = (e) => {
    ripplesImage.current.src = `${process.env.PUBLIC_URL}/images/ripple-out/steps/ripples.svg`;
    setOuterHover(false);
    setMiddleHover(false);
    setInnerHover(false);
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
        {/* Ripple steps on hover - desktop version */}
        <Flex bgColor="#34486F" display={['none', 'block']}>
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
                  hover={innerHover}
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
                  hover={middleHover}
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
                  hover={outerHover}
                />
              </Box>
            </GridItem>
            <GridItem rowStart={2} colStart={4}>
              <Center>
                <Image
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/steps/drop-blue.png`}
                  onMouseOver={onDropHover}
                  onMouseOut={onDropOut}
                />
              </Center>
            </GridItem>
            <GridItem colStart={2} colSpan={5}>
              <Center mt={12}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/steps/ripples.svg`}
                  alt="ripples"
                  id="ripplesImage"
                  usemap="#image-map"
                  onMouseOut={onRippleOut}
                  ref={ripplesImage}
                />
                <map name="image-map">
                  <area
                    onMouseOver={onOuterHover}
                    onMouseOut={onRippleOut}
                    alt="outer_left"
                    title="outer_left"
                    coords="152,8,82,22,13,51,-1,83,22,109,63,131,132,150,162,154,244,157,135,126,76,98,70,64,107,36,201,12,271,1,182,6"
                    shape="poly"
                  />
                  <area
                    onMouseOver={onOuterHover}
                    onMouseOut={onRippleOut}
                    alt="outer_right"
                    title="outer_right"
                    coords="473,-1,562,10,616,18,656,30,691,42,723,59,729,86,708,113,677,123,652,132,590,151,555,155,473,157,594,127,660,101,672,70,634,38"
                    shape="poly"
                  />
                  <area
                    onMouseOver={onMiddleHover}
                    onMouseOut={onRippleOut}
                    alt="middle_left"
                    title="middle_left"
                    coords="305,21,224,26,184,36,135,55,131,78,149,92,179,105,225,114,253,118,267,119,312,123,205,101,172,75,185,52"
                    shape="poly"
                  />
                  <area
                    onMouseOver={onMiddleHover}
                    onMouseOut={onRippleOut}
                    alt="middle_right"
                    title="middle_right"
                    coords="415,22,487,25,552,38,583,51,604,73,587,94,559,101,531,107,490,114,416,123,545,93,563,67,537,45"
                    shape="poly"
                  />
                  <area
                    onMouseOver={onInnerHover}
                    onMouseOut={onRippleOut}
                    alt="inner_left"
                    title="inner_left"
                    coords="339,44,287,46,248,62,244,75,274,88,294,92,341,97,270,75,275,56"
                    shape="poly"
                  />
                  <area
                    onMouseOver={onInnerHover}
                    onMouseOut={onRippleOut}
                    alt="inner_right"
                    title="inner_right"
                    coords="387,45,428,47,457,51,481,65,478,77,451,87,431,91,412,92,389,97,462,76,460,61"
                    shape="poly"
                  />
                </map>
              </Center>
            </GridItem>
          </Grid>
        </Flex>
        {/* Ripple steps no effect - mobile version */}
        <Flex bgColor="#34486F" display={['block', 'none']}>
          <Grid
            mt={4}
            py={3}
            templateColumns="repeat(5, 1fr)"
            autoFlow="column dense"
          >
            <GridItem colStart={3} colSpan={3}>
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
                hover="true"
              />
            </GridItem>
            <GridItem rowStart={2} colSpan={3}>
              <Box mt={3}>
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
                  hover="true"
                />
              </Box>
            </GridItem>
            <GridItem rowStart={4} colStart={3} colSpan={3}>
              <Box mt={4}>
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
                  hover="true"
                />
              </Box>
            </GridItem>
            <GridItem rowStart={5} colSpan={3}>
              <Box mt={3}>
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
                  hover="true"
                />
              </Box>
            </GridItem>
            <GridItem rowStart={3} colSpan={5}>
              <Center>
                <Image
                  mt={3}
                  px={12}
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/steps/full-white.svg`}
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
