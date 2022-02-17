import {
  Flex,
  Container,
  Box,
  Text,
  Stack,
  VStack,
  UnorderedList,
  ListItem,
  Link,
  HStack,
} from '@chakra-ui/react';
import retreatTheme from '../retreatTheme';
import '@fontsource/sora';
import { IoDocumentsOutline } from 'react-icons/io5';

const ResourcesHeader = ({ color, title }) => {
  return (
    <Box bg={color} borderRadius="20px" width={'full'} p={[4]}>
      <Text
        textStyle="sora"
        fontSize={['md', 'lg', 'xl']}
        textAlign="center"
        color="white"
      >
        <b>{title}</b>
      </Text>
    </Box>
  );
};

const ResourcesList = ({ list }) => {
  return (
    <Box bg="white" borderRadius="20px" width="full" p={[4]}>
      <UnorderedList>
        {list.map((item) => (
          <ListItem>
            <Link to={item.url}>{item.title}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const ResourcesContainer = () => {
  const Notes = [
    { title: 'Pre-Conference Prompt', url: 'https://www.google.com' },
    { title: 'APEPT Test', url: 'www.medium.com' },
    { title: 'APEPT Reflection Question', url: '' },
    { title: 'Post-Conference Pronpt', url: '' },
    { title: 'etc.', url: '' },
    { title: 'more links', url: '' },
  ];

  const RelevantLinks = [
    {
      title: '101 ways to not fall asleep in a virtual conference',
      url: 'https://www.google.com',
    },
    {
      title: 'Easy coffee recipes to do with your group',
      url: 'www.medium.com',
    },
    { title: 'etc.', url: '' },
  ];

  return (
    <>
      <Flex flexWrap="flex" bg="#6DCED3">
        <Container maxW={['container.lg']} theme={retreatTheme}>
          <Stack align="center" spacing={5}>
            <Box
              bg="#A9E0E3"
              borderRadius="20px"
              marginTop="40px"
              width={['80%', '80%', '80%', '60%']}
              height={['20%']}
              p={[7]}
            >
              <HStack justify={'center'}>
                <IoDocumentsOutline />
                <Text
                  textStyle="sora"
                  fontSize={['lg', 'xl', '2xl']}
                  textAlign="center"
                >
                  <b>Resources</b>
                </Text>
              </HStack>
            </Box>
            <Stack
              direction={['column', 'column', 'row']}
              width={['80%', '80%', '80%', '60%']}
              pb={[6]}
            >
              <VStack w="full">
                <ResourcesHeader color="#EE794E" title="Notes/Questionnaires" />
                <ResourcesList list={Notes} />
                <ResourcesHeader color="#FFC632" title="Relevant Links" />
                <ResourcesList list={RelevantLinks} />
              </VStack>
              <VStack w="full">
                <ResourcesHeader color="#0FB4BE" title="Spotify Playlist" />
                <Box>
                  <iframe
                    // style="border-radius:20px"
                    src="https://open.spotify.com/embed/playlist/5FPvYiVrOl0acNUEBKkGSe?utm_source=generator"
                    width="100%"
                    height="400"
                    frameBorder="10"
                    allowfullscreen=""
                    allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  ></iframe>
                </Box>
              </VStack>
            </Stack>
          </Stack>
        </Container>
      </Flex>
    </>
  );
};

export default ResourcesContainer;
