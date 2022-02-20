import { Box, Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { RetreatSchedule } from './RetreatSchedule';
import { MdOutlineEvent } from 'react-icons/md';
import { Icon } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const DaySchedule = ({dateString, item}) => {
  const dateObj = DateTime.fromFormat(dateString, 'dd-MM-yyyy');
  const scheduleDate = dateObj.toFormat('dd');
  const scheduleDay = dateObj.toFormat('cccc');
  
  const DayDateElement = () => {
    return (
      <Flex flexDirection='column' padding={5} width='20%'>
        <Text fontWeight={800} fontSize={10} textAlign='left'>{scheduleDay}</Text>
        <Text as='b' fontSize={25} marginTop='-10px' textAlign='left'>{scheduleDate}</Text>
      </Flex>
    );
  }

  const EventItem = ({title, time, color}) => {
    return (
      <Box bg={(color !== '' ? color : '')} borderRadius={8.54} marginBottom={5} border='2px solid #85CCD1'>
        <Flex flexDir='row' justifyContent='space-between'>
          <Text as='b' padding={5}>{title}</Text>
          <Text as='b' padding={5}>{time}</Text>
        </Flex>
      </Box>
    )
  }

  const ScheduleBox = () => {
    return (
      <Flex flexDir='column' padding={5} width='80%'>
        {item.map((event, i) => (
          <EventItem key={i} title={event.title} time={event.startTime} color={event.color} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex flexDirection='column'>
      <Flex flexDirection='row' justifyContent='space-between'>
        <DayDateElement />
        <ScheduleBox />
      </Flex>
      <Box bg='#FFDC82' marginX={5} marginBottom={5}><br/></Box>
    </Flex>
  );
};

export const Schedule = (props) => {
  const ScheduleHeader = () => {
    return (
      <Box
        borderRadius={17}
        bg='#FFFFFF'
      >
        <Flex flexDir='row'>
          <Icon as={MdOutlineEvent} padding={5} fontSize={85} />
          <Heading as='h2' padding={5} lineHeight='inherit'> SCHEDULE </Heading>
        </Flex>
      </Box>
    )
  }

  return (
    <Container>
      <Box
        borderRadius={17}
        bg='rgba(255,255,255,0.8)'
        overflow='auto'
        css={{
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
        }}
        {...props}
      >
        <ScheduleHeader />
        {Object.keys(RetreatSchedule).map((schedule, i) => (
          <DaySchedule key={i} dateString={schedule} item={RetreatSchedule[schedule]}/>
        ))}
      </Box>
    </Container>
  )
};