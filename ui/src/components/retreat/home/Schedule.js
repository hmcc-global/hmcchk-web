import { Box, Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { RetreatSchedule } from './RetreatSchedule';
import { MdOutlineEvent } from 'react-icons/md';
import { Button, Icon } from '@chakra-ui/react';
import { DateTime } from 'luxon';

export const NextEvent = () => {
  const defaultText = 'Please refer to the schedule for next session!';
  const current = DateTime.local();
  const dateNow = current.toFormat('yyyy-MM-dd');

  const todaySchedule = RetreatSchedule[dateNow];
  if (!todaySchedule) return defaultText;

  const nextSession = todaySchedule.find((s) => {
    if (!s.title.includes('Session')) return false;
    const startTime = DateTime.fromISO(`${dateNow}T${s.startTime}`);
    const endTime = DateTime.fromISO(`${dateNow}T${s.endTime}`);

    if (startTime > current || endTime > current) return true;
    return false;
  });

  if (!nextSession) return defaultText;

  const startTime = DateTime.fromISO(`${dateNow}T${nextSession.startTime}`);
  const endTime = DateTime.fromISO(`${dateNow}T${nextSession.endTime}`);
  if (startTime > current)
    return `Next session is starting at ${nextSession.startTime}`;
  else if (endTime > current)
    return `${nextSession.title} IS STREAMING LIVE NOW`;
};

const DaySchedule = ({ whichDay, dateString, item }) => {
  const dateObj = DateTime.fromFormat(dateString, 'yyyy-MM-dd');
  const scheduleDate = dateObj.toFormat('dd');
  const scheduleDay = dateObj.toFormat('cccc');

  const DayDateElement = () => {
    return (
      <Flex
        flexDirection="column"
        paddingY={[0, 4]}
        paddingLeft={[0, 4]}
        width="20%"
      >
        <Text
          fontWeight="800"
          fontSize={{ base: 12, md: 9, lg: 12 }}
          textAlign="left"
        >
          {scheduleDay}
        </Text>
        <Text
          as="b"
          fontSize={{ base: 30, md: 25, lg: 35 }}
          marginTop="-10px"
          textAlign="left"
        >
          {scheduleDate}
        </Text>
      </Flex>
    );
  };

  const EventItem = ({ title, time, color, stroke }) => {
    return (
      <Box
        bg={color !== '' ? color : ''}
        borderRadius={8.54}
        marginBottom={4}
        border="2px solid"
        borderColor={stroke !== '' ? stroke : '#85CCD1'}
      >
        <Flex flexDir="row" justifyContent="space-between">
          <Text
            as="b"
            padding={3}
            fontSize={{ base: 15, md: '0.8em', lg: '0.95em' }}
            fontWeight="700"
            textStyle="sora-bolder"
          >
            {title}
          </Text>
          <Text
            as="b"
            padding={3}
            fontSize={{ base: 15, md: '0.8em', lg: '0.95em' }}
            fontWeight="700"
            textStyle="sora-bolder"
          >
            {time}
          </Text>
        </Flex>
      </Box>
    );
  };

  const ScheduleBox = () => {
    return (
      <Flex flexDir="column" px={[0, 4]} pt={[0, 4]} pb={0} width="80%">
        {item.map((event, i) => (
          <EventItem
            key={i}
            title={event.title}
            time={event.startTime}
            color={event.color}
            stroke={event.stroke}
          />
        ))}
      </Flex>
    );
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" justifyContent="space-between">
        <DayDateElement />
        <ScheduleBox />
      </Flex>

      {whichDay === 2 ? (
        <></>
      ) : (
        <Box
          bg="#FFDC82"
          marginRight={{ md: 2, lg: 4 }}
          marginLeft={{ md: 2, lg: 4 }}
          marginBottom={[4, 0]}
          h={3}
        >
          <br />
        </Box>
      )}
    </Flex>
  );
};

export const ScheduleHeader = (onClick) => {
  return (
    <Button
      borderRadius={17}
      bg="#FFFFFF"
      width="100%"
      height={['60%', '100%']}
      justifyContent={{ base: 'center', md: 'flex-start' }}
      {...onClick}
      _hover={{}}
    >
      <Icon
        as={MdOutlineEvent}
        paddingY={[0, 4]}
        mr={[2, 0]}
        fontSize={['1.75em', '4.5em']}
      />
      <Text
        paddingY={4}
        lineHeight="inherit"
        fontSize="1.8em"
        textStyle="sora-bolder"
        fontWeight="700"
        fontSize={['xl', '3xl']}
      >
        SCHEDULE
      </Text>
    </Button>
  );
};

export const Schedule = (props) => {
  const { withoutHeader, ...properties } = props;
  return (
    <Container px={[4, 0]}>
      <Box
        borderRadius={!withoutHeader ? 17 : 0}
        bg="rgba(255,255,255,0.8)"
        overflow="auto"
        css={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
        }}
        {...properties}
      >
        {!withoutHeader && <ScheduleHeader />}
        {Object.keys(RetreatSchedule).map((schedule, i) => (
          <DaySchedule
            key={i}
            whichDay={i}
            dateString={schedule}
            item={RetreatSchedule[schedule]}
          />
        ))}
      </Box>
    </Container>
  );
};
