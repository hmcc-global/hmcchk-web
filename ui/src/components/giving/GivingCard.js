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
              input the FPS identifier.
            </Text>
            <Box>
              <Text fontWeight="bold">
                Name: HARVEST MISSION COMMUNITY CHURCH
              </Text>
              <Text fontWeight="bold">FPS ID: 167534304</Text>
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
    case 'Bank Transfer':
      return (
        <VStack spacing="3vh">
          <Box py="1em">
            <Text fontWeight="bold">
              You may use the following information:
            </Text>
            <Text fontWeight="bold">
              Bank Name: China Construction Bank (Asia) Corporation Limited
            </Text>
            <Text fontWeight="bold">Bank Code: 009</Text>
            <Text fontWeight="bold">Branch Code: 845</Text>
            <Text fontWeight="bold">
              Account Name: Harvest Mission Community Church (Hong Kong) Limited
            </Text>
            <Text fontWeight="bold"> Account Number: 013012090</Text>
            <Text fontWeight="bold">
              Transfer Remarks: Please indicate the giving type (Weekly
              Offering, Tithe, HMI, or Other) and write down the giving date
              (e.g. Weekly Offering 2019-11-03)
            </Text>
          </Box>

          <Text fontWeight="bold">
            If our account name is too long and exceeds the number of permitted
            characters, you may shorten it as “Harvest Mission Community Church
            HK”.
          </Text>
          <Text fontWeight="bold">
            Please email a copy of your transfer receipt along with your Full
            Name within 2 weeks to stewardship@hongkong.hmcc.net.
          </Text>
        </VStack>
      );
    case 'Cash':
      return (
        <Box>
          <Text fontWeight="bold">
            You may give to our church by cash or check in an offering envelope
            at Sunday Celebration.
          </Text>
        </Box>
      );
    case 'Online Giving':
      return (
        <Box>
          <Text fontWeight="bold">
            Kindly note that a portion of your giving will be deducted for
            online credit card transactions (3.5% + HKD $2.35 processing fee).
            If you wish for 100% of your contribution to go towards our church’s
            ministry work, please consider selecting “cover fees” on the giving
            site or give via cash or check.
          </Text>
          <Text fontWeight="bold">
            Click{' '}
            <Link
              style={{
                textDecoration: 'underline',
              }}
              href="https://tithe.ly/give_new/www/#/tithely/give-one-time/645349"
              color="#319795"
            >
              here
            </Link>{' '}
            to proceed with online credit card giving
          </Text>
        </Box>
      );
    case 'Cheque':
      return (
        <Box>
          <Text fontWeight="bold">All Checks should be made out to:</Text>
          <Text fontWeight="bold">
            “Harvest Mission Community Church (Hong Kong) Limited”
          </Text>
        </Box>
      );
    default:
      return 'not detected';
  }
};

export const GivingCard = (cardinfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={['100%', '100%', '32%']}
      borderRadius="lg"
      my={['0.6em', '0.6em', '0']}
      bgImage={cardinfo.imageLink}
      bgPosition="center"
      bgSize="cover"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.15)"
    >
      <Flex
        borderRadius="lg"
        w="full"
        h="100%"
        justify="center"
        style={{
          backdropFilter: 'blur(4px)',
          background: 'rgba(0, 0, 0, 0.29)',
        }}
      >
        <Box
          py={['2vh', '3vh', null]}
          m={[null, null, 'auto']}
          minH="10vh"
          minW="90%"
        >
          <Flex direction={['row', 'row', 'column']}>
            <Center paddingBottom={['0', '0', '2vh', '1.5vh']}>
              <Heading
                as="h4"
                fontSize={['sm', 'md', 'xl']}
                color="white"
                fontWeight="bold"
              >
                {cardinfo.text}
              </Heading>
            </Center>
            <Spacer />

            <Center>
              <Box w={['6em', '8em']}>
                <Button
                  w="100%"
                  variant="outline"
                  onClick={onOpen}
                  _hover={{
                    background: 'rgba(128,128,128, 0.4)',
                  }}
                >
                  <Text
                    align="center"
                    fontSize={['sm', 'md', 'lg']}
                    color="white"
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
export default GivingCard;
