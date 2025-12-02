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
              href="https://give.tithe.ly/?formId=a24ffd31-6865-11ee-90fc-1260ab546d11"
              color="#000000"
            >
              HERE
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
            Name within 2 weeks to <b> hk@hmccglobal.org.</b>
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
      h={['180px', '200px', '380px']}
    >
      <Flex
        borderRadius="2xl"
        w="full"
        h="100%"
        justify="center"
        style={{
          backdropFilter: 'blur(2px)',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box
          py={['0vh', '3vh', '10vh']}
          px={[1, 0]}
          minH={{ base: '7vh', sm: '7vh', md: '20vh' }}
          minW="90%"
          justifyContent="center"
          textAlign="center"
          verticalAlign="middle"
        >
          <Flex
            direction={{ base: 'column', md: 'column' }}
            minH={['70%', '100%']}
            mt={['2vh', '0vh', '0vh']}
          >
            <Center>
              <Heading
                as="h2"
                fontSize={['26', '40']}
                fontFamily="Manrope"
                color="#00328D"
                fontWeight={{ base: '900', md: '900' }}
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
                  w={['50%', '100%']}
                  size="md"
                  variant="outline"
                  onClick={onOpen}
                  borderRadius="2xl"
                  borderColor="#00328D"
                >
                  <Text
                    align="center"
                    fontSize={['14', '20']}
                    fontWeight={{ base: '700', md: '700' }}
                    pl={6}
                    pr={6}
                    fontFamily="Manrope"
                    color="#00328D"
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
      <Box pt={[2, 2]} textAlign="left">
        <Text
          color={accentColor}
          fontWeight="800"
          fontSize={['26', '40']}
          pb={1}
          fontFamily="DMserifText"
        >
          Ways To Give
        </Text>
        <Text
          color={accentColor}
          fontWeight="700"
          fontSize={['14', '20']}
          fontFamily="Manrope"
        >
          There are a few different ways you can give to our church.
        </Text>
        <Text fontSize={['14', '20']} fontFamily="Manrope">
          <i>
            *When giving, please always use your legal name and provide the same
            email address consistently.
          </i>
        </Text>
      </Box>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={[2, 4]}>
        <GivingCard
          text="FPS"
          imageLink={process.env.PUBLIC_URL + '/images/givingTuesday/fps.png'}
        />
        <GivingCard
          text="Online Giving"
          imageLink={
            process.env.PUBLIC_URL + '/images/givingTuesday/online.png'
          }
        />
        <GivingCard
          text="Bank Transfer"
          imageLink={
            process.env.PUBLIC_URL + '/images/givingTuesday/transfer.png'
          }
        />
      </Stack>

      <Box fontSize={['14', '20']} fontFamily="Manrope">
        *If you would like to give via cash, please contact your LIFE Group
        leader to help transfer the giving for you
      </Box>
      <Box fontSize={['14', '20']} fontFamily="Manrope">
        <i>
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team. If you have
          any questions, please do not hesitate to contact us:{' '}
        </i>
        <b>
          <a href="mailto:stewardship@hongkong.hmcc.net">
            <i> stewardship@hongkong.hmcc.net</i>
          </a>
        </b>
      </Box>
    </Stack>
  );
};

export default WaysToGive;
