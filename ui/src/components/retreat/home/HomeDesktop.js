import '@fontsource/sora';
import '@fontsource/inter';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Text,
  HStack,
  Link,
} from '@chakra-ui/react';

import { FaRainbow } from 'react-icons/fa';
import { IoDocumentsOutline } from 'react-icons/io5';
import { RiComputerLine } from 'react-icons/ri';
import { GrCircleInformation } from 'react-icons/gr';
import PraiseWallContainer from './PraiseWallContainer';
import { Schedule } from './Schedule';

const HomeDesktop = (props) => {
  const { sessionText } = props;

  return (
    <Grid minH="50vh" templateColumns={'repeat(12, 1fr)'} gap={4}>
      <GridItem colSpan={7} w="100%" marginTop={35}>
        <Center flexDirection="column">
          <Image
            w="75%"
            src={
              process.env.PUBLIC_URL +
              '/images/retreat/with-everything-text.png'
            }
          />
          <Text
            mt="-1.5rem"
            textAlign="center"
            textStyle="sora"
            color="white"
            fontWeight={700}
            fontSize={['xl', '3xl']}
            w="50%"
            lineHeight="2.2rem"
            mb="9"
          >
            CHURCH-WIDE CONFERENCE 2022
          </Text>
          <Grid
            w="100%"
            templateColumns="repeat(2, 1fr)"
            gap={4}
            textStyle="sora"
            color="white"
            fontWeight="700"
            fontSize="xl"
            mb="4"
          >
            <Link
              href="/with-everything/about"
              p="1.75rem 0"
              bg="#EE794E"
              borderRadius="xl"
              boxShadow="xl"
              _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
            >
              <Center>
                <HStack>
                  <FaRainbow mt="0.5rem" />
                  <Text>About CWC</Text>
                </HStack>
              </Center>
            </Link>
            <Link
              href="/with-everything/resources"
              p="1.75rem 0"
              bg="#FFC632"
              borderRadius="xl"
              boxShadow="xl"
              _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
            >
              <Center>
                <HStack>
                  <IoDocumentsOutline />
                  <Text>Resources</Text>
                </HStack>
              </Center>
            </Link>
          </Grid>
          <Link
            bg="#0FB4BE"
            textStyle="sora"
            color="white"
            fontWeight="700"
            fontSize="xl"
            p="1.75rem 0"
            borderRadius="xl"
            w="100%"
            href="/with-everything/stream"
            mb="4"
            boxShadow="xl"
            _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
          >
            <Center>
              <HStack>
                <RiComputerLine />
                <Text>Session Stream</Text>
              </HStack>
            </Center>
          </Link>
          <Box
            w="100%"
            bg={ sessionText.startsWith('Session') ? "#F2BBA8" : "#A9E0E3"}
            textStyle="inter"
            fontWeight="700"
            p="0.8rem 1rem"
            borderRadius="xl"
            boxShadow="xl"
          >
            <HStack>
              <GrCircleInformation />
              <Text>{sessionText}</Text>
            </HStack>
          </Box>
        </Center>
      </GridItem>
      <GridItem colSpan={5} marginTop={30}>
        <Schedule maxH={700} minW='100%' />
      </GridItem>
      <GridItem colSpan={12} minH="40vh">
        <PraiseWallContainer />
      </GridItem>
    </Grid>
  );
};

export default HomeDesktop;
