import {
  Box,
  Text,
} from '@chakra-ui/react';

const EasterSchedule = () => {
  const rundown = [
    { name: "Opening Worship" },
    { name: "Announcements" },
    { name: "Offering" },
    {
      name: "Special Praise",
      content:
        <Box marginLeft={5} marginTop={2}>
          <Text
            color="black"
            fontSize="sm"
            textStyle="Quicksand"
          >
            BENEATH THE WATERS
          </Text>
          <Text
            color="black"
            fontSize="sm"
            textStyle="Quicksand"
          >
            BECAUSE HE LIVES
          </Text>
      </Box>
    },
    { name: "Sermon" },
    { name: "Response Time" },
    { name: "Closing Worship" }
  ]

  return (
    <Box paddingBottom={2}>
      <Box textAlign="center">
        <Text
          color="#538EC7"
          textStyle="NextSoutherlandSerif"
          fontSize={{ base: 'xl', md: '2xl' }}
          mb="1rem !important"
        >
          Easter Celebration
        </Text>
      </Box>
      {rundown.map((event) => (
        <Box bgColor="#F4FAFF" p={5} borderRadius={15} borderColor="#558EC5" borderWidth={1} marginBottom={5}>
          <Text
            color="black"
            fontSize="sm"
            textStyle="NextSoutherlandSerif"
          >
            {event.name}
          </Text>
          {event.content}
        </Box>
      ))}
    </Box>
  )
}

export default EasterSchedule;
