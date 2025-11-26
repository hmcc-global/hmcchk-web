import React, { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

/**
 * Reusable TabGroup component with animated selector
 * @param {Object} props
 * @param {Array} props.options - Array of tab options with title and content
 * @param {number} props.defaultSelected - Default selected tab index
 * @param {string} props.selectorBg - Background color for active selector
 * @param {string} props.selectorColor - Text color for active selector
 * @param {string} props.inactiveColor - Text color for inactive tabs
 * @param {Object} props.typography - Typography theme for tabs
 */
const TabGroup = ({ 
  options = [], 
  defaultSelected = 0,
  selectorBg = '#95CFFF',
  selectorColor = '#00114F',
  inactiveColor = '#95CFFF',
  typography,
  ...boxProps 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [contentDirection, setContentDirection] = useState(0);

  const selected = options?.[selectedIndex] || options?.[0];

  const handleTabClick = (index) => {
    setContentDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  return (
    <Box width="100%" maxW="850px" mx="auto" mt={6} {...boxProps}>
      {/* Tab Selector */}
      <Box
        mb={4}
        bg="rgba(0, 5, 68, 0.01)"
        borderRadius="80px"
        p="8px"
        backdropFilter="blur(24px)"
        position="relative"
        sx={{
          WebkitBackdropFilter: 'blur(24px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '80px',
            padding: '1px',
            background: 'linear-gradient(270deg, #0029BD 0%, #95CFFF 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            zIndex: -1,
          },
        }}
      >
        <MotionBox
          position="absolute"
          top="8px"
          bottom="8px"
          left="0"
          width="100%" // Full container width
          initial={false}
          animate={{
            x: `${selectedIndex * (100 / options.length)}%`,
            transition: {
              type: 'spring',
              damping: 40,
              stiffness: 500,
            },
          }}
          zIndex={1}
        >
          {/* The actual highlight - takes correct percentage of the motion box */}
          <Box
            width={`${100 / options.length - 10}%`} // This will be 33.33% for 3 options
            height="100%"
            bg={selectorBg}
            borderRadius="80px"
            mx="8px" // Adjust horizontal margin for spacing from edges
          />
        </MotionBox>
        <HStack spacing={0} align="stretch" zIndex={2} position="relative">
          {options.map((opt, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <Box
                key={opt.title || idx}
                onClick={() => handleTabClick(idx)}
                flex={1}
                textAlign="center"
                cursor="pointer"
                userSelect="none"
                borderRadius="80px"
                py="10px"
                px={0}
                transition="all 0.2s ease"
                {...typography}
                bg={isActive ? selectorBg : 'transparent'}
                color={isActive ? selectorColor : inactiveColor}
                _hover={{
                  bg: isActive ? selectorBg : 'rgba(149, 207, 255, 0.1)',
                }}
                zIndex={3}
              >
                {opt.title}
              </Box>
            );
          })}
        </HStack>
      </Box>

      {/* Content Area */}
      <Box
        width="auto"
        height={{ base: '735px', md: '370px' }}
        borderRadius="20px"
        padding="20px"
        paddingBottom={'0px'}
        bgColor="rgba(0, 5, 68, 0.01)"
        display="flex"
        flexDirection={{ base: 'row', md: 'column' }}
        position="relative"
        overflow="visible"
        alignContent={'center'}
        margin={'0 auto'}
        backdropFilter="blur(12px)"
        sx={{
          WebkitBackdropFilter: 'blur(12px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '20px',
            padding: '1px',
            background: 'linear-gradient(270deg, #0029BD 0%, #95CFFF 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            zIndex: 0,
            pointerEvents: 'none',
          },
        }}
      >
        <AnimatePresence mode="wait">
          <MotionBox
            key={selectedIndex}
            initial={{
              opacity: 0,
              x: contentDirection > 0 ? 50 : -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.2,
                delay: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              x: contentDirection > 0 ? -50 : 50,
              transition: { duration: 0.2 },
            }}
            width="100%"
          >
            {selected?.content}
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default TabGroup;