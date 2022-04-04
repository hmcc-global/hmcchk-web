import {
  Box,
  Text,
} from '@chakra-ui/react';

const GoodFridaySchedule = () => {
  const rundown = [
    { name: "Opening Worship"},
    { name: "Sermon" },
    { name: "Offering"},
    { name: "Response Time"},
    { name: "Closing Worship"},
    { name: "Announcements"}
  ]

  return (
    <Box>
      <Box textAlign="center">
        <Text
          color="#935963"
          textStyle="NextSoutherlandSerif"
          fontSize={{ base: 'xl', md: '2xl' }}
          mb="1rem !important"
        >
          Good Friday Service
        </Text>
      </Box>
      {rundown.map((event) => (
        <Box bgColor="#F2D4DE18" p={5} borderRadius={15} borderColor="#935963" borderWidth={1} marginBottom={5}>
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

export default GoodFridaySchedule;
