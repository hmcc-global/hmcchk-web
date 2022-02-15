import {
  Flex,
  Container,
  Box,
  Text,
  Stack,
  VStack,
  HStack,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import retreatTheme from '../retreatTheme';
import '@fontsource/sora';

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
      <Flex w="full" h="100vh" bg="#6DCED3">
        <Container maxW={['container.lg']} theme={retreatTheme}>
          <Stack align="center" spacing={5}>
            <Box
              bg="#A9E0E3"
              borderRadius="20px"
              marginTop="40px"
              width={['50%']}
              height={['20%']}
              p={[7]}
            >
              <Text textStyle="sora" fontSize={['2xl']} textAlign="center">
                <b>Resources</b>
              </Text>
            </Box>
            <Stack direction={'row'} w="full" width={['50%']}>
              <VStack w="full">
                <Box bg="#EE794E" borderRadius="20px" width="full" p={[4]}>
                  <Text
                    textStyle="sora"
                    fontSize={['xl']}
                    textAlign="center"
                    color="white"
                  >
                    <b>Notes/Questionnaires</b>
                  </Text>
                </Box>
                <Box bg="white" borderRadius="20px" width="full" p={[4]}>
                  <UnorderedList>
                    {Notes.map((item) => (
                      <ListItem>
                        <Link to={item.url}>{item.title}</Link>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
                <Box bg="#FFC632" borderRadius="20px" width="full" p={[4]}>
                  <Text
                    textStyle="sora"
                    fontSize={['xl']}
                    textAlign="center"
                    color="white"
                  >
                    <b>Relevant Links</b>
                  </Text>
                </Box>
                <Box bg="white" borderRadius="20px" width="full" p={[4]}>
                  <UnorderedList>
                    {RelevantLinks.map((item) => (
                      <ListItem>
                        <Link to={item.url}>{item.title}</Link>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              </VStack>
              <VStack w="full">
                <Box bg="#0FB4BE" borderRadius="20px" width="full" p={[4]}>
                  <Text
                    textStyle="sora"
                    fontSize={['xl']}
                    textAlign="center"
                    color="white"
                  >
                    <b>Spotify Playlist</b>
                  </Text>
                </Box>
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
