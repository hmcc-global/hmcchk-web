import {
  Box,
  Text,
  Button,
  Image,
  Link,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { tenYearTheme } from './theme';

const qr_image = `${process.env.PUBLIC_URL}/images/10-year/internationalQR.png`;

const InternationalContent = () => {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const email = 'hmg@hongkong.hmcc.net';
  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast({
          title: 'Email copied to clipboard',
          description: `${email} has been copied to your clipboard`,
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
          minHeight={{ base: '100%', md: '290px' }}
          paddingBottom={{ base: 6, md: 0 }}
        >
          <Text {...tenYearTheme.typography.subheading} textAlign="center">
            Give via Credit Card
          </Text>

          <Box display="flex" flexDirection="column" gap={2}>
            <Text
              {...tenYearTheme.typography.givingInfo}
              fontWeight={700}
              textAlign="center"
            >
              Click on the{' '}
              <Link
                href="https://give.tithe.ly/?formId=a24ffd31-6865-11ee-90fc-1260ab546d11&locationId=10885594-3172-4336-9b5a-0e71c8da3d41&fundId=dc576b37-2abc-405c-a852-e2a8a8f0485c"
                color="#FFFB95"
              >
                link
              </Link>{' '}
              or scan the QR code below to give via credit card.
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text
              {...tenYearTheme.typography.givingInfo}
              fontWeight={700}
              textAlign="center"
            >
              Credit card transaction fee (3.5% + HKD $2.35) will be deducted
              from the total amount.
            </Text>
          </Box>

          <Image
            src={qr_image}
            alt="FPS QR"
            width={{ base: '90px', md: '130px' }}
            height="auto"
            marginY={'5px'}
          />
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
          <Text {...tenYearTheme.typography.subheading}>Give via Zelle</Text>
          <Text {...tenYearTheme.typography.givingInfo} fontWeight={700}>
            Transfer with Zelle to email address ({email}) and input "10 Year"
            in the giving memo remarks field
          </Text>
          <Button
            onClick={copyEmailToClipboard}
            bg={'#FFFFFF'}
            borderRadius={'80px'}
            width="auto"
            height={{ base: '30px', md: '50px' }}
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
          >
            <CopyIcon boxSize={{ base: '4', md: '6' }} marginRight="5px" />
            CLICK TO COPY EMAIL
          </Button>
        </Box>
      </Box>
  );
};
export default InternationalContent;
