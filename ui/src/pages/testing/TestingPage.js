import React from 'react';
import { Box, VStack, Heading, HStack, Text } from '@chakra-ui/react';
import Button from '../../components/Button';
import TextButton from '../../components/Button/TextButton';
import IconButton from '../../components/Button/IconButton';
import NavButton from '../../components/Button/NavButton';
import ButtonGroup from '../../components/Button/ButtonGroup';
import { ArrowIcon } from '../../components/Button/TextButton';

const ButtonVariants = [
  { variant: 'solid', label: 'Solid' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'link', label: 'Link' },
];

const TextButtonVariants = [
  { variant: 'filled', label: 'Filled' },
  { variant: 'outlined', label: 'Outlined' },
  { variant: 'ghost', label: 'Ghost' },
];

const ButtonSizes = ['sm', 'md', 'lg'];
const TextButtonSizes = ['sm', 'md'];
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

        {/* New TextButton Components */}
        <Box>
          <Heading size="lg" mb={6} color="blue.500">
            New Button Components
          </Heading>
          
          {/* TextButton Variants */}
          <Box mb={8}>
            <Heading size="md" mb={4}>
              TextButton Variants
            </Heading>
            {TextButtonVariants.map(({ variant, label }) => (
              <Box key={variant} mb={6}>
                <Heading size="sm" mb={4}>
                  {label} TextButton
                </Heading>
                
                {/* Without Icons */}
                <Box mb={4}>
                  <Text mb={2} fontSize="sm" fontWeight="medium">No Icon</Text>
                  <HStack spacing={4} mb={4}>
                    {TextButtonSizes.map((size) => (
                      <TextButton key={`${variant}-${size}`} variant={variant} size={size}>
                        {label} {size.toUpperCase()}
                      </TextButton>
                    ))}
                  </HStack>
                  <HStack spacing={4}>
                    {TextButtonSizes.map((size) => (
                      <TextButton key={`${variant}-${size}-disabled`} variant={variant} size={size} isDisabled>
                        Disabled {size.toUpperCase()}
                      </TextButton>
                    ))}
                  </HStack>
                </Box>

                {/* With Left Icon */}
                <Box mb={4}>
                  <Text mb={2} fontSize="sm" fontWeight="medium">Left Icon</Text>
                  <HStack spacing={4} mb={4}>
                    {TextButtonSizes.map((size) => (
                      <TextButton 
                        key={`${variant}-${size}-left`} 
                        variant={variant} 
                        size={size}
                        leftIcon={<ArrowIcon />}
                      >
                        {label} {size.toUpperCase()}
                      </TextButton>
                    ))}
                  </HStack>
                  <HStack spacing={4}>
                    {TextButtonSizes.map((size) => (
                      <TextButton 
                        key={`${variant}-${size}-left-disabled`} 
                        variant={variant} 
                        size={size}
                        leftIcon={<ArrowIcon />}
                        isDisabled
                      >
                        Disabled {size.toUpperCase()}
                      </TextButton>
                    ))}
                  </HStack>
                </Box>

                {/* With Right Icon */}
                <Box mb={4}>
                  <Text mb={2} fontSize="sm" fontWeight="medium">Right Icon</Text>
                  <HStack spacing={4} mb={4}>
                    {TextButtonSizes.map((size) => (
                      <TextButton 
                        key={`${variant}-${size}-right`} 
                        variant={variant} 
                        size={size}
                        rightIcon={<ArrowIcon />}
                      >
                        {label} {size.toUpperCase()}
                      </TextButton>
                    ))}
                  </HStack>
                  <HStack spacing={4}>
                    {TextButtonSizes.map((size) => (
                      <TextButton 
                        key={`${variant}-${size}-right-disabled`} 
                        variant={variant} 
                        size={size}
                        rightIcon={<ArrowIcon />}
                        isDisabled
                      >
                        Disabled {size.toUpperCase()}
                      </TextButton>
                    ))}
                  </HStack>
                </Box>
              </Box>
            ))}
          </Box>

          {/* IconButton */}
          <Box mb={8}>
            <Heading size="md" mb={4}>
              IconButton
            </Heading>
            {TextButtonVariants.map(({ variant, label }) => (
              <Box key={variant} mb={4}>
                <Text mb={2} fontSize="sm" fontWeight="medium" textTransform="capitalize">
                  {label}
                </Text>
                <HStack spacing={4} mb={4}>
                  {TextButtonSizes.map((size) => (
                    <IconButton 
                      key={`icon-${variant}-${size}`} 
                      variant={variant} 
                      size={size}
                      icon={<ArrowIcon />}
                      aria-label={`${label} icon button ${size}`}
                    />
                  ))}
                </HStack>
                <HStack spacing={4}>
                  {TextButtonSizes.map((size) => (
                    <IconButton 
                      key={`icon-${variant}-${size}-disabled`} 
                      variant={variant} 
                      size={size}
                      icon={<ArrowIcon />}
                      aria-label={`Disabled ${label} icon button ${size}`}
                      isDisabled
                    />
                  ))}
                </HStack>
              </Box>
            ))}
          </Box>

          {/* NavButton */}
          <Box mb={8}>
            <Heading size="md" mb={4}>
              NavButton
            </Heading>
            <Box mb={4}>
              <Text mb={2} fontSize="sm" fontWeight="medium">Navigation States</Text>
              <HStack spacing={4} mb={4}>
                <NavButton>Normal</NavButton>
                <NavButton isActive>Active</NavButton>
                <NavButton isDisabled>Disabled</NavButton>
              </HStack>
            </Box>
            <Box mb={4}>
              <Text mb={2} fontSize="sm" fontWeight="medium">With Icons</Text>
              <HStack spacing={4}>
                <NavButton leftIcon={<ArrowIcon />}>With Left Icon</NavButton>
                <NavButton rightIcon={<ArrowIcon />}>With Right Icon</NavButton>
                <NavButton leftIcon={<ArrowIcon />} rightIcon={<ArrowIcon />}>Both Icons</NavButton>
              </HStack>
            </Box>
          </Box>

          {/* ButtonGroup */}
          <Box mb={8}>
            <Heading size="md" mb={4}>
              ButtonGroup
            </Heading>
            {TextButtonVariants.map(({ variant, label }) => (
              <Box key={variant} mb={6}>
                <Text mb={2} fontSize="sm" fontWeight="medium" textTransform="capitalize">
                  {label} ButtonGroup
                </Text>
                <VStack align="start" spacing={4}>
                  <ButtonGroup variant={variant} isAttached>
                    <TextButton>First</TextButton>
                    <TextButton>Second</TextButton>
                    <TextButton>Third</TextButton>
                  </ButtonGroup>
                  <ButtonGroup variant={variant} isAttached orientation="vertical">
                    <TextButton>First</TextButton>
                    <TextButton>Second</TextButton>
                    <TextButton>Third</TextButton>
                  </ButtonGroup>
                </VStack>
              </Box>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default TestingPage;
