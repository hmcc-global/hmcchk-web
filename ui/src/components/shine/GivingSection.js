import { useState } from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';
import { MAX } from 'uuid';

const RenderSwitch = ({ modalSelection }) => {
  switch (modalSelection) {
    case 'FPS':
      return (
        <Flex direction={['column', 'column', 'row']} gap={4}>
          <Stack flex={1}>
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
          <Image
            margin="auto"
            src={process.env.PUBLIC_URL + '/images/giving/FPSQR.png'}
            boxSize={['70%', '70%', '30%']}
          />
        </Flex>
      );
    case 'Bank Transfer':
      return (
        <VStack spacing="3vh" align="start">
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
            characters, you may shorten it as "Harvest Mission Community Church
            HK".
          </Text>
          <Text fontWeight="bold">
            Please email a copy of your transfer receipt along with your Full
            Name within 2 weeks to hk@hmccglobal.org.
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
            If you wish for 100% of your contribution to go towards our church's
            ministry work, please consider selecting "cover fees" on the giving
            site or give via cash or check.
          </Text>
          <Text fontWeight="bold">
            Click{' '}
            <Link
              style={{
                textDecoration: 'underline',
              }}
              href="https://give.tithe.ly/?formId=a24ffd31-6865-11ee-90fc-1260ab546d11"
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
            "Harvest Mission Community Church (Hong Kong) Limited"
          </Text>
          <br />
          <Text fontWeight="bold">
            You may also mail your checks or donations to:
          </Text>
          <Text fontWeight="bold">P.O. Box 84282 HUNGHOM BAY POST OFFICE</Text>
        </Box>
      );
    default:
      return 'not detected';
  }
};

