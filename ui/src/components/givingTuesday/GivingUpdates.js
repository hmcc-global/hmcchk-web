import { Stack, Box, Text, Image, Center } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const CategoryCard = (props) => {
  const { iconLink, text, desc, givingValue, eventStatus } = props;
  return (
    <Stack
      borderWidth={1}
      borderRadius="2xl"
      borderColor="white"
      background="white"
      shadow="md"
      flex="1"
      display="flex"
      justifyContent="space-between"
      pb={1}
      pl={1}
      pr={1}
    >
      <Stack direction={['column']} p={[7, 10]} pt={[3, 7]} pb={[1, 5]}>
        <Stack>
          <Center mb={1} flex={1}>
            <Image h="2rem" src={iconLink} />
          </Center>
          <Stack
            spacing={0}
            flex={[4, 1]}
            fontWeight="700"
            fontSize={['1.2rem', '1.35rem']}
            textAlign="center"
            color="#74A0F1"
            verticalAlign="middle"
            justifyContent="center"
          >
            <Center>{text[0]}</Center>
            <Center>{text[1]}</Center>
          </Stack>
        </Stack>
        <Stack
          spacing={0}
          flex={[4, 1]}
          fontSize={['0.7rem', '1rem']}
          textAlign="center"
          color="#000000"
          verticalAlign="middle"
          justifyContent="center"
        >
          <Center>{desc[0]}</Center>
          <Center>{desc[1]}</Center>
        </Stack>
      </Stack>
      {eventStatus === 'after' && (
        <Center
          background="#F6B39E"
          borderColor="#F6B39E"
          borderWidth={1}
          borderRadius="xl"
          p={[2, 3]}
        >
          <Text fontWeight="700" fontSize={['1.1rem', '1.25rem']} color="white">
            HKD {givingValue}
          </Text>
        </Center>
      )}
    </Stack>
  );
};

const GivingUpdates = (props) => {
  const { accentColor, eventStatus, givingData } = props;

  const renderSwitch = () => {
    switch (eventStatus) {
      case 'after':
        return 'GIVING TUESDAY 2022 SUMMARY';
      case 'during':
        return 'GIVING LIVE UPDATES';
      default:
        return 'Giving Categories for Giving Tuesday 2022';
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const cardData = [
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/1-global.png',
      text: ['Our Global Church (GC)'],
      desc: ['Missionaries/missions movements,', 'churches outside of HK'],
      givingValue: givingData.categories[2].amount === -1 ? "-" : numberWithCommas(givingData.categories[2].amount),
    },
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/2-local.png',
      text: ['Our Local Church (LC)'],
      desc: ['Local church needs & church budget'],
      givingValue: givingData.categories[1].amount === -1 ? "-" : numberWithCommas(givingData.categories[1].amount),
    },
  ];
  const givingSum = givingData.categories[0].amount === -1 ? "-" : givingData.categories[0].amount;

  return (
    <Stack direction="column" spacing={5}>
      <Box pt={[3, 3]} pb={[1]} pl={[3, 38]} pr={[3, 38]} textAlign="center">
        <Text
          color={accentColor}
          fontWeight="900"
          fontSize={['1.4rem', '1.875rem']}
        >
          {renderSwitch()}
        </Text>
        {eventStatus !== 'after' && (
          <>
            <Text mt={3} fontSize={['0.7rem', 'md']}>
              Join us as we commit to spending <b>this coming Tuesday</b> to
              cultivate generous hearts and give towards the following causes or
              categories:
            </Text>
          </>
        )}
        {eventStatus !== 'before' && (
              <Text
                textAlign="right"
                color="#0628A3"
                fontSize={['0.5rem', 'sm']}
                fontStyle="italic"
              >
                *as of {DateTime.fromISO(givingData.updatedAt).toFormat('MMMM dd - hh:mm a')}
              </Text>
            )}
      </Box>
      {eventStatus !== 'before' && (
        <Stack
          direction={['column', 'row']}
          borderWidth={1}
          borderRadius="2xl"
          borderColor="#5891FB"
          background="#5891FB"
          color="white"
          shadow="md"
          fontSize={['1rem', '1.75rem']}
          fontWeight={700}
          display="flex"
          justifyContent="space-evenly"
          px={[5, 30]}
          py={5}
        >
          <Stack direction={['row', 'column']} flex={1}>
            <Text flex={1} textAlign={['left', 'center']} fontSize={['0.75rem','1.75rem']}>
              Total Amount Raised:
            </Text>
            <Text flex={1} textAlign={['right', 'center']}>
              HKD {numberWithCommas(givingSum)}
            </Text>
          </Stack>
          <Stack direction={['row', 'column']} flex={1}>
            <Text flex={1} textAlign={['left', 'center']} fontSize={['0.75rem','1.75rem']}>
              Number of Givers:
            </Text>
            <Text flex={1} textAlign={['right', 'center']}>
              {givingData.categories[0].givers === -1 ? "-" : givingData.categories[0].givers }
            </Text>
          </Stack>
        </Stack>
      )}

      <Stack direction={['column', 'row']} spacing={[2, 4]}>
        {cardData.map((card, i) => (
          <CategoryCard
            key={'event' + i}
            text={card.text}
            desc={card.desc}
            iconLink={card.iconLink}
            givingValue={card.givingValue}
            eventStatus={eventStatus}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default GivingUpdates;