import React from 'react';
import { HStack, Box, Heading, Grid, Text } from '@chakra-ui/react';

const values = [
  {
    title: 'Educate',
    description:
      "the next generation",
    bg: '/images/shine/educate-bg.png',
  },
  {
    title: 'Equip',
    description:
      'for the future',
    bg: '/images/shine/equip-bg.png',
  },
  {
    title: 'Engage',
    description:
      "our communities",
    bg: '/images/shine/engage-bg.png',
  },
];

const ApproachSection = () => {
  return (
    <>
      <HStack
        spacing={2}
        mb={{ base: 6, md: 10 }}
        px={2}
        alignItems="baseline"
        justifyContent={{ base: 'flex-start', md: 'flex-start' }}
      >
        <Box
          as="svg"
          width={{ base: '24px', md: '28px' }}
          height={{ base: '24px', md: '28px' }}
          viewBox="0 0 36 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          mt={{ base: '2px', md: '4px' }}
        >
          <g clipPath="url(#clip0_158_2614)">
            <path
              d="M17.0859 2.09326C17.2329 2.09326 17.3527 2.13954 17.4287 2.19775C17.4879 2.24312 17.5646 2.32588 17.6006 2.521L19.1504 10.9321C19.4361 12.483 20.6494 13.6962 22.2002 13.9819L30.6113 15.5317C30.8066 15.5677 30.8902 15.6444 30.9355 15.7036C30.9937 15.7796 31.04 15.8995 31.04 16.0464C31.04 16.1933 30.9937 16.3132 30.9355 16.3892C30.8902 16.4484 30.8066 16.5251 30.6113 16.561L22.2002 18.1108C20.6494 18.3966 19.4361 19.6098 19.1504 21.1606L17.6006 29.5718C17.5646 29.7669 17.4879 29.8496 17.4287 29.895C17.3527 29.9532 17.2329 30.0005 17.0859 30.0005C16.939 30.0004 16.8191 29.9532 16.7432 29.895C16.684 29.8496 16.6072 29.7666 16.5713 29.5718L15.0225 21.1606C14.7368 19.6097 13.5226 18.3965 11.9717 18.1108L3.56055 16.561C3.36557 16.525 3.28267 16.4483 3.2373 16.3892C3.17909 16.3132 3.13281 16.1934 3.13281 16.0464C3.13282 15.8994 3.1791 15.7796 3.2373 15.7036C3.28268 15.6444 3.36563 15.5677 3.56055 15.5317L11.9717 13.9819C13.5226 13.6962 14.7368 12.4831 15.0225 10.9321L16.5713 2.521C16.6072 2.32615 16.684 2.24318 16.7432 2.19775C16.8191 2.13957 16.9391 2.09331 17.0859 2.09326ZM-149.699 -41.0308C-149.552 -41.0308 -149.432 -40.9835 -149.356 -40.9253C-149.297 -40.8799 -149.221 -40.7972 -149.185 -40.6021L-147.635 -32.1909C-147.349 -30.6401 -146.136 -29.4269 -144.585 -29.1411L-136.174 -27.5913C-135.979 -27.5553 -135.895 -27.4787 -135.85 -27.4194C-135.791 -27.3434 -135.745 -27.2235 -135.745 -27.0767C-135.745 -26.9298 -135.791 -26.8099 -135.85 -26.7339C-135.895 -26.6747 -135.979 -26.598 -136.174 -26.562L-144.585 -25.0132C-146.136 -24.7275 -147.349 -23.5133 -147.635 -21.9624L-149.185 -13.5513C-149.221 -13.3562 -149.297 -13.2734 -149.356 -13.228C-149.432 -13.1698 -149.552 -13.1235 -149.699 -13.1235C-149.846 -13.1236 -149.966 -13.1698 -150.042 -13.228C-150.101 -13.2734 -150.178 -13.3564 -150.214 -13.5513L-151.763 -21.9624C-152.048 -23.5133 -153.263 -24.7275 -154.813 -25.0132L-163.225 -26.562C-163.42 -26.598 -163.502 -26.6747 -163.548 -26.7339C-163.606 -26.8099 -163.652 -26.9297 -163.652 -27.0767C-163.652 -27.2237 -163.606 -27.3435 -163.548 -27.4194C-163.502 -27.4786 -163.42 -27.5553 -163.225 -27.5913L-154.813 -29.1411C-153.263 -29.4268 -152.048 -30.64 -151.763 -32.1909L-150.214 -40.6021C-150.178 -40.7969 -150.101 -40.8799 -150.042 -40.9253C-149.966 -40.9835 -149.846 -41.0307 -149.699 -41.0308ZM-65.3555 -100.007C-65.2085 -100.007 -65.0887 -99.961 -65.0127 -99.9028C-64.9535 -99.8575 -64.8768 -99.7746 -64.8408 -99.5796L-63.291 -91.1685C-63.0053 -89.6176 -61.792 -88.4034 -60.2412 -88.1177L-51.8301 -86.5688C-51.6348 -86.5329 -51.5512 -86.4562 -51.5059 -86.397C-51.4477 -86.321 -51.4014 -86.2011 -51.4014 -86.0542C-51.4014 -85.9074 -51.4477 -85.7874 -51.5059 -85.7114C-51.5512 -85.6522 -51.6348 -85.5755 -51.8301 -85.5396L-60.2412 -83.9897C-61.792 -83.704 -63.0053 -82.4907 -63.291 -80.9399L-64.8408 -72.5288C-64.8768 -72.3335 -64.9535 -72.25 -65.0127 -72.2046C-65.0887 -72.1465 -65.2087 -72.1001 -65.3555 -72.1001C-65.5023 -72.1002 -65.6223 -72.1464 -65.6982 -72.2046C-65.7575 -72.25 -65.8341 -72.3335 -65.8701 -72.5288L-67.4189 -80.9399C-67.7047 -82.4908 -68.9188 -83.704 -70.4697 -83.9897L-78.8809 -85.5396C-79.0758 -85.5756 -79.1588 -85.6522 -79.2041 -85.7114C-79.2623 -85.7874 -79.3086 -85.9072 -79.3086 -86.0542C-79.3086 -86.2011 -79.2623 -86.321 -79.2041 -86.397C-79.1587 -86.4561 -79.0757 -86.5329 -78.8809 -86.5688L-70.4697 -88.1177C-68.9188 -88.4034 -67.7046 -89.6175 -67.4189 -91.1685L-65.8701 -99.5796C-65.8342 -99.7744 -65.7574 -99.8574 -65.6982 -99.9028C-65.6223 -99.961 -65.5023 -100.007 -65.3555 -100.007Z"
              fill="#4A6EEB"
              stroke="#4A6EEB"
              strokeWidth="3.27863"
            />
          </g>
          <defs>
            <clipPath id="clip0_158_2614">
              <rect width="36" height="31.7647" fill="white" />
            </clipPath>
          </defs>
        </Box>
        <Heading
          as="h2"
          fontFamily="'DM Serif Display', serif"
          fontWeight="600"
          fontStyle="italic"
          fontSize={{ base: '2rem', md: '2.625rem' }}
          lineHeight="94%"
          letterSpacing={{ base: '-0.0625rem', md: '-0.125rem' }}
        >
          Our Approach
        </Heading>
      </HStack>
      <Grid
        w="100%"
        gap={{ base: '1rem', md: '3rem', lg: '4rem' }}
        templateColumns={{
          base: '1fr',
          lg: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
        justifyItems="center"
      >
        {values.map((value) => (
          <Box
            key={value.title}
            bgImage={`url(${value.bg})`} // Use bgImage instead of bg
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            borderRadius={{ base: '1.5rem', md: '2rem' }} // Adjusted for rectangles
            p={{ base: '1.5rem', md: '2rem' }}
            h="100%"
            w="100%"
            maxW="30rem"
            minH="10rem"
            display="flex"
            flexDirection="column"
            justifyContent="center" // Center content vertically
            alignItems="start" // Center content horizontally
            position="relative"
            overflow="hidden"
          >
            {/* Single text element with both title and description */}
            <Text
              position="relative"
              zIndex={2}
              textAlign="start"
              color="black"
              px={{ base: 2, md: 4 }}
              lineHeight="1.5"
            >
              {/* Title with different font styling using span */}
              <Box
                as="span"
                display="block"
                fontSize={{ base: '1.5rem', md: '1.75rem', lg: '2rem' }}
                fontFamily="DMSerifDisplay"
                fontWeight="900"
                lineHeight="1.2"
              >
                {value.title}
              </Box>
              {/* Description continues in the same text flow */}
              <Box
                as="span"
                display="block"
                fontSize={{ base: '1.5rem', md: '1.75rem', lg: '2rem' }}
                fontFamily="DMSerifDisplay_Italic"
                fontWeight="lighter"
                lineHeight="1.2"
              >
                {value.description}
              </Box>
            </Text>
          </Box>
        ))}
      </Grid>
    </>
  );
}

export default ApproachSection;