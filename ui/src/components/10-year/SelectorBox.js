import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { tenYearTheme } from './theme';

const SelectorBox = ({ options, defaultSelected = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

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
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            zIndex: -1,
          }
        }}
      >
        <HStack spacing={0} align="stretch">
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
              >
                {opt.title}
              </Box>
            );
          })}
        </HStack>
      </Box>

      {selected?.content}

    </Box>
  );
};

export default SelectorBox;


