import { Button, HStack, Icon, Link, Text } from '@chakra-ui/react';
import { FaSpotify, FaYoutube } from 'react-icons/fa';

const SermonSocialMediaButtons = ({ isLive = false, spotifyLink, ytLink }) => {
  return (
    <HStack
      alignItems={'center'}
      justifyContent={{ base: 'center', lg: 'flex-start' }}
      spacing={{ base: '0.5rem', lg: '2.5rem' }}
    >
      <Link
        _hover={{ textDecoration: 'none' }}
        href={spotifyLink}
        id="sermon_details-sermons"
        display={isLive ? 'none' : 'flex'}
      >
        <Button
          variant="ghost"
          p={0}
          _hover={{ bgColor: 'transparent' }}
          fontSize="1rem"
          fontWeight={700}
          color="#4A6EEB"
          justifyContent={{ base: 'center', lg: 'flex-start' }}
          gap={{ base: 0, lg: '0.5rem' }}
        >
          <Icon as={FaSpotify} boxSize={{ base: '2rem', lg: '1.5rem' }} />
          <Text
            display={{ base: 'none', lg: 'flex' }}
            borderBottom="1px solid #4A6EEB"
          >
            Listen on Spotify
          </Text>
        </Button>
      </Link>
      <Link
        _hover={{ textDecoration: 'none' }}
        href={ytLink}
        id="sermon_details-sermons"
      >
        <Button
          p={0}
          variant="ghost"
          _hover={{ bgColor: 'transparent' }}
          fontSize="1rem"
          fontWeight={700}
          color="#4A6EEB"
          justifyContent={{ base: 'center', lg: 'flex-start' }}
          gap={{ base: 0, lg: '0.5rem' }}
        >
          <Icon as={FaYoutube} boxSize={{ base: '2rem', lg: '1.5rem' }} />
          <Text
            display={{ base: 'none', lg: 'flex' }}
            borderBottom="1px solid #4A6EEB"
          >
            Watch on YouTube
          </Text>
        </Button>
      </Link>
    </HStack>
  );
};

export default SermonSocialMediaButtons;
