import {
  Box,
} from '@chakra-ui/react';

const InternationalContent = () => {
  return (
      <Box
        display="flex"
        flex="1"
        position="relative"
        flexDirection={{ base: 'column', md: 'row' }}
        marginBottom="20px"
        height={{ base: 'auto', md: '280px' }}
      >
        {/* Left section */}
        <Box
          flex="1"
          paddingRight={{ base: '0', md: '20px' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          minHeight={{ base: 'auto', md: '330px' }}
          gap={{ base: 4, md: 0 }}
          paddingBottom={{ base: 6, md: 0 }}
        >
        </Box>

        <Box
          position="absolute"
          left="50%"
          top="0"
          bottom="0"
          width="1px"
          background="#8BC0EC87"
          transform="translateX(-50%)"
        />

        {/* Right section */}
        <Box
          flex="1"
          paddingLeft={{ base: '0', md: '20px' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          minHeight={{ base: 'auto', md: '290px' }}
          gap={{ base: 4, md: 0 }}
          paddingBottom={{ base: 6, md: 0 }}
        >
        </Box>
      </Box>
  );
};

export default InternationalContent;