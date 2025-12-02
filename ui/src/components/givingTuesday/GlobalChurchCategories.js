import { Stack, Box, Text, Image, Center, Link } from '@chakra-ui/react';

const CategoryCard = (props) => {
  const { iconLink, text, desc, orglink } = props;
  return (
    <Stack
      borderWidth={1}
      borderRadius={{ base: '10px', md: '14px' }}
      borderColor="#CCDEFF"
      background="#CCDEFF"
      flex="1"
      display="flex"
      justifyContent="center"
      p={1}
    >
      <Stack
        direction={{ base: 'row', md: 'column' }}
        p={[1, 2]}
        pt={[1.5, 3.5]}
        pb={[1, 2]}
      >
        <Stack flex={3}>
          <Center mb={1} flex={1}>
            <Image h={{ md: '90%' }} src={iconLink} />
          </Center>
        </Stack>
        <Stack direction="column" flex={7}>
          <Stack
            spacing={0}
            flex={[4, 1]}
            fontWeight="700"
            fontSize={['0.7rem', '1rem']}
            textAlign="center"
            color="black"
            verticalAlign="middle"
            justifyContent="center"
          >
            <Center>{text[0]}</Center>
            <Center>{text[1]}</Center>
          </Stack>

          <Stack
            spacing={0}
            flex={[4, 1]}
            fontSize={['0.5rem', '0.8rem']}
            textAlign="center"
            color="#000000"
            verticalAlign="middle"
            justifyContent="center"
          >
            <Center>{desc[0]}</Center>
            <Center>{desc[1]}</Center>
          </Stack>
          <Stack
            spacing={0}
            flex={[4, 1]}
            fontWeight="500"
            fontStyle={'italic'}
            textDecoration={'underline'}
            fontSize={['0.5rem', '0.8rem']}
            textAlign="center"
            color="#000000"
            verticalAlign="middle"
            justifyContent="center"
          >
            <Link target="_blank" href={`https://${orglink}`}>
              {orglink}
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const GlobalChurchCategories = () => {
  const cardData = [
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/Arise-logo.png',
      text: ['Arise Asia Student Missions Conference'],
      desc: [
        "The first student missions conference of its kind here in Asia. Calling students from 48 different nations to lay down their lives to reach 60% of the world's population. ",
      ],
    },
    {
      iconLink:
        process.env.PUBLIC_URL + '/images/givingTuesday/Movement-logo.png',
      text: ['Movement Day'],
      desc: [
        'The organization spearheading unity across churches, non-profits, the marketplace and government to work together for gospel transformation in urban centers. We are trying to bring an Asian Movement Day expression to Hong Kong in October 2023. ',
      ],
      orglink: ['www.movementday.asia'],
    },
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/NXT-logo.png',
      text: ['NXT Move Global'],
      desc: [
        'A movement dedicated to reaching the next generation in order to change the trajectory of Christianity. They will host global and regional gatherings across the 10 regions of the world to raise up and empower young leaders.',
      ],
      orglink: ['www.nxtmove.global'],
    },
    {
      iconLink: process.env.PUBLIC_URL + '/images/givingTuesday/CPX-logo.png',
      text: ['CPX (Church Planting and Multiplication)'],
      desc: [
        "A community of church planting practitioners who are focused on multiplying and equipping hundreds and thousands of church planters through webinars and conferences across Asia's largest mission fields.",
      ],
      orglink: ['www.asia2020congress.org'],
    },
  ];

  return (
    <Stack direction="column" spacing={5}>
      <Box
        pt={[0.1, 0.1]}
        pb={[0.2]}
        pl={[3, 38]}
        pr={[3, 38]}
        textAlign="center"
      >
        <Text
          color="#6985B8"
          mt={3}
          fontWeight={600}
          fontSize={['0.7rem', 'md']}
        >
          Learn about the organizations and movements we will be giving towards
          the Global Church:
        </Text>
      </Box>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={[2, 4]}>
        {cardData.map((card, i) => (
          <CategoryCard
            key={'event' + i}
            text={card.text}
            desc={card.desc}
            iconLink={card.iconLink}
            orglink={card.orglink}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default GlobalChurchCategories;
