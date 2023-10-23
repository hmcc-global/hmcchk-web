import {
  Box,
  Container,
  ListItem,
  Text,
  UnorderedList,
  Flex,
} from '@chakra-ui/react';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';

const RippleOutSpaceContainer = () => {
  return (
    <>
      <RippleOutHeroSection />
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#C9DDED"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Text
            fontSize={headerFontSize}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            THE SPACE
          </Text>
          <Text fontSize="3xl" textStyle="darker_grotesque_semibold">
            TRANSFORMATION CENTER, 22/F CROCODILE CENTER, KWUN TONG
          </Text>
          <Text fontSize={bodyFontSize}>
            Features of the Transformation Center:
            <UnorderedList>
              <ListItem>Main sanctuary that sits up to 200 people</ListItem>
              <ListItem>
                Function room for ministry gatherings and training classes
              </ListItem>
              <ListItem>
                Classroom for our Building Blocks children’s ministry and other
                classes
              </ListItem>
              <ListItem>
                Pantry common area for fellowship times and community gatherings
              </ListItem>
              <ListItem>Pastoral staff office</ListItem>
            </UnorderedList>
          </Text>
        </Container>
        <Box
          my={9}
          h={['30vh', '40vh', '60vh', '90vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-photos.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
        />
      </Flex>
      <RippleOutFaqSection />
    </>
  );
};

export default RippleOutSpaceContainer;