const GivingSection = (props) => {
  const [activeTab, setActiveTab] = useState('giving');
  const [selectedCard, setSelectedCard] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const givingCards = [
    { text: 'FPS', img: '/images/giving/FPS.png' },
    { text: 'Online Giving', img: '/images/giving/Online.png' },
    { text: 'Bank Transfer', img: '/images/giving/Transfer.png' },
    { text: 'Cash', img: '/images/giving/Cash.png' },
    { text: 'Cheque', img: '/images/giving/Cheque.png' },
  ];

  const LearnMore = (cardText) => {
    setSelectedCard(cardText);
    onOpen();
  };

  const GivingContent = () => (
    <Box
      w={['100%', '100%', '100%']}
      borderRadius="lg"
      fontFamily="Manrope"
      bg="#FFFAED"
      pt={6}
    >
      <Heading
        as="h2"
        fontSize={{ base: 'sm', md: 'xl' }}
        paddingBottom="1vw"
        color="#000000"
        fontFamily="Manrope"
        letterSpacing={'0.12em'}
      >
        <Center>WAYS TO SPONSOR/GIVE:</Center>
      </Heading>

      <Box
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
        mb={8}
        py={2}
        sx={{
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#D9D9D9',
            borderRadius: '4px',
          },
        }}
        display={{ base: 'none', md: 'block' }}
      >
        <Flex
          display="inline-flex"
          gap={4}
          minWidth="min-content"
          alignItems="stretch"
          px={2}
        >
          {givingCards.map((card, index) => (
            <Box
              key={index}
              width={['160px', '180px', '200px']}
              height="180px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
              flexShrink={0}
              display="inline-flex"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage={`url(${card.img})`}
                backgroundSize="cover"
                backgroundPosition="center"
                filter="blur(4px)"
                opacity="0.5"
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                background="linear-gradient(to top, #ede2c0b3 0%, #dec58580 30%, transparent 70%)"
                zIndex="1"
              />

              <Box
                position="relative"
                zIndex="1"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
                textAlign="center"
              >
                <Text
                  fontFamily="Manrope"
                  fontWeight="bold"
                  fontSize={['md', 'lg', 'lg']}
                  color="black"
                  textShadow="0px 2px 4px #FFFFFF)"
                  mb={2}
                  whiteSpace="normal"
                >
                  {card.text}
                </Text>

                <Button
                  onClick={() => LearnMore(card.text)}
                  color="black"
                  fontFamily="Manrope"
                  fontWeight="medium"
                  fontSize="sm"
                  bg="transparent"
                  borderColor="black"
                  border="1px"
                  px={3}
                  py={1}
                  borderRadius="full"
                  _hover={{
                    bg: '#AA7B00',
                    color: 'white',
                    borderColor: '#AA7B00',
                    boxShadow: '0 0 6px 2px #FFFFFF',
                  }}
                  size="sm"
                  whiteSpace="nowrap"
                >
                  Learn more →
                </Button>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      <Box display={{ base: 'block', md: 'none' }}>
        <SimpleGrid columns={2} spacing={4} mb={4}>
          {givingCards.slice(0, 2).map((card, index) => (
            <Box
              key={index}
              width="100%"
              height="140px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage={`url(${card.img})`}
                backgroundSize="cover"
                backgroundPosition="center"
                filter="blur(4px)"
                opacity="0.5"
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                background="linear-gradient(to top, #ede2c0b3 0%, #dec58580 30%, transparent 70%)"
                zIndex="1"
              />

              <Box
                position="relative"
                zIndex="1"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Text
                  fontFamily="Manrope"
                  fontWeight="bold"
                  fontSize="md"
                  color="black"
                  textShadow="0px 2px 4px #FFFFFF)"
                  mb={2}
                  whiteSpace="normal"
                >
                  {card.text}
                </Text>

                <Button
                  onClick={() => LearnMore(card.text)}
                  color="black"
                  fontFamily="Manrope"
                  fontWeight="medium"
                  fontSize="sm"
                  bg="transparent"
                  borderColor="black"
                  border="1px"
                  px={3}
                  py={1}
                  borderRadius="full"
                  _hover={{
                    bg: '#AA7B00',
                    color: 'white',
                    borderColor: '#AA7B00',
                    boxShadow: '0 0 6px 2px #FFFFFF',
                  }}
                  size="sm"
                  whiteSpace="nowrap"
                >
                  Learn more →
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <SimpleGrid columns={2} spacing={4} mb={4}>
          {givingCards.slice(2, 4).map((card, index) => (
            <Box
              key={index + 2}
              width="100%"
              height="140px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage={`url(${card.img})`}
                backgroundSize="cover"
                backgroundPosition="center"
                filter="blur(4px)"
                opacity="0.5"
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                background="linear-gradient(to top, #ede2c0b3 0%, #dec58580 30%, transparent 70%)"
                zIndex="1"
              />

              <Box
                position="relative"
                zIndex="1"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Text
                  fontFamily="Manrope"
                  fontWeight="bold"
                  fontSize="md"
                  color="black"
                  textShadow="0px 2px 4px #FFFFFF)"
                  mb={2}
                  whiteSpace="normal"
                >
                  {card.text}
                </Text>

                <Button
                  onClick={() => LearnMore(card.text)}
                  color="black"
                  fontFamily="Manrope"
                  fontWeight="medium"
                  fontSize="sm"
                  bg="transparent"
                  borderColor="black"
                  border="1px"
                  px={3}
                  py={1}
                  borderRadius="full"
                  _hover={{
                    bg: '#AA7B00',
                    color: 'white',
                    borderColor: '#AA7B00',
                    boxShadow: '0 0 6px 2px #FFFFFF',
                  }}
                  size="sm"
                  whiteSpace="nowrap"
                >
                  Learn more →
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Flex justifyContent="center">
          <Box
            width="48%"
            height="140px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              backgroundImage={`url(${givingCards[4].img})`}
              backgroundSize="cover"
              backgroundPosition="center"
              filter="blur(4px)"
              opacity="0.5"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              background="linear-gradient(to top, #ede2c0b3 0%, #dec58580 30%, transparent 70%)"
              zIndex="1"
            />

            <Box
              position="relative"
              zIndex="1"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              textAlign="center"
            >
              <Text
                fontFamily="Manrope"
                fontWeight="bold"
                fontSize="md"
                color="black"
                textShadow="0px 2px 4px #FFFFFF)"
                mb={2}
                whiteSpace="normal"
              >
                {givingCards[4].text}
              </Text>

              <Button
                onClick={() => LearnMore(givingCards[4].text)}
                color="black"
                fontFamily="Manrope"
                fontWeight="medium"
                fontSize="sm"
                bg="transparent"
                borderColor="black"
                border="1px"
                px={3}
                py={1}
                borderRadius="full"
                _hover={{
                  bg: '#AA7B00',
                  color: 'white',
                  borderColor: '#AA7B00',
                  boxShadow: '0 0 6px 2px #FFFFFF',
                }}
                size="sm"
                whiteSpace="nowrap"
              >
                Learn more →
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box paddingTop="2vh">
        <Text fontSize={{ base: '0.75rem', md: 'md' }}>
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team.
        </Text>
      </Box>
      <Box paddingTop="2vh">
        <Text fontSize={{ base: '0.75rem', md: 'md' }}>
          If you have any questions, please do not hesitate to contact us:&nbsp;
          <Text
            as="span"
            fontWeight="bold"
            fontSize={{ base: '0.75rem', md: 'md' }}
          >
            hk@hmccglobal.org
          </Text>
        </Text>
      </Box>

      <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h2" size="xl" fontWeight="bold" fontFamily="Manrope">
              {selectedCard}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Manrope" pb={8}>
            {selectedCard && <RenderSwitch modalSelection={selectedCard} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );

  const PrayerRequestContent = () => (
    <Box fontFamily="Manrope" pt={6}>
      <Heading
        as="h2"
        fontSize={{ base: 'sm', md: 'xl' }}
        mb={{ base: 0, md: 12 }}
        color="#000000"
        fontFamily="Manrope"
        fontWeight="bold"
        letterSpacing="0.12em"
        textAlign="center"
      >
        HERE'S OUR PRAYER REQUEST:
      </Heading>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 0, md: 8 }}
        position="relative"
      >
        <Box
          position="absolute"
          left="33.33%"
          top="0"
          bottom="0"
          width="1px"
          bg="black"
          display={{ base: 'none', md: 'block' }}
        />
        <Box
          position="absolute"
          left="66.66%"
          top="0"
          bottom="0"
          width="1px"
          bg="black"
          display={{ base: 'none', md: 'block' }}
        />

        <VStack spacing={6} align="center" p={4} flex={1}>
          <Box
            width="80px"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/images/shine/EngageIcon.png"
              alt="Engage Icon"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
          <Heading
            as="h3"
            size="md"
            color="#000000"
            fontFamily="Manrope"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
          >
            ENGAGE
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.700"
            textAlign="center"
            lineHeight="tall"
          >
            Engage with the needy by loving the city through different existing
            initiatives and activities.
          </Text>
        </VStack>

        <VStack spacing={6} align="center" p={4} flex={1}>
          <Box
            width="80px"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/images/shine/EmpowerIcon.png"
              alt="Empower Icon"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
          <Heading
            as="h3"
            size="md"
            color="#000000"
            fontFamily="Manrope"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
          >
            EMPOWER
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.700"
            textAlign="center"
            lineHeight="tall"
          >
            Empower churches and ministries by providing participants a platform
            to serve the city together.
          </Text>
        </VStack>

        <VStack spacing={6} align="center" p={4} flex={1}>
          <Box
            width="80px"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/images/shine/ExhibitIcon.png"
              alt="Exhibit Icon"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
          <Heading
            as="h3"
            size="md"
            color="#000000"
            fontFamily="Manrope"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
          >
            EXHIBIT
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.700"
            textAlign="center"
            lineHeight="tall"
          >
            Exhibit God's work by serving and caring for the unreached through
            CityServe.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );

  return (
    <Box width="100%" py={8}>
      <Text
        color="black"
        mb={{ base: 6, md: 8 }}
        fontFamily="Manrope, sans-serif"
        fontWeight="400"
        fontStyle="normal"
        fontSize={{ base: '16px', md: '20px' }}
        lineHeight="100%"
        letterSpacing="0px"
        textAlign={{ base: 'left', md: 'left' }}
      >
        Here's our future opportunities that you can participate in
      </Text>
      <Box bg="#FFFAED" p={6} borderRadius="3xl" mb={10}>
        <Flex bg="white" borderRadius="20px" p={3} gap={2} position="relative">
          <Button
            bg={activeTab === 'giving' ? '#EBAC09' : 'white'}
            variant="unstyled"
            flex={1}
            px={6}
            py={6}
            fontWeight="bold"
            fontFamily="Manrope"
            color={activeTab === 'giving' ? '#FFFFFF' : 'black'}
            borderRadius="20px"
            border="1px solid"
            borderColor="gray.200"
            display="flex"
            onClick={() => setActiveTab('giving')}
            fontSize={{ base: '0.8rem', md: 'xl' }}
          >
            SPONSOR/GIVE
          </Button>

          <Button
            variant="unstyled"
            flex={1}
            px={6}
            py={6}
            fontSize={{ base: '0.8rem', md: 'xl' }}
            fontWeight="bold"
            fontFamily="Manrope"
            bg={activeTab === 'prayer' ? '#EBAC09' : 'white'}
            color={activeTab === 'prayer' ? '#FFFFFF' : 'black'}
            borderRadius="20px"
            border="1px solid"
            borderColor="gray.200"
            display="flex"
            onClick={() => setActiveTab('prayer')}
          >
            PRAYER REQUEST
          </Button>
        </Flex>

        {activeTab === 'giving' ? <GivingContent /> : <PrayerRequestContent />}
      </Box>
    </Box>
  );
};

export default GivingSection;
