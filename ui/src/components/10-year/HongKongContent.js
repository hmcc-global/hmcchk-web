import {
  Box,
  Text,
  Button,
  Image,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { tenYearTheme } from './theme';

const qr_image = `${process.env.PUBLIC_URL}/images/10-year/fpshongkong.png`;

const HongKongContent = () => {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const copyEmailToClipboard = () => {
    const FPSID = '167534304';
    navigator.clipboard
      .writeText(FPSID)
      .then(() => {
        toast({
          title: 'Email copied to clipboard',
          description: `${FPSID} has been copied to your clipboard`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast({
          title: 'Failed to copy',
          description: 'Please try again or copy manually',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      });
  };

  return (
    <Box
      width="auto"
      height={{ base: 'auto', md: '370px' }}
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
      {/* Top section - divided into left and right */}
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
          <Text {...tenYearTheme.typography.subheading}>
            Give through Fast Payment System (FPS)
          </Text>
          <Box mt={4} textAlign="left" alignSelf="stretch">
            <Box {...tenYearTheme.typography.givingInfo} alignItems="baseline">
              <Box as="span" fontWeight={700}>
                Open your mobile banking FPS interface and scan the QR code OR
                input the FPS identifier
              </Box>
            </Box>
          </Box>
          <Box mt={4} textAlign="left" alignSelf="stretch">
            <Box {...tenYearTheme.typography.givingInfo} alignItems="baseline">
              <Box as="span" fontWeight={700}>
                FPS ID:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                167534304
              </Box>
            </Box>

            <Box {...tenYearTheme.typography.givingInfo} alignItems="baseline">
              <Box as="span" fontWeight={700}>
                Name:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                HARVEST MISSION COMMUNITY CHURCH
              </Box>
            </Box>
          </Box>
          <Image
            src={qr_image}
            alt="FPS QR"
            mt={4}
            width={{ base: '90px', md: '110px' }}
            height="auto"
          />
          <Button
            onClick={copyEmailToClipboard}
            bg={'#FFFFFF'}
            borderRadius={'80px'}
            width="auto"
            height={{ base: '30px', md: '40px' }}
            textColor={'#012C75'}
            fontFamily={'Manrope'}
            fontWeight={'bold'}
            fontSize={{ base: '0.65rem', md: '1rem' }}
            _hover={{
              backgroundColor: '#95CFFF',
            }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
            zIndex="10"
            transition="all 0.2s ease"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border="0.7px solid #95CFFF"
            target="_blank"
            rel="noopener noreferrer"
            marginTop={'10px'}
            paddingY={'6px'}
          >
            <CopyIcon boxSize={{ base: '4', md: '6' }} marginRight="5px" />
            CLICK TO COPY FPS ID
          </Button>
        </Box>

        {/* Gradient divider line in the middle */}
        {isMobile ? (
          <Box
            width="80%"
            height="1px"
            border="0.5px solid #8BC0EC87"
            mx="auto"
            my={4}
          />
        ) : (
          <Box
            position="absolute"
            left="50%"
            top="0"
            bottom="0"
            width="1px"
            background="#8BC0EC87"
            transform="translateX(-50%)"
          />
        )}

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
          <Text
            {...tenYearTheme.typography.subheading}
            alignSelf="center"
            textAlign="center"
          >
            Give through Bank Transfer
          </Text>
          <Box mt={4} textAlign="left" alignSelf="stretch">
            <Box {...tenYearTheme.typography.givingInfo} alignItems="baseline">
              <Box as="span" fontWeight={700}>
                Bank Name/Code:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                China Construction Bank (Asia) Corporation Limited / 009
              </Box>
            </Box>
            <Box
              mt={1}
              {...tenYearTheme.typography.givingInfo}
              alignItems="baseline"
            >
              <Box as="span" fontWeight={700}>
                Branch Code:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                845
              </Box>
            </Box>
            <Box
              mt={1}
              {...tenYearTheme.typography.givingInfo}
              alignItems="baseline"
            >
              <Box as="span" fontWeight={700}>
                Account Name:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                Harvest Mission Community Church (Hong Kong) Limited
              </Box>
            </Box>
            <Box
              mt={1}
              {...tenYearTheme.typography.givingInfo}
              alignItems="baseline"
            >
              <Box as="span" fontWeight={700}>
                Account Number:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                013012090
              </Box>
            </Box>
          </Box>
          <Box mt={4} textAlign="left" alignSelf="stretch">
            <Box {...tenYearTheme.typography.givingInfo} alignItems="baseline">
              <Box as="span" fontWeight={700}>
                Transfer Remarks:
              </Box>{' '}
              <Box as="span" fontWeight={400}>
                10 Year
              </Box>
            </Box>
          </Box>
          <Box height="10px" />
        </Box>
      </Box>
    </Box>
  );
};

export default HongKongContent;
