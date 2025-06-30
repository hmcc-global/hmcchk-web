import React from 'react';
import { Box } from '@chakra-ui/react';
import CustomValuesAccordion from './CustomValuesAccordion';

const ConnectMinistryFaq = () => {
  const borderColor = '#4A6EEB';
  const buttonColor = '#DFE7FF';

  const Data = [
    {
      title:
        "S- SPIRIT-LED MINISTRY",
      content: `To be connected with God and anointed by His Spirit, in order to hear His direction and step out in faith to minister to His people with His power.`,
    },
    {
      title:
        "L- LEADERSHIP DEVELOPMENT",
      content: `To develop people to their full potential and in Christ-like character in order to impact their spheres of influence and increase the spread of the Gospel to future generations.`,
    },
    {
      title:
        "T- TRANSCULTURALISM",
      content: `To make the decision to go through discomforts and difficulties, in order to develop understanding and delight in people from a different culture.`,
    },
    {
      title:
        "C- COMMUNITY",
      content: `To willingly come together as a diverse group of people to experience and live out the Gospel, in order to fulfill God’s purposes.`,
    },
    {
      title:
        "M- MINISTRY INSIDE AND OUTSIDE",
      content: `To be a visible display and viable demonstration of God's Kingdom by stewarding our God-given spiritual gift(s), resources and experiences to build God’s Church and transform the world.`,
    },
    {
      title:
        "M- MISSIONS THROUGH CHURCH PLANTING",
      content: `To obey and fulfill the Great Commission through the local church, which God has established so that we can be witnesses and servants of His redemptive purpose.`,
    },
    {
      title:
        "D- DISCIPLESHIP",
      content: `To invite people to join us in the lifestyle of the Kingdom by imitating Christ, teaching people to obey Him, and imparting Biblical values.`,
    }
  ];

  return (
    <Box
      display="flex"
      flexDir={'column'}
      gap={{ base: '1rem', lg: '1.5rem' }}
      w="100%"
    >
      <CustomValuesAccordion
        data={Data}
        borderColor={borderColor}
        buttonColor={buttonColor}
        width="100%"
      />
    </Box>
  );
};

export default ConnectMinistryFaq;
