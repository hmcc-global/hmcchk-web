import { Box, Text, Button, Image } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { tenYearTheme } from './theme';

const qr_image = `${process.env.PUBLIC_URL}/images/10-year/fpshongkong.png`;

const HongKongContent = () => (
  <Box
    width="100%"
    height="auto"
    borderRadius="20px"
    padding="20px"
    bgColor="rgba(0, 5, 68, 0.01)"
    display="flex"
    flexDirection="column"
    position="relative"
    overflow="visible"
    alignContent={"center"}
    margin={"0 auto"}
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
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        zIndex: 0,
        pointerEvents: 'none'
      }
    }}
  >
    {/* Top section - divided into left and right */}
    <Box 
      display="flex" 
      flex="1"
      position="relative"
      marginBottom="20px"
    >
      {/* Left section */}
      <Box 
        flex="1" 
        paddingRight="20px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Text {...tenYearTheme.typography.subheading}>
          Give through Fast Payment System (FPS)
        </Text>
        <Text mt={4} {...tenYearTheme.typography.givingInfo} fontWeight={700}>
          FPS ID: 167534304
        </Text>
        <Image src={qr_image} alt="FPS QR" mt={4} width={{base: "90px", md: "130px"}} height="auto" />
      </Box>
      
      {/* Gradient divider line in the middle */}
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
        paddingLeft="20px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Text {...tenYearTheme.typography.subheading} alignSelf="center" textAlign="center">
          Give through Bank Transfer
        </Text>
        <Box mt={4} textAlign="left" alignSelf="stretch">
          <Box
            {...tenYearTheme.typography.givingInfo}
            alignItems="baseline"
          >
            <Box as="span" fontWeight={700}>Bank Name/Code:</Box> {' '}
            <Box as="span" fontWeight={400}>China Construction Bank (Asia) Corporation Limited / 009</Box>
          </Box>
          <Box
            mt={1}
            {...tenYearTheme.typography.givingInfo}
            alignItems="baseline"
          >
            <Box as="span" fontWeight={700}>Branch Code:</Box> {' '}
            <Box as="span" fontWeight={400}>845</Box>
          </Box>
          <Box
            mt={1}
            {...tenYearTheme.typography.givingInfo}
            alignItems="baseline"
          >
            <Box as="span" fontWeight={700}>Account Name:</Box> {' '}
            <Box as="span" fontWeight={400}>Harvest Mission Community Church (Hong Kong) Limited</Box>
          </Box>
          <Box
            mt={1}
            {...tenYearTheme.typography.givingInfo}
            alignItems="baseline"
          >
            <Box as="span" fontWeight={700}>Account Number:</Box> {' '}
            <Box as="span" fontWeight={400}>013012090</Box>
          </Box>
          <Box
            mt={1}
            {...tenYearTheme.typography.givingInfo}
            alignItems="baseline"
          >
            <Box as="span" fontWeight={700}>Transfer Remarks:</Box> {' '}
            <Box as="span" fontWeight={400}>Love Offering</Box>
          </Box>
        </Box>
      </Box>
    </Box>

    {/* Bottom section - full width */}
    <Box 
      flex="0 0 auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop="10px"
      paddingBottom="12px"
    >
      <Button
        as="a"
        href="https://hk.hmccglobal.org/give"
        bg={'#FFFFFF'}
        borderRadius={'80px'}
        width={{ base: '140px', md: '240px' }}
        height={{ base: '40px', md: '50px' }}
        textColor={'#012C75'}
        fontFamily={'Manrope'}
        fontWeight={'bold'}
        fontSize={{ base: '0.8rem', md: '1.2rem' }}
        _hover={{ 
          backgroundColor: '#95CFFF',
          boxShadow: '0px 4px 94px 0px #000000, 0px 0px 24.1px 0px #95CFFF',
        }}
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
        zIndex="10"
        transition="all 0.2s ease"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={{ base: '15px', md: '35px' }}
        border="0.7px solid #95CFFF"
        target="_blank"
        rel="noopener noreferrer"
      >
        LEARN MORE
        <ArrowForwardIcon boxSize={{base:"4", md:"6"}}/>
      </Button>
    </Box>
  </Box>
);

export default HongKongContent;