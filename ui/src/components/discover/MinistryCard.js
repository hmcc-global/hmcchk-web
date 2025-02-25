import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Link, 
  Text,
  Image

} from '@chakra-ui/react';


const cards = [
  {
    title: "University Students",
    description: "Reaching the college students in the university campuses of Hong Kong because we believe that college is a pivotal time for people to discover their God-given destiny.",
    image: `${process.env.PUBLIC_URL}/images/connect/undergrad.jpg`, 
    showButton: false, // Control whether the button is shown
  },
  {
    title: "Single Working Adults",
    description: "Creating an avenue for single working adults to fellowship and learn how to best exercise their God-given influence in their respective schools and workplaces.",
    image: `${process.env.PUBLIC_URL}/images/connect/undergrad.jpg`,
    showButton: false,
  },
  {
    title: "Married Couples and Families",
    description: "Bringing together Godly families that will love on and impact the next generation fo their families and city.",
    image: `${process.env.PUBLIC_URL}/images/connect/undergrad.jpg`,
    showButton: false,
  },
  {
    title: "Youth",
    description: "Reaching and training the youth of this generation to reach the world by starting from the centre, which is our relationship with Jesus Christ",
    image: `${process.env.PUBLIC_URL}/images/connect/undergrad.jpg`,
    showButton: false,
  },
  {
    title: "Children",
    description: "Building Blocks is HMCC’s Children Ministry.",
    image: `${process.env.PUBLIC_URL}/images/connect/undergrad.jpg`,
    showButton: true,
  },
];

const MinistryCard = (props) => {
  return (
    <Flex
      wrap="wrap" // Allow cards to wrap into multiple rows
      justify="center" // Center cards in each row
      gap={6} // Spacing between cards
      maxW="1200px" // Maximum width of the container
      mx="auto" // Center the container horizontally
      p={4} // Padding around the container
    >
      {cards.map((card, index) => (
        <Box
          key={index}
          flexBasis={["100%", "calc(33.333% - 16px)"]} // 1 card per row on mobile, 3 cards per row on desktop
          maxW={["100%", "calc(33.333% - 16px)"]} // Ensure cards don't exceed the width
          border={"1px solid #8C8C8C"}
          borderRadius="16px"
          textAlign="center"
          overflow="hidden"
        >
          <Image
            src={card.image}
            alt={card.title}
            width="100%"
            height="200px" // Adjust height as needed
            objectFit="cover" // Ensures the image covers the entire area
          />

          <Box p={4} pb={card.showButton ? 0 : 10}>
            <Text 
              mb={2}
              textAlign="left"
              fontFamily={"DMSerifDisplay_Italic"}
              fontSize={['1.4rem', '1.4rem', '1.5rem']}
            >
              {card.title}
            </Text>
            <Text
              textAlign="left"
              fontFamily={"Manrope"}
              fontSize={['0.85rem', '0.9rem', '0.95rem']}
            >{card.description}</Text>

          </Box>

          {card.showButton && ( // Only render the button if `showButton` is true
            <Box p={4}>
              <Button 
               bg={"#21A0A7"}
               borderRadius={"15px"}
               width="100%"
               textColor={"white"}
               fontFamily={"Manrope"}
               fontWeight={"bold"}
               letterSpacing={["2px","1px","2px"]}
               px={"30px"}
               py={"22px"}
               fontSize={['0.8rem', '0.6rem', '0.8rem']}

               >
                
               LEARN MORE →
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Flex>
  );
};

export default MinistryCard;
