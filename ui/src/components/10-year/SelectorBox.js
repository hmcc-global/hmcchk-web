import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { tenYearTheme } from './theme';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const SelectorBox = ({ options, defaultSelected = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [contentDirection, setContentDirection] = useState(0);

  const selected = options?.[selectedIndex] || options?.[0];

  return (
    <Box width="100%" maxW="850px" mx="auto" mt={6}>
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
          left={'10px'}
          width={`${100 / options.length - 10}%`}
          bg="#95CFFF"
          borderRadius="80px"
          initial={false}
          animate={{
            x: `${selectedIndex * 130}%`,
            transition: {
              type: 'spring',
              damping: 40,
              stiffness: 500,
            },
          }}
          zIndex={1} // Behind the text
        />
        <HStack spacing={0} align="stretch" zIndex={1}>
          {options.map((opt, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <Box
                key={opt.title}
                onClick={() => setSelectedIndex(idx)}
                flex={1}
                textAlign="center"
                cursor="pointer"
                userSelect="none"
                borderRadius="80px"
                py="10px"
                px={0}
                transition="background-color 0.2s ease, color 0.2s ease"
                {...tenYearTheme.typography.subheading}
                bg={isActive ? '#95CFFF' : 'transparent'}
                color={isActive ? '#00114F' : '#95CFFF'}
                zIndex={3}
              >
                {opt.title}
              </Box>
            );
          })}
        </HStack>
      </Box>

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
          >
            {selected?.content}
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default SelectorBox;
