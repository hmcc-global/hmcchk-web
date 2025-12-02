import * as React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  Spacer,
  useDisclosure,
  VStack,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
  ModalFooter,
} from '@chakra-ui/react';

const RenderSwitch = (param) => {
  switch (param.ModalSelection) {
    case 'FPS':
      return (
        <Flex direction={['column', 'column', 'row']}>
          <Stack>
            <Text fontWeight="bold">
              Open your mobile banking FPS interface and scan the QR code OR
              input the FPS identifier:
            </Text>
            <Box>
              <Text>
                Name: <b> HARVEST MISSION COMMUNITY CHURCH</b>
              </Text>
              <Text>
                FPS ID: <b>167534304 </b>
              </Text>
            </Box>
          </Stack>
          <Spacer />

          <Image
            margin="auto"
            src={process.env.PUBLIC_URL + '/images/giving/FPSQR.png'}
            boxSize={['70%', '70%', '30%']}
          />
        </Flex>
      );
    case 'Online Giving':
      return (
        <Box>
          <Text fontWeight="bold" mb="5">
            Online Giving:{' '}
            <Link
              style={{
                textDecoration: 'underline',
              }}
              href="https://bit.ly/hmcc-giving-cc"
              color="#000000"
            >
              https://bit.ly/hmcc-giving-cc
            </Link>{' '}
          </Text>
          <Text>
            Kindly note that a portion of your giving will be deducted for
            online credit card transactions (3.5% + HKD $2.35 processing fee).
            If you wish for 100% of your contribution to go towards our church’s
            ministry work, please consider selecting “cover fees” on the giving
            site or give via cash or check.
          </Text>
        </Box>
      );
    case 'Bank Transfer':
      return (
        <VStack spacing="3vh">
          <Box>
            <Text fontWeight="bold">
              You may use the following information:
            </Text>
            <Text>
              Bank Name:{' '}
              <b>China Construction Bank (Asia) Corporation Limited</b>
            </Text>
            <Text>
              Bank Code: <b>009</b>
            </Text>
            <Text>
              Branch Code: <b>845</b>
            </Text>
            <Text>
              Account Name: <b>Harvest Mission Community Church (Hong Kong)</b>
            </Text>
            <Text>
              Limited Account Number: <b>13012090</b>
            </Text>
          </Box>

          <Text>
            If our account name is too long and exceeds the number of permitted
            characters, you may shorten it as{' '}
            <b> “Harvest Mission Community Church HK”.</b>
          </Text>
          <Text>
            Please email a copy of your transfer receipt along with your Full
            Name within 2 weeks to <b> stewardship@hongkong.hmcc.net.</b>
          </Text>
        </VStack>
      );
    default:
      return 'not detected';
  }
};

const GivingCard = (cardinfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={['100%', '100%', '32%']}
      borderRadius="2xl"
      my={['0', '0', '0']}
      bgImage={cardinfo.imageLink}
      bgPosition="center"
      bgSize="cover"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.15)"
      fontFamily="Inter"
    >
      <Flex
        borderRadius="2xl"
        w="full"
        h="100%"
        justify="center"
        style={{
          backdropFilter: 'blur(2px)',
          background: 'rgba(0, 0, 0, 0.29)',
        }}
      >
        <Box
          py={['0vh', '3vh', '10vh']}
          px={[1, 0]}
          minH={{ base: '7vh', sm: '12vh', md: '20vh' }}
          minW="90%"
          justifyContent="center"
          textAlign="center"
          verticalAlign="middle"
        >
          <Flex direction={{ base: 'row', md: 'column' }} minH="100%">
            <Center>
              <Heading
                as="h2"
                fontSize={['lg', 'xl', '3xl']}
                color="white"
                fontWeight={{ base: '500', md: '700' }}
              >
                {cardinfo.text}
              </Heading>
            </Center>
            <Spacer />
            <Center>
              <Box
                w={{ base: '80%', md: '70%' }}
                float={['right', 'center']}
                mt={{ base: '0', md: '8' }}
              >
                <Button
                  w="100%"
                  size="sm"
                  variant="outline"
                  onClick={onOpen}
                  borderRadius="xl"
                >
                  <Text
                    align="center"
                    fontSize={['x-small', 'sm', 'sm']}
                    fontWeight={{ base: '500', md: '700' }}
                    color="white"
                    pl={6}
                    pr={6}
                  >
                    Learn More
                  </Text>
                </Button>
                <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <Heading as="h2" size="xl" fontWeight="bold">
                        {cardinfo.text}
                      </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <RenderSwitch ModalSelection={cardinfo.text} />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Center>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const WaysToGive = (props) => {
  const { accentColor } = props;
  return (
    <Stack spacing={5} direction="column" pb="5">
      <Box pt={[2, 2]} textAlign="center">
        <Text
          color={accentColor}
          fontWeight="800"
          fontSize={['1.4rem', '1.875rem']}
          pb={1}
        >
          Ways To Give
        </Text>
        <Text
          color={accentColor}
          fontWeight="700"
          fontSize={['0.8rem', '1.25rem']}
        >
          There are a few different ways you can give to our church.
        </Text>
        <Text fontSize={['0.7rem', 'md']}>
          <i>
            *When giving, please always use your legal name and provide the same
            email address consistently.
          </i>
        </Text>
      </Box>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={[1, 4]}>
        <GivingCard
          text="FPS"
          imageLink={process.env.PUBLIC_URL + '/images/giving/FPS.png'}
        />
        <GivingCard
          text="Online Giving"
          imageLink={process.env.PUBLIC_URL + '/images/giving/Online.png'}
        />
        <GivingCard
          text="Bank Transfer"
          imageLink={process.env.PUBLIC_URL + '/images/giving/Transfer.png'}
        />
      </Stack>
      <Box fontSize={['0.7rem', 'md']}>
        *If you would like to give via cash, please contact your LIFE Group
        leader to help transfer the giving for you
      </Box>
      <Box fontSize={['0.7rem', 'md']}>
        <i>
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team. If you have
          any questions, please do not hesitate to contact us:{' '}
        </i>
        <b>
          <a href="mailto:stewardship@hongkong.hmcc.net">
            <i>stewardship@hongkong.hmcc.net</i>
          </a>
        </b>
      </Box>
    </Stack>
  );
};

export default WaysToGive;
