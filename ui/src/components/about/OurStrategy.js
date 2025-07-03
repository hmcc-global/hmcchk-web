import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaUsers, FaRunning, FaSeedling, FaHandHoldingSeedling } from 'react-icons/fa';

const strategyData = [
  {
    icon: FaUsers,
    title: 'GATHER',
    subtitle: 'Corporate Gatherings & Community Gatherings',
    description: `We gather to foster a greater sense of unity and to continue to build up the church body:`,
    bullets: [
      'Corporate Gatherings are what we do together as the local body of Christ, such as Sunday Celebration, retreats, and baptism services.',
      'Community Gatherings are what we do in biblical community, specifically LIFE Group.',
    ],
  },
  {
    icon: FaSeedling,
    title: 'GROW',
    subtitle: 'Life-on-Life & Equipping',
    description: `We believe it is crucial that we do not grow stagnant in our faith, but that we are continually learning and being challenged:`,
    bullets: [
      'Life-on-Life involves intentional relationships like Life Change Groups (LCG) and discipleship, which allows us to sharpen each other as Christ-followers.',
      'Equipping entails purposeful investment in people to live a transformed life through opportunities such as Experiencing Classes, Freedom Class, ministry team service, and learning to study the Bible and pray.',
    ],
  },
  {
    icon: FaRunning,
    title: 'GO',
    subtitle: 'Personal Mission & Team-Based Mission',
    description: `We have been called to go out and make disciples, by sharing the Good News and testifying of the work God has done in our lives:`,
    bullets: [
      'Personal Mission happens when an individual lives as the salt and light in our world, shares his/her faith with others and invites people into our community.',
      "Team-Based Mission happens when we partner together for God's kingdom purposes through opportunities like missional initiatives, missions teams, and church plant teams.",
    ],
  },
];

const OurStrategy = () => {
  return (
    <Box
      bg="#f7f8fa"
      minH="100vh"
      py={{ base: 8, md: 16 }}
      px={{ base: 4, md: 0 }}
    >
      <VStack
        spacing={{ base: 6, md: 8 }}
        align="stretch"
        maxW={{ base: '100%', md: '800px' }}
        mx="auto"
      >
        <Box>
          <Box
            display="inline-block"
            bg="white"
            borderRadius="1.875rem"
            px="1.125rem"
            py="0.25rem"
            mb="0.5rem"
          >
            <Text
              fontSize="1rem"
              fontWeight="bold"
              letterSpacing="0.125rem"
              color="#090500"
              m={0}
            >
              ABOUT US
            </Text>
          </Box>
          <Text
            fontFamily="DM Serif Display"
            fontStyle="italic"
            fontWeight="bold"
            fontSize="2.25rem"
            textAlign={{ base: 'center', md: 'left' }}
          >
            Our Strategy
          </Text>
        </Box>
        {strategyData.map((section, idx) => (
          <Box
            key={section.title}
            bg="#DFE7FF"
            borderRadius="xl"
            p={{ base: '1rem', md: '2rem' }}
          >
            <HStack spacing="1rem" mb="1.72rem">
              <Flex
                align="center"
                justify="center"
                w={{ base: '2.75rem', md: '2.3125rem' }}
                h={{ base: '2.75rem', md: '2.3125rem' }}
                borderRadius="50%"
                bg="white"
                border="0.125rem solid #4A6EEB"
              >
                <Icon
                  as={section.icon}
                  w={{ base: 7, md: 6 }}
                  h={{ base: 7, md: 6 }}
                  color="#4A6EEB"
                />
              </Flex>
              <Text
                fontFamily="Manrope"
                fontWeight="700"
                fontSize={{ base: '1rem', md: '1.25rem' }}
                letterSpacing="4px"
                color="black"
              >
                {section.title}
              </Text>
            </HStack>
            <Text
              fontFamily="Manrope"
              fontWeight="400"
              fontSize={{ base: '0.875rem', md: '1.25rem' }}
              color="black"
              mb="1.5rem"
              textAlign={{ base: 'center', md: 'left' }}
            >
              {section.subtitle}
            </Text>
            <Text color="black" fontSize={{ base: '0.875rem', md: '1.125rem' }}>
              {section.description}
            </Text>
            <List spacing={0.5} pl={4} color="black">
              {section.bullets.map((bullet, i) => (
                <ListItem key={i}>
                  <Flex align="flex-start">
                    <Box
                      as="span"
                      color="black"
                      fontSize={{ base: '0.875rem', md: '1.125rem' }}
                      style={{  marginRight: '0.5rem' }}
                    >
                      •
                    </Box>
                    <Box as="span" fontSize={{ base: '0.875rem', md: '1.125rem' }}>
                      {bullet}
                    </Box>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default OurStrategy;
