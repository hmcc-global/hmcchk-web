import { Stack, Box, Text, Image, Center } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const CategoryCard = (props) => {
  const { iconLink, text, desc, givingValue, eventStatus } = props;
  return (
    <Stack
      flex="1"
      display="flex"
      justifyContent="space-between"
      pb={1}
      pl={1}
      pr={1}
    >
      <Stack
        spacing={3}
        direction={['column']}
        p={[7, 10]}
        pt={[3, 7]}
        pb={[1, 5]}
      >
        <Stack>
          <Stack
            spacing={0}
            flex={[4, 1]}
            fontWeight="700"
            fontSize={['1.2rem', '35']}
            textAlign="center"
            color="#183B5D"
            verticalAlign="middle"
            justifyContent="center"
            fontFamily="DMserifText"
          >
            <Center>{text[0]}</Center>
            <Center>{text[1]}</Center>
          </Stack>
        </Stack>
        <Center flex={1}>
          <Image h="7rem" src={iconLink} />
        </Center>
        <Stack
          spacing={0}
          flex={[4, 1]}
          fontSize={['14', '20']}
          textAlign="center"
          color="#000000"
          verticalAlign="middle"
          justifyContent="center"
          fontFamily="Manrope"
        >
          <Center>{desc[0]}</Center>
          <Center>{desc[1]}</Center>
        </Stack>
      </Stack>
      {(eventStatus === 'after' || eventStatus === 'during') && (
        <Box>
          <Center
            background="#DFE7FF"
            borderColor="#DFE7FF"
            borderWidth={1}
            borderRadius="xl"
            w="50%"
            mx="auto"
            p={[2, 3]}
          >
            <Text
              fontWeight="700"
              fontSize={['30']}
              fontFamily="DMSerifText"
              color="#183B5D"
            >
              {givingValue}
            </Text>
          </Center>
        </Box>
      )}
    </Stack>
  );
};

const GivingUpdates = (props) => {
  const { accentColor, eventStatus, givingData } = props;

  const renderSwitch = () => {
    switch (eventStatus) {
      case 'after':
        return 'Giving Tuesday 2025 summary';
      case 'during':
        return 'Giving Live Updates';
      default:
        return 'Giving Categories for Giving Tuesday 2025';
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const cardData = [
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/locally.png',
      text: ['Impact Locally'],
      desc: [
        'Local Needs (CityServe, Tao Po Fire Relief, Shine),',
        'HMCC 2nd Site',
      ],
      givingValue:
        givingData.categories[0].amount === -1
          ? '-'
          : numberWithCommas(givingData.categories[0].amount),
    },
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/globally.png',
      text: ['Impact Globally'],
      desc: ['Harvest Mission Global 10-Year Commitment'],
      givingValue:
        givingData.categories[1].amount === -1
          ? '-'
          : numberWithCommas(givingData.categories[1].amount),
    },
  ];
  const givingSum =
    givingData.categories[3].amount === -1
      ? '-'
      : givingData.categories[3].amount;

  return (
    <Stack direction="column" spacing={5}>
      <Box pt={[3, 3]} pb={[1]}>
        <Text
          color={accentColor}
          fontWeight="900"
          fontSize={['26', '40']}
          fontFamily="DMserifText"
        >
          {renderSwitch()}
        </Text>
        {eventStatus === 'before' && (
          <>
            <Text mt={3} fontSize={['14', '20']} fontFamily="Manrope">
              Join us as we commit to spending{' '}
              <Text as="b" color="#C14C44">
                this coming Tuesday
              </Text>{' '}
              to cultivate generous hearts and give towards the following causes
              or categories:
            </Text>
          </>
        )}
        {eventStatus === 'during' && (
          <>
            <Text mt={3} fontSize={['14', '20']} fontFamily="Manrope">
              <Text as="b" color="red">
                Join us as we commit to cultivate generous hearts and give
                toward the following causes or categories:
              </Text>
            </Text>
            <Text fontSize={['14', '20']} fontFamily="Manrope" fontWeight={400}>
              Numbers will be updated at 10:00, 14:00, 19:00, 22:00, 00:30
            </Text>
          </>
        )}
      </Box>
      {eventStatus !== 'before' && (
        <Box>
          <Text
            textAlign="right"
            color="#6C7E97"
            fontSize={['0.7rem', 'sm']}
            fontStyle="italic"
            mb={2}
          >
            *as of{' '}
            {DateTime.fromISO(givingData.updatedAt).toFormat(
              'MMMM dd - hh:mm a'
            )}
          </Text>
          <Stack
            direction={['column', 'row']}
            borderWidth={1}
            borderRadius="2xl"
            borderColor="#DFE7FF"
            background="#DFE7FF"
            color="white"
            shadow="md"
            fontSize={['1rem', '1.75rem']}
            fontWeight={700}
            display="flex"
            justifyContent="space-evenly"
            px={[5, 30]}
            py={5}
          >
            <Stack direction={['column', 'column']} flex={1}>
              <Text
                flex={1}
                textAlign={['center', 'center']}
                fontSize={['14', '30']}
                fontFamily="DMSerifText"
                color="#183B5D"
              >
                Total Amount Raised:
              </Text>
              <Text
                flex={1}
                textAlign={['center', 'center']}
                fontFamily="DMserifText"
                fontSize={['30', '45']}
                color="#183B5D"
              >
                {numberWithCommas(givingSum)}
              </Text>
            </Stack>
            <Box
              display={{ base: 'none', md: 'flex' }}
              width="1px"
              background="#183B5D"
            ></Box>
            <Box
              display={{ base: 'flex', md: 'none' }}
              height="1px"
              background="#183B5D"
            ></Box>
            <Stack direction={['column', 'column']} flex={1}>
              <Text
                flex={1}
                textAlign={['center', 'center']}
                fontSize={['14', '30']}
                fontFamily="DMSerifText"
                color="#183B5D"
              >
                Number of Givers:
              </Text>
              <Text
                flex={1}
                textAlign={['center', 'center']}
                fontFamily="DMserifText"
                fontSize={['30', '45']}
                color="#183B5D"
              >
                {givingData.categories[3].givers === -1
                  ? '-'
                  : givingData.categories[3].givers}
              </Text>
            </Stack>
          </Stack>
        </Box>
      )}

      <Stack direction={['column', 'row']} spacing={[2, 4]}>
        {cardData.map((card, i) => (
          <>
            <CategoryCard
              key={'event' + i}
              text={card.text}
              desc={card.desc}
              iconLink={card.iconLink}
              givingValue={card.givingValue}
              eventStatus={eventStatus}
            />
            {i < cardData.length - 1 && (
              <Box
                display={{ base: 'none', md: 'flex' }}
                height={{ base: '1px', md: 'auto' }}
                width={{ base: 'auto', md: '1px' }}
                background="#183B5D"
                alignSelf="stretch"
              />
            )}
          </>
        ))}
      </Stack>
    </Stack>
  );
};

export default GivingUpdates;
