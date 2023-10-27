import { Flex, Text, Container, Grid, GridItem } from '@chakra-ui/react';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';

const StepText = ({ title, headers, description }) => {
  return (
    <>
      <Text
        fontSize={headerFontSize}
        textStyle="darker_grotesque_black"
        color="#182E57"
        lineHeight="0.9em"
      >
        {title}
      </Text>
      {headers.map((item, i) => (
        <Text
          fontSize={bodyFontSize}
          textStyle="darker_grotesque"
          color="white"
          key={i}
        >
          <b>{headers[i].bold}</b>: {headers[i].normal}
        </Text>
      ))}

      <Text fontSize={bodyFontSize} textStyle="darker_grotesque" color="white">
        {description}
      </Text>
    </>
  );
};

const RippleOutStepsContainer = () => {
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
        <Grid
          mt={9}
          py={3}
          h={['60vh', '60vh', '60vh', '95vh']}
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
          bgColor="
          #34486F"
        >
          <GridItem colStart={4} colSpan={2}>
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
            />
          </GridItem>

          <GridItem rowStart={2} colSpan={2}>
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
          </GridItem>

          <GridItem rowStart={2} colSpan={2}>
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
          </GridItem>

          <GridItem rowStart={2} colSpan={2}>
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
          </GridItem>

          <GridItem rowStart={3} colStart={3} colSpan={3}>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/images/ripple-out/steps/full.svg`}
              usemap="#image-map"
              class="maparea"
            />
            <map name="image-map">
              <area alt="drop" title="drop" coords="365,27,28" shape="circle" />
              <area
                alt="outer_left"
                title="outer_left"
                coords="0,194,9,221,56,249,147,272,248,279,116,244,63,200,95,161,245,124,154,129,111,137,83,144,32,166"
                shape="poly"
              />
              <area
                alt="outer_right"
                title="outer_right"
                coords="477,121,532,125,575,133,613,142,656,152,688,165,716,181,728,201,715,225,689,239,655,251,609,263,550,274,486,277,605,245,671,212,670,178,599,147,544,137"
                shape="poly"
              />
              <area
                alt="middle_left"
                title="middle_left"
                coords="297,141,231,147,189,154,141,175,130,192,145,210,162,217,193,228,222,234,250,239,269,242,198,217,172,193,190,170"
                shape="poly"
              />
              <area
                alt="middle_right"
                title="middle_right"
                coords="542,227,589,209,600,192,581,174,516,152,458,144,422,143,500,155,563,180,559,204,522,223,434,245,501,237"
                shape="poly"
              />
              <area
                alt="inner_left"
                title="inner_left"
                coords="248,197,276,210,316,217,268,201,270,182,305,168,272,171,249,181"
                shape="poly"
              />
              <area
                alt="inner_right"
                title="inner_right"
                coords="412,165,450,170,471,179,485,189,476,203,448,210,422,215,455,200,467,192,455,178"
                shape="poly"
              />
            </map>
          </GridItem>
        </Grid>
      </Flex>
      <RippleOutFaqSection pageTopic="ripple-out-steps" />
    </>
  );
};

export default RippleOutStepsContainer;
