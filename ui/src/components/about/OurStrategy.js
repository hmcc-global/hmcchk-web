import { Box, Flex, Text, Heading, VStack, HStack, Icon, List, ListItem } from '@chakra-ui/react';
import { FaUsers, FaLeaf, FaRunning } from 'react-icons/fa';

const strategyData = [
  {
    icon: FaUsers,
    title: 'GATHER',
    subtitle: 'Corporate Gatherings & Community Gatherings',
    description: `We gather to foster a greater sense of unity and to continue to build up the church body:`,
    bullets: [
      'Corporate Gatherings are what we do together as the local body of Christ, such as Sunday Celebration, retreats, and baptism services.',
      'Community Gatherings are what we do in biblical community, specifically LIFE Group.'
    ]
  },
  {
    icon: FaLeaf,
    title: 'GROW',
    subtitle: 'Life-on-Life & Equipping',
    description: `We believe it is crucial that we do not grow stagnant in our faith, but that we are continually learning and being challenged:`,
    bullets: [
      'Life-on-Life involves intentional relationships like Life Change Groups (LCG) and discipleship, which allows us to sharpen each other as Christ-followers.',
      'Equipping entails purposeful investment in people to live a transformed life through opportunities such as Experiencing Classes, Freedom Class, ministry team service, and learning to study the Bible and pray.'
    ]
  },
  {
    icon: FaRunning,
    title: 'GO',
    subtitle: 'Personal Mission & Team-Based Mission',
    description: `We have been called to go out and make disciples, by sharing the Good News and testifying of the work God has done in our lives:`,
    bullets: [
      'Personal Mission happens when an individual lives as the salt and light in our world, shares his/her faith with others and invites people into our community.',
      'Team-Based Mission happens when we partner together for God\'s kingdom purposes through opportunities like missional initiatives, missions teams, and church plant teams.'
    ]
  }
];

const OurStrategy = () => {
  return (
    <Box bg="#f7f8fa" minH="100vh" py={{ base: 8, md: 16 }} px={{ base: 4, md: 0 }}>
      <VStack spacing={{ base: 6, md: 8 }} align="stretch" maxW={{ base: '100%', md: '800px' }} mx="auto">
        <Box>
          <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" letterSpacing="widest" color="gray.600" mb={2}>
            ABOUT US
          </Text>
          <Heading as="h2" fontFamily="serif" fontStyle="italic" fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }} mb={4}>
            Our Strategy
          </Heading>
        </Box>
        {strategyData.map((section, idx) => (
          <Box
            key={section.title}
            bg="#e7edfa"
            borderRadius="xl"
            p={{ base: 4, md: 8 }}
          >
            <HStack spacing={4} mb={2}>
              <Flex
                align="center"
                justify="center"
                w={{ base: 8, md: 10 }}
                h={{ base: 8, md: 10 }}
                borderRadius="full"
                bg="white"
              >
                <Icon as={section.icon} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="blue.500" />
              </Flex>
              <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} letterSpacing="widest" color="gray.700">
                {section.title}
              </Text>
            </HStack>
            <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'md' }} color="gray.800" mb={1}>
              {section.subtitle}
            </Text>
            <Text color="gray.700" mb={2} fontSize={{ base: 'sm', md: 'md' }}>
              {section.description}
            </Text>
            <List spacing={1} pl={4} color="gray.700">
              {section.bullets.map((bullet, i) => (
                <ListItem key={i}>
                  <Flex align="flex-start">
                    <Box as="span" color="blue.400" fontSize={{ base: 'lg', md: 'xl' }} style={{ marginTop: 4, marginRight: 8 }}>
                      •
                    </Box>
                    <Box as="span" fontSize={{ base: 'sm', md: 'md' }}>{bullet}</Box>
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
