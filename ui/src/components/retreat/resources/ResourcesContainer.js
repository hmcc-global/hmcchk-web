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
  Button,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { IoDocumentsOutline } from 'react-icons/io5';

const ResourcesHeader = ({ color, title }) => {
  return (
    <Box bg={color} borderRadius="20px" width={'full'} p={[4]}>
      <Text
        textStyle="sora_bolder"
        fontSize={['md', 'lg', 'xl']}
        textAlign="center"
        color="white"
      >
        {title}
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
            <Link href={item.url} isExternal>
              <Text textStyle="inter_bold" fontSize={['sm', 'md']}>
                {item.title}
              </Text>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const ResourcesContainer = () => {
  const Notes = [
    {
      title: 'Fivefold Ministry Workshop Test',
      url: 'https://hongkong.sub.hmcc.net/wp-content/uploads/cwc-workshop-questions-paste.pdf',
    },
    {
      title: 'Post-Conference Reflection Guide',
      url: 'https://hongkong.sub.hmcc.net/wp-content/uploads/cwc-post-reflection-questions.pdf',
    },
  ];

  const RelevantLinks = [
    {
      title: 'PASTE Workshop: Prophetic Gifting',
      url: 'https://bit.ly/PropheticGifting',
    },
    {
      title: 'PASTE Workshop: Apostle Gifting',
      url: 'https://bit.ly/ApostleGifting',
    },
    {
      title: 'PASTE Workshop: Shepherd Gifting',
      url: 'https://bit.ly/ShepherdGifting',
    },
    {
      title: 'PASTE Workshop: Teaching Gifting',
      url: 'https://bit.ly/TeachingGifting',
    },
    {
      title: 'PASTE Workshop: Evangelistic Gifting',
      url: 'https://bit.ly/EvangelisticGifting',
    },
  ];

  return (
    <>
      <Flex flexWrap="flex" bg="#6DCED3">
        <Container maxW={['container.xl']}>
          <Link href="/with-everything">
            <Button
              variant="link"
              fontSize={['xs', 'md', 'lg']}
              color="black"
              justifyContent="left"
              leftIcon={<ChevronLeftIcon />}
              textStyle="inter"
              marginTop="20px"
            >
              CWC Homepage
            </Button>
          </Link>
          <Stack align="center" spacing={5}>
            <Box
              bg="#A9E0E3"
              borderRadius="20px"
              width={['90%', '90%', '80%', '60%']}
              height={['20%']}
              marginTop="20px"
              p={[7]}
            >
              <HStack justify={'center'}>
                <IoDocumentsOutline size={28} />
                <Text
                  textStyle="sora_bolder"
                  fontSize={['xl', '3xl']}
                  textAlign="center"
                >
                  Resources
                </Text>
              </HStack>
            </Box>
            <Stack
              direction={['column', 'column', 'row']}
              width={['90%', '90%', '80%', '60%']}
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
                <Box
                  width="100%"
                  borderRadius="17px"
                  transform="translateZ(0px)"
                  display="block"
                  overflow="hidden"
                >
                  <iframe
                    src="https://open.spotify.com/embed/playlist/5FPvYiVrOl0acNUEBKkGSe?utm_source=generator"
                    width="100%"
                    height="300"
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
