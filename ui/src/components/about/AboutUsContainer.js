import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import BeliefsSection from './BeliefsSection';
import StaffSection from './StaffSection';
import StorySection from './StorySection';
import StrategySection from './StrategySection';
import ValuesSection from './ValuesSection';
import OurHeartMissions from './OurHeartMissions';
import blurbs from './about.json';
import { Fragment, useState, useEffect } from 'react';
import { Select } from '@chakra-ui/select';
import { useLocation } from 'react-router-dom';
import scrollTo from '../helpers/ScrollTo';

const sections = [
  'Our Story',
  'Vision & Mission, Our Values',
  'Our Strategy',
  'Our Staff',
  'Beliefs',
  'Our Heart for Missions',
];

const AboutUsContainer = (props) => {
  const [selected, setSelected] = useState(0);
  const banner = blurbs.banner;

  const handleChange = (e) => setSelected(parseInt(e.target.value));
  const { hash } = useLocation();

  useEffect(() => {
    switch (hash) {
      case '#our-story':
        setSelected(0);
        break;
      case '#vision-mission':
        setSelected(1);
        scrollTo('vision-mission');
        break;
      case '#values':
        setSelected(1);
        scrollTo('our-values');
        break;
      case '#strategy':
        setSelected(2);
        break;
      case '#staff':
        setSelected(3);
        break;
      case '#beliefs':
        setSelected(4);
        break;
      case '#missions':
        setSelected(5);
        break;
      default:
        break;
    }
  }, [hash, setSelected]);

  //To do: implement navbar, menu and footer links to individual sections("our story", "vision mision" etc)

  return (
    <Container maxW="container.lg" py={10}>
      <VStack>
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/about/headerBg.png')`}
          bgPosition="center"
          bgSize="cover"
          px={{ base: 29, sm: 29, md: 15, lg: 29 }}
          py={5}
          mb={[4, 8]}
        >
          <Heading
            as="h2"
            fontSize={['4xl', '6xl']}
            fontWeight={700}
            lineHeight={1}
            color="white"
            textAlign="center"
            mb={12}
          >
            {banner.title}
          </Heading>
          <Text
            color="white"
            fontSize={['sm', 'md']}
            fontWeight={600}
            textAlign="center"
            mb={[0, 10]}
          >
            {banner.blurb}
          </Text>
          <HStack
            justifyContent="space-evenly"
            display={{ base: 'none', sm: 'none', md: 'flex' }}
            px={{ md: '0em', lg: '4em' }}
          >
            {sections &&
              sections.map((e, i) => {
                return (
                  <Fragment key={i}>
                    <Text
                      color="rgba(255, 255, 255, 1)"
                      fontWeight={600}
                      textDecoration="none"
                      borderBottom="rgba(255, 255, 255, 1) 0.1em solid"
                      cursor="pointer"
                      fontSize={{ md: 'small', lg: 'sm' }}
                      onClick={() => setSelected(i)}
                    >
                      {e}
                    </Text>
                    {i < sections.length - 1 ? (
                      <Text
                        mx={[1, 4]}
                        color="rgba(255, 255, 255, 1)"
                        fontSize={['sm', 'xl']}
                        verticalAlign="baseline"
                      >
                        &bull;
                      </Text>
                    ) : null}
                  </Fragment>
                );
              })}
          </HStack>

          <Select
            mt={4}
            variant="outline"
            borderWidth="2px"
            borderRadius="5"
            fontWeight="bold"
            bgColor="white"
            display={{ base: 'block', md: 'none' }}
            value={selected}
            onChange={(e) => handleChange(e)}
          >
            {sections &&
              sections.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    {e}
                  </option>
                );
              })}
          </Select>
        </Box>
        {selected === 0 && (
          <StorySection blurb={blurbs.story} title={sections[selected]} />
        )}
        {selected === 1 && (
          <ValuesSection
            blurb={blurbs.visionMissionValues}
            title={sections[selected]}
          />
        )}
        {selected === 2 && (
          <StrategySection blurb={blurbs.strategy} title={sections[selected]} />
        )}
        {selected === 3 && (
          <StaffSection blurb={blurbs.staff} title={sections[selected]} />
        )}
        {selected === 4 && (
          <BeliefsSection blurb={blurbs.beliefs} title={sections[selected]} />
        )}
        {selected === 5 && (
          <OurHeartMissions
            blurb={blurbs.ourHeartMissions}
            title={sections[selected]}
          />
        )}
      </VStack>
    </Container>
  );
};

export default AboutUsContainer;
