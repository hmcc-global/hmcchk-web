import React from 'react';
import { Box, VStack, Heading, HStack, Text } from '@chakra-ui/react';
import Button from '../../components/Button';
import CtaButton from '../../components/CtaButton';

const ButtonVariants = [
  { variant: 'solid', label: 'Solid' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'link', label: 'Link' },
];

const ButtonSizes = ['sm', 'md', 'lg'];
// Restrict testing to the three supported schemes
const ColorSchemes = ['blue', 'red', 'yellow'];

const TestingPage = () => {
  return (
    <Box py={10} px={[2, 4, 8]}>
      <Heading mb={8}>Button Component Test Page</Heading>
      <VStack align="start" spacing={8}>
        {ButtonVariants.map(({ variant, label }) => (
          <Box key={variant}>
            <Heading size="md" mb={4}>
              {label} variant
            </Heading>

            {ColorSchemes.length === 0 ? (
              <Text>No color schemes defined in theme.</Text>
            ) : (
              ColorSchemes.map((scheme) => (
                <Box key={scheme} mb={4}>
                  <Text mb={2} fontSize="sm" textTransform="capitalize">
                    {scheme}
                  </Text>
                  <HStack spacing={4}>
                    {ButtonSizes.map((size) => (
                      <Button
                        key={`${variant}-${scheme}-${size}`}
                        variant={variant}
                        size={size}
                        colorScheme={scheme}
                      >
                        {`${label} ${size.toUpperCase()}`}
                      </Button>
                    ))}
                  </HStack>
                </Box>
              ))
            )}
          </Box>
        ))}

        <Box>
          <Heading size="md" mb={4}>
            Disabled State
          </Heading>
          <HStack spacing={4}>
            {ButtonVariants.map(({ variant, label }) => (
              <Button key={variant} variant={variant} isDisabled>
                {label} Disabled
              </Button>
            ))}
          </HStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Full Width
          </Heading>
          <Button width="100%" colorScheme="teal">
            Full Width Button
          </Button>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            With Icon (example)
          </Heading>
          <Button
            leftIcon={
              <span role="img" aria-label="star">
                ⭐
              </span>
            }
            colorScheme="purple"
          >
            Icon Button
          </Button>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            CTA Buttons
          </Heading>
          {ColorSchemes.map((scheme) => (
            <Box key={`cta-${scheme}`} mb={4}>
              <Text mb={2} textTransform="capitalize">
                {scheme} CTA
              </Text>
              <HStack spacing={4}>
                {ButtonSizes.map((size) => (
                  <CtaButton
                    key={`cta-${scheme}-${size}`}
                    size={size}
                    colorScheme={scheme}
                  >
                    Learn more
                  </CtaButton>
                ))}
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default TestingPage;
