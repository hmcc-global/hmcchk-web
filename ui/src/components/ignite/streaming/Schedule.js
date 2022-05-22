import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { IgniteSchedule } from './IgniteSchedule';
import { DateTime } from 'luxon';

const DaySchedule = ({ whichDay, dateString, item }) => {
  const dateObj = DateTime.fromFormat(dateString, 'yyyy-MM-dd');
  const scheduleDate = dateObj.toFormat('dd');
  const scheduleDay = dateObj.toFormat('cccc');
  const whatDay = 'DAY ' + (whichDay + 1);

  const DayDateElement = () => {
    return (
      <Flex
        flexDirection="column"
        paddingY={[0, 4]}
        paddingLeft={[0, 4]}
        width="20%"
      >
        <Text
          fontSize={{ base: 16, md: 11, lg: 20 }}
          textAlign="left"
          color="white"
          textStyle="Rubik_bold"
        >
          {whatDay}
        </Text>
        <Text
          fontWeight="800"
          fontSize={{ base: 12, md: 9, lg: 12 }}
          marginTop={[-10, -1]}
          textAlign="left"
          color="white"
          textStyle="Rubik_bold"
        >
          {scheduleDay}
        </Text>
        <Text
          as="b"
          fontSize={{ base: 30, md: 25, lg: 35 }}
          marginTop="-10px"
          textAlign="left"
          color="white"
          textStyle="Rubik_bold"
        >
          {scheduleDate}
        </Text>
      </Flex>
    );
  };

  const EventItem = ({ title, time, backgroundColor, color, stroke }) => {
    return (
      <Box
        bg={backgroundColor !== '' ? backgroundColor : ''}
        marginBottom={4}
        border="2px solid"
        borderColor={stroke !== '' ? stroke : '#FF7461'}
      >
        <Flex flexDir="row" justifyContent="space-between">
          <Text
            as="b"
            padding={3}
            fontSize={{ base: 15, md: '0.8em', lg: '0.95em' }}
            fontWeight="700"
            textStyle="Rubik_bold"
            color={color !== '' ? color : '#FF7461'}
          >
            {title}
          </Text>
          <Text
            as="b"
            padding={3}
            fontSize={{ base: 15, md: '0.8em', lg: '0.95em' }}
            fontWeight="700"
            textStyle="Rubik_bold"
            color={color !== '' ? color : '#FF7461'}
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

export const Schedule = (props) => {
  const { ...properties } = props;
  return (
    <Container px={[4, 0]}>
      <Box
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
        {Object.keys(IgniteSchedule).map((schedule, i) => (
          <DaySchedule
            key={i}
            whichDay={i}
            dateString={schedule}
            item={IgniteSchedule[schedule]}
          />
        ))}
      </Box>
    </Container>
  );
};
