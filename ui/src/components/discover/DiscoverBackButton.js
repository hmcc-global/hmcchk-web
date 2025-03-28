import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Image, Container } from '@chakra-ui/react';

const BackButton = () => {
  const [visible, setVisible] = useState(true);
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setVisible(false);
    } else {
      // Scrolling up
      setVisible(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const backIcon = `${process.env.PUBLIC_URL}/images/discover/keyboard-arrow-left.svg`;
  return (
    <Box
      position="fixed" // Fix the button to the top left
      width="100%" // Adjust width as needed
      zIndex="2" // Ensure it stays above other content
      opacity={visible ? 1 : 0} // Change opacity based on visibility
      backdropFilter="blur(10px)" // Apply the blur effect
      bg="#F6FAFF" // Optional: semi-transparent background color
      transition="opacity 0.3s" // Smooth transition
      pointerEvents={visible ? 'auto' : 'none'} // Disable pointer events when hidden
      py={'18px'}
    >
      <Container maxW="container.xl">
        <Flex
          align={'center'} // Align icon and text vertically
          cursor="pointer" // Change cursor to pointer on hover
          onClick={() => (window.location.href = '/discover')} // Navigate to discover page
        >
          {/* Back Icon */}

          <Image
            src={backIcon}
            alt="Back"
            boxSize={{ base: '1.5rem', md: '2rem' }} // Set the desired size
            objectFit="contain" // Maintain aspect ratio
            borderRadius={'24px'}
            border={'2px solid #DFE7FF'}
            bg={'#DFE7FF'}
          />

          {/* Text */}
          <Text
            ml={'6'}
            fontSize={{ base: '0.625rem', md: '0.875rem', lg: '1rem' }}
            fontFamily={'Manrope'}
            color={'#4A6EEB'}
            letterSpacing={'2px'}
            fontWeight={'700'}
          >
            DISCOVER HMCC
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default BackButton;
