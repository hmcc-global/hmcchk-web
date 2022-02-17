import {
  Flex,
  Text,
  Box,
  HStack,
  VStack,
  Container,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import retreatTheme from '../retreatTheme';
import ThemeSection from './ThemeSection';
import '@fontsource/sora';
import '@fontsource/inter';
import { HashLink } from 'react-router-hash-link';

const NavButton = ({ to, color, name }) => {
  const buttonSize = useBreakpointValue(['xs', 'sm', 'md']);
  return (
    <HashLink smooth to={to}>
      <Button
        borderRadius="20px"
        bg={color}
        color="white"
        justify="center"
        boxShadow="lg"
        textStyle="sora"
        size={buttonSize}
      >
        {name}
      </Button>
    </HashLink>
  );
};

const AboutContainer = () => {
  return (
    <>
      <Flex
        w="full"
        flexWrap="wrap"
        justify="center"
        bgImage="linear-gradient(90deg, #A9E0E3 33%, rgba(0, 0, 0, 0) 33%), linear-gradient(90deg, #FFE9AF 66%, #F2BBA8 66%)"
      >
        <Container
          maxW={['container.lg']}
          justify="center"
          theme={retreatTheme}
        >
          <VStack w="full" justify="center" spacing={8}>
            <Box
              bg="white"
              borderRadius="20px"
              marginTop="20px"
              width={['95%', '70%']}
              height={['20%']}
              p={[5, 7]}
            >
              <Text
                textStyle="sora"
                fontSize={['lg', '2xl', '4xl']}
                textAlign="center"
              >
                <b>ABOUT THE CONFERENCE</b>
              </Text>
              <Text
                textStyle="sora"
                fontSize={['md', 'xl', '3xl']}
                textAlign="center"
              >
                <b> With Everything - Church-wide Conference 2022</b>
              </Text>
            </Box>
            <HStack spacing={[2, 5]}>
              <NavButton
                to="/with-everything/about#theme"
                color="#FFC93E"
                name="Theme"
              />
              <NavButton
                to="/with-everything/about#speaker"
                color="#EE794E"
                name="Speaker Profile"
              />
              <NavButton
                to="/with-everything/about#promo"
                color="#0FB4BE"
                name="Promo Video"
              />
            </HStack>
            <ThemeSection id="theme" />
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default AboutContainer;
