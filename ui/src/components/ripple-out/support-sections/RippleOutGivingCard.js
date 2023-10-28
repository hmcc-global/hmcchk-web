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
        <Flex direction={['column', 'column', 'row']} fontWeight="bold">
          <Stack>
            <Text>
              Open your mobile banking FPS interface and scan the QR code OR
              input the FPS identifier.
            </Text>
            <Box>
              <Text>Name: HARVEST MISSION COMMUNITY CHURCH</Text>
              <Text>FPS ID: 167534304</Text>
              <Text>
                Transfer Remarks:{' '}
                <Box as="span">RIPPLE OUT: {'{Your full name}'}</Box>
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
    case 'Bank Transfer':
      return (
        <VStack spacing="3vh" fontWeight="bold">
          <Box py="1em">
            <Text>You may use the following information:</Text>
            <Text>
              Bank Name: China Construction Bank (Asia) Corporation Limited
            </Text>
            <Text>Bank Code: 009</Text>
            <Text>Branch Code: 845</Text>
            <Text>
              Account Name: Harvest Mission Community Church (Hong Kong) Limited
            </Text>
            <Text> Account Number: 013012090</Text>
            <Text>
              Transfer Remarks:{' '}
              <Box as="span">RIPPLE OUT: {'{Your full name}'}</Box>
            </Text>
          </Box>

          <Text>
            If our account name is too long and exceeds the number of permitted
            characters, you may shorten it as “Harvest Mission Community Church
            HK”.
          </Text>
          <Text>
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
        <Box fontWeight="bold">
          <Text>
            Kindly note that a portion of your giving will be deducted for
            online credit card transactions (3.5% + HKD $2.35 processing fee).
            If you wish for 100% of your contribution to go towards our church’s
            ministry work, please consider selecting “cover fees” on the giving
            site or give via cash or check.
          </Text>

          <Text>
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
          <Text>
            Please put in the note/memo box:{' '}
            <Box as="span">RIPPLE OUT: {'{Your full name}'}</Box>
          </Text>
        </Box>
      );
    case 'Cheque':
      return (
        <Box fontWeight="bold">
          <Text>All Checks should be made out to:</Text>
          <Text>“Harvest Mission Community Church (Hong Kong) Limited”</Text>
          <br />
          <Text>You may also mail your checks or donations to:</Text>
          <Text>P.O. Box 84282 HUNGHOM BAY POST OFFICE</Text>
        </Box>
      );
    default:
      return 'not detected';
  }
};

export const RippleOutGivingCard = (cardInfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={['100%', '100%', '32%']}
      borderRadius="lg"
      my={['0.6em', '0.6em', '0']}
      bgImage={cardInfo.imageLink}
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
                {cardInfo.text}
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
                        {cardInfo.text}
                      </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <RenderSwitch ModalSelection={cardInfo.text} />
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
export default RippleOutGivingCard;
