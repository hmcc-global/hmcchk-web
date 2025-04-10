import { Box, Container, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

const ShareAndInviteSection = () => {
  const history = useHistory();

  const handleDownloadImage = () => {
    const imageUrl =
      process.env.PUBLIC_URL + '/images/easter-2025/redeemed-e-invite.jpg';
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Redeemed-e-invite.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  };
  return (
    <>
      <Container maxWidth="100%" mb={6}>
        <Flex
          direction={['column', 'column', 'row']}
          justifyContent="space-between"
          mx={['0%', '5%']}
          gap={4}
        >
          <Box
            height={{ xl: '133px' }}
            width={['95%', '95%', '45%']}
            borderRadius={24}
            border="1px solid #000"
            display="flex"
            justifyContent={['flex-start', 'space-between']}
            alignItems={['flex-start', 'center']}
            py={[4, 4]}
            px={[6, 8]}
            gap={6}
            cursor="pointer"
            onClick={() => history.push('/discover')}
            _hover={{ backgroundColor: '#FFFFFF' }}
            flexDirection={['column', 'row']}
          >
            <Box>
              <Image
                src={process.env.PUBLIC_URL + '/images/ripple_black.svg'}
                maxHeight={{ base: '20px', md: '20px', lg: '30px' }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box width={['60%', '75%', '%']}>
                <Text
                  fontFamily="Lexend_Peta"
                  fontWeight={900}
                  letterSpacing={['-2.4px', '-3.9px']}
                  lineHeight={['140%', '140%']}
                  fontSize={['0.875rem', '1.25rem']}
                  mb={3}
                >
                  WE ARE HARVEST MISSION COMMUNITY CHURCH
                </Text>
                <Text
                  fontFamily="Lexend_Peta"
                  fontWeight={900}
                  letterSpacing={['-2.4px', '-3.9px']}
                  lineHeight={['140%', '140%']}
                  fontSize={['0.875rem', '1.25rem']}
                >
                  LEARN MORE ABOUT US!
                </Text>
              </Box>
              <Box>
                <Icon as={FaArrowRight} boxSize={4} />
              </Box>
            </Box>
          </Box>
          <Box
            height={{ xl: '133px' }}
            width={['95%', '95%', '45%']}
            borderRadius={24}
            border="1px solid #000"
            display="flex"
            justifyContent={['flex-start', 'space-between']}
            alignItems={['flex-start', 'center']}
            py={[4, 4]}
            px={[6, 8]}
            gap={3}
            cursor="pointer"
            _hover={{ backgroundColor: '#FFFFFF' }}
            onClick={handleDownloadImage}
            flexDirection={['column', 'row']}
          >
            <Box mb={[2, 0]}>
              <Image
                src={
                  process.env.PUBLIC_URL + '/images/easter-2025/blue-heart.svg'
                }
              ></Image>
            </Box>
            <Box
              display="flex"
              width={{ sm: '90%' }}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              gap={3}
            >
              <Box height="100%" width={['60%', '75%', '60%']}>
                <Text
                  fontFamily="Lexend_Peta"
                  fontWeight={900}
                  letterSpacing={['-2.4px', '-3.9px']}
                  lineHeight={['140%', '140%']}
                  fontSize={['0.875rem', '1.25rem']}
                >
                  SHARE AND INVITE TO PASSION WEEK EVENTS
                </Text>
              </Box>
              <Box>
                <Icon as={MdOutlineFileDownload} boxSize={6} />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default ShareAndInviteSection;
