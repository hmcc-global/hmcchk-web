import {
  Box,
  Heading,
  Stack,
  VStack,
  Text,
  HStack,
  Image,
  keyframes,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

// Map Marker Animation Definition
const pulse = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(0.75);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(246, 184, 14, 0.7);
  }
  70% {
    transform: translate(-50%, -50%) scale(1.25);
    box-shadow: 0 0 0 15px rgba(246, 184, 14, 0);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.75);
    box-shadow: 0 0 0 0 rgba(246, 184, 14, 0);
  }
`;

// Reusable Components
const MissionsMonthTheme = ({ image, year, text }) => (
  <VStack h="100%" px={{ md: 1, lg: 2 }} py={3}>
    <Box
      w="100%"
      h="5em"
      bgImage={image}
      bgPos="center"
      bgSize="contain"
      bgRepeat="no-repeat"
    />
    <Text
      color="black"
      fontWeight={600}
      textAlign="center"
      px={{ base: 5, sm: 4, md: 7, lg: 7 }}
      fontSize={{ base: '1rem', lg: '1.25rem' }}
    >
      {year}
    </Text>
    <Text
      color="black"
      fontFamily="Manrope"
      fontWeight={400}
      textAlign="center"
      fontSize={{ base: '0.875rem', lg: '1.125rem' }}
    >
      {text}
    </Text>
  </VStack>
);

const SectionHeader = ({ title, color = 'black', id }) => (
  <Heading
    w="100%"
    textAlign={{ base: 'justify', md: 'left' }}
    color={color}
    fontSize={'2.25rem'}
    fontWeight={400}
    fontFamily="DMSerifDisplay_Italic"
    id={id}
  >
    {title}
  </Heading>
);

const SubsectionTitle = ({ title, color }) => (
  <Heading
    w="100%"
    textAlign={{ base: 'justify', md: 'left' }}
    fontFamily="Manrope"
    textTransform="uppercase"
    textColor={color}
    fontSize={{ base: '1rem', lg: '1.25rem' }}
    fontWeight={700}
    letterSpacing="0.25rem"
  >
    {title}
  </Heading>
);

const MissionalInitiativeTitle = ({ title, color }) => (
  <Box w="fit-content" bg="white" borderRadius="0.75rem" p="0.5rem 0.75rem">
    <Text
      textAlign="center"
      textTransform="uppercase"
      fontSize={{ base: '0.875rem', lg: '1.125rem' }}
      fontWeight={700}
      color={color}
      lineHeight="103%"
      letterSpacing="0.25rem"
    >
      {title}
    </Text>
  </Box>
);

const DestinationChip = ({ country, isSelected, onClick }) => (
  <Box
    w="fit-content"
    bgColor={isSelected ? '#F6B80E' : '#FFFFFF'}
    borderRadius="0.75rem"
    border="1px solid #F6B80E"
    p={{ base: '0.5rem 0.75rem', lg: '0.75rem 1rem' }}
    onClick={onClick}
    cursor="pointer"
    display={'flex'}
    flexDir={'row'}
    gap={'0.5rem'}
  >
    <Image
      src={'/images/about/flag-' + country.toLowerCase() + '.svg'}
      alt={`${country} flag`}
      width="20px"
      height="auto"
    />
    <Text
      textAlign="center"
      textTransform="uppercase"
      fontSize={{ base: '0.75rem', lg: '1.125rem' }}
      fontWeight={700}
      color={isSelected ? '#FFFFFF' : '#F6B80E'}
      lineHeight="103%"
      letterSpacing="0.25rem"
    >
      {country}
    </Text>
  </Box>
);

const MapMarker = ({ x, y, label, onClick, isSelected }) => {
  const animation = `${pulse} 2s infinite`;

  return (
    <Box position="absolute" left={x} top={y} transform="translate(-50%, -50%)">
      {/* Marker Tooltips */}
      <Box
        position="absolute"
        top="125%"
        left="0%"
        transform="translateX(-50%)"
        bg="#F6B80F"
        color="#FFFFFF"
        borderRadius="1rem"
        py="0.25rem"
        px="0.75rem"
        boxShadow="md"
        zIndex={10}
        textAlign="center"
        fontFamily="Manrope"
        fontSize="0.75rem"
        fontWeight={800}
        textTransform="uppercase"
        letterSpacing="0.125rem"
        minWidth="max-content"
        whiteSpace="nowrap"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '8px',
          borderStyle: 'solid',
          borderColor: 'transparent transparent #F6B80F transparent',
        }}
        display={{ base: 'none', lg: 'flex' }}
      >
        <HStack spacing={2} alignItems="center">
          <Image
            src={'/images/about/flag-' + label.toLowerCase() + '.svg'}
            alt={`${label} flag`}
            width="20px"
            height="auto"
          />
          <Text>{label}</Text>
        </HStack>
      </Box>

      {/* Marker */}
      <Box
        position="relative"
        width={{ base: '10px', lg: '20px' }}
        height={{ base: '10px', lg: '20px' }}
        borderRadius="full"
        bg="#F6B80E"
        cursor="pointer"
        animation={{ base: isSelected ? animation : 'none', lg: animation }}
        onClick={onClick}
        _hover={{
          transform: 'scale(1.1)',
          boxShadow: '0 0 0 15px rgba(246, 184, 14, 0.15)',
          transition: 'all 0.3s ease-in-out',
        }}
      />
    </Box>
  );
};

const MapWithMarkers = ({
  destinations,
  selectedDestination,
  onMarkerClick,
}) => {
  return (
    <Box position="relative" width="100%" maxWidth="800px">
      <Box position="relative">
        <Image
          src="/images/about/missions-map.svg"
          alt="World Map"
          width="100%"
        />
        {destinations.map((destination, index) => (
          <MapMarker
            key={destination.name}
            x={destination.x}
            y={destination.y}
            label={destination.name}
            onClick={() => onMarkerClick(index)}
            isSelected={index === selectedDestination ? true : false}
          />
        ))}
      </Box>
    </Box>
  );
};

const MissionSection = ({ title, blurb }) => {
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const missionPictures = [
    { image: '/images/about/send_me.svg', year: '2016', text: 'Send me' },
    {
      image: '/images/about/transformasphere.svg',
      year: '2017',
      text: 'Transformasphere',
    },
    {
      image: '/images/about/chosen_gen.svg',
      year: '2018',
      text: 'Chosen Generation',
    },
    { image: '/images/about/just_one.svg', year: '2019', text: 'Just One' },
    {
      image: '/images/about/upside_down.svg',
      year: '2020',
      text: 'Upside Down',
    },
    {
      image: '/images/about/living_edge.png',
      year: '2021',
      text: 'Living on the Edge',
    },
    {
      image: '/images/about/no_other_name.svg',
      year: '2022',
      text: 'No Other Name',
    },
    {
      image: '/images/about/to_the_ends_of_the_earth.svg',
      year: '2023',
      text: 'To the Ends of the Earth',
    },
  ];

  const missionDestinations = [
    {
      x: '62.5%',
      y: '35%',
      name: 'China',
      details: 'Enter details about China missions trip.',
    },
    {
      x: '85%',
      y: '32%',
      name: 'Japan',
      details: 'Enter details about Japan missions trip.',
    },
    {
      x: '56%',
      y: '56%',
      name: 'Myanmar',
      details: 'Enter details about Myanmar missions trip.',
    },
    {
      x: '46%',
      y: '48%',
      name: 'Nepal',
      details: 'Enter details about Nepal missions trip.',
    },
    {
      x: '59%',
      y: '73%',
      name: 'Thailand',
      details: 'Enter details about Thailand missions trip.',
    },
  ];

  const handleDestinationClick = (idx) => {
    setSelectedDestination(idx);
    setSelectedMarker(idx);
    setIsModalOpen(true);
  };

  return (
    <VStack maxW="100%" justifyContent="space-around" gap="1rem" p={0}>
      <SectionHeader title={title} id="our-heart-for-missions" />
      <Box
        borderRadius="0.5rem"
        border="1px solid #97D0D4"
        p={{
          base: '1rem 0.875rem',
          md: '1.125rem 1rem',
          lg: '1.5rem 1.375rem',
        }}
      >
        <Text
          textAlign={{ base: 'justify', md: 'left' }}
          fontFamily="Manrope"
          fontSize={{ base: '0.875rem', lg: '1.125rem' }}
          fontWeight={400}
          color="#0C0C20"
        >
          {blurb.blurb[1]}
        </Text>
      </Box>

      {/* Harvest Mission International (HMI) */}
      <VStack
        w="100%"
        bgColor="#FFFFFF"
        p={{
          base: '1rem 0.875rem',
          md: '1.125rem 1rem',
          lg: '1.5rem 1.375rem',
        }}
        borderRadius="0.75rem"
        gap="0.5rem"
      >
        <SubsectionTitle title={blurb.title[2]} color="#4A6EEB" />
        <Text
          w="100%"
          textAlign={{ base: 'justify', md: 'left' }}
          fontSize={{ base: '0.875rem', lg: '1.125rem' }}
          fontWeight={400}
        >
          {blurb.blurb[2]}
        </Text>
      </VStack>

      {/* Missional Initiatives */}
      <VStack
        w="100%"
        p={{
          base: '1rem 0.875rem',
          md: '1.125rem 1rem',
          lg: '1.5rem 1.375rem',
        }}
        gap={{ base: '0.75rem', md: '1.25rem' }}
        fontFamily="Manrope"
      >
        <SubsectionTitle title={blurb.title[3]} color="#4A6EEB" />
        {/* Missions Month */}
        <VStack w="100%" alignItems="center">
          <MissionalInitiativeTitle title={blurb.heading[1]} color="#97D0D4" />
          <Text
            w="100%"
            textAlign={{ base: 'justify', md: 'left' }}
            fontSize={{ base: '0.875rem', lg: '1.125rem' }}
            fontWeight={400}
            whiteSpace="pre-line"
          >
            {`${blurb.blurb[3]}\n\n${blurb.blurb[4]}`}
          </Text>
        </VStack>
        {/* Missions Month Themes */}
        <Stack
          maxW="100%"
          direction="row"
          bgColor="#F3F3F3"
          flexWrap="wrap"
          justifyContent={{ base: 'space-evenly', lg: 'center' }}
          p={{ base: 0, lg: '1rem' }}
          display={{ base: 'none', sm: 'flex' }}
        >
          {missionPictures.map((pic) => (
            <MissionsMonthTheme key={pic.year} {...pic} />
          ))}
        </Stack>
        <VStack display={{ sm: 'flex', md: 'none' }} w="100%">
          <HStack w="100%" justify="space-around">
            {missionPictures.slice(0, 4).map((pic) => (
              <MissionsMonthTheme key={pic.year} {...pic} />
            ))}
          </HStack>
          <HStack w="100%" justify="space-around">
            {missionPictures.slice(4).map((pic) => (
              <MissionsMonthTheme key={pic.year} {...pic} />
            ))}
          </HStack>
        </VStack>
        {/* !gnite Conference */}
        <VStack w="100%" gap={{ base: '0.75rem', md: '1.25rem' }}>
          <MissionalInitiativeTitle title={blurb.heading[2]} color="#F2A9A7" />
          <Text
            w="100%"
            textAlign={{ base: 'justify', md: 'left' }}
            fontSize={{ base: '0.875rem', lg: '1.125rem' }}
            fontWeight={400}
            whiteSpace="pre-line"
          >
            {blurb.blurb[5]} <strong>{blurb.blurb[5.5]}</strong>
            {'\n\n'}
            <strong>{blurb.blurb[6]}</strong>
            {'\n'}
            {blurb.blurb[7]}
            {'\n\n'}
            {blurb.blurb[8]} <strong>{blurb.blurb[8.5]}</strong>
            {'\n\n'}
            {blurb.blurb[9]}
          </Text>
        </VStack>

        {/* Our Missions Projects */}
        <VStack w="100%" gap={{ base: '0.75rem', md: '1.25rem' }}>
          <MissionalInitiativeTitle title={blurb.heading[3]} color="#EBBB41" />
          <Text
            w="100%"
            textAlign={{ base: 'justify', md: 'left' }}
            fontSize={{ base: '0.875rem', lg: '1.125rem' }}
            fontWeight={400}
            whiteSpace="pre-line"
          >
            {`${blurb.blurb[10]}\n\n${blurb.blurb[11]}`}
          </Text>

          <Box
            w="100%"
            display={{ base: 'flex', lg: 'none' }}
            flexWrap="wrap"
            justifyContent={{ base: 'center', md: 'flex-start' }}
            gap={{ base: '0.75rem', lg: '1rem' }}
          >
            {missionDestinations.map((destination, index) => (
              <DestinationChip
                country={destination.name}
                isSelected={index === selectedDestination}
                minW={{ base: '100px', md: 'auto' }}
                onClick={() => handleDestinationClick(index)}
              />
            ))}
          </Box>

          <MapWithMarkers
            destinations={missionDestinations}
            selectedDestination={selectedDestination}
            onMarkerClick={handleDestinationClick}
          />
        </VStack>
      </VStack>
      {/* Mission Destination Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          bg="rgba(255, 245, 217, 0.77)"
          color="black"
          border="none"
          borderRadius="0.625rem"
        >
          <ModalCloseButton />
          <ModalHeader fontWeight="bold" p={'1rem 1rem 0rem 1rem'}>
            {selectedMarker !== null &&
              missionDestinations[selectedMarker]?.name}
          </ModalHeader>
          <ModalBody p={'1rem'}>
            <Text fontSize="sm">
              {missionDestinations[selectedMarker]?.details}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MissionSection;
