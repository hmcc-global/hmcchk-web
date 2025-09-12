import {
  Flex,
  Heading,
  Text,
  Box,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { tenYearTheme } from './theme';
import SelectorBox from './SelectorBox';
import { selectorOptions } from './selectorConfig';

const OfferingSection = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    title = 'Section',
    bg = 'transparent', // Use transparent to show gradient
    color = tenYearTheme.components.heading.color, // Use theme color
  } = props;

  const image_10 = `${process.env.PUBLIC_URL}/images/10-year/10th.png`;
  const T_image = `${process.env.PUBLIC_URL}/images/10-year/t.png`;
  const ripple_image = `${process.env.PUBLIC_URL}/images/10-year/ripple.png`;
  const transformat10n_image = `${process.env.PUBLIC_URL}/images/10-year/Transformat10n.png`;
  const offering_background = isMobile
    ? `${process.env.PUBLIC_URL}/images/10-year/offeringBackgroundMobile.png`
    : `${process.env.PUBLIC_URL}/images/10-year/offeringBackground.png`;

  return (
    <Box position="relative" w="100%" paddingTop="5rem">
      <Flex
        as="section"
        {...tenYearTheme.components.fullPageSection}
        bg={bg}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        backgroundImage={`url(${offering_background})`}
        backgroundSize="cover"
        backgroundAttachment={'fixed'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        width="100%"
        minHeight={'100vh'}
        position="relative"
        paddingTop="2rem"
        paddingBottom="5rem"
        overflow="hidden"
      >
        <Heading
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={0}
        >
          <Image
            src="/images/10-year/10.svg"
            alt="10"
            h="3em"
            w="auto"
            mt={-4}
          />
          <Box as="span" {...tenYearTheme.typography.h1} ml={-8}>
            Years: More to Come
          </Box>
        </Heading>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          margin="0 auto" // This centers the container horizontally
        >
          <Text
            as="h3"
            {...tenYearTheme.components.text}
            {...tenYearTheme.typography.subheading}
            color="white"
            marginBottom="30px"
            maxW="1000px"
          >
            For a decade, we've witnessed God's
            <Box
              as="span"
              display="inline-block"
              position="relative"
              paddingLeft="20px" // Space for the T image
              paddingRight="3px" // Additional space after the T
            >
              <Image
                src={T_image} // This should be the actual image path, not a CSS url()
                position="absolute"
                left="7px"
                top="50%"
                transform="translateY(-50%)"
                width="30px"
                height="30px"
                zIndex="1"
                opacity="0.9"
                aria-label="T"
                alt="T"
              />
              ransformative
            </Box>
            work in and through HMCC of Hong Kong.
          </Text>
          <Text
            as="h3"
            {...tenYearTheme.components.text}
            {...tenYearTheme.typography.subheading}
            color="white"
            marginBottom="30px"
            maxW="1000px"
          >
            As we celebrate this 10-year milestone,{' '}
            <span style={{ color: '#ACD9FF' }}>
              we invite you to invest in the next chapter
            </span>
            .
          </Text>
          <Text
            as="h3"
            {...tenYearTheme.components.text}
            {...tenYearTheme.typography.subheading}
            color="white"
            marginBottom="30px"
            maxW="1000px"
          >
            Your generosity will enable us to respond to God's call. We pray to
            see more lives being transformed, LIFE Groups multiplied, churches
            planted, people being sent out for global missions, and so much
            more.
          </Text>
          <Text
            as="h3"
            {...tenYearTheme.components.text}
            {...tenYearTheme.typography.subheading}
            color="white"
            marginBottom="20px"
            maxW="1000px"
          >
            Join us to see God transforming lives and transforming the world{' '}
            {isMobile ? '' : <br />}
            through HMCC-HK in the coming years!
          </Text>
        </Box>
        <Image
          width={{ base: '60px', md: '70px' }}
          height="100%"
          src={ripple_image}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          margin="0 auto" // This centers the container horizontally
        >
          <Heading
            {...tenYearTheme.components.heading}
            {...tenYearTheme.typography.h1}
            color={color}
            display="flex"
            alignItems="center"
            position="relative"
          >
            Give Now to More Years of
          </Heading>
          <Image
            position="relative"
            src={transformat10n_image}
            width={{ base: '230px', md: '350px' }}
            height={'auto'}
            transform="translateY(-25%)"
            zIndex={1}
            aria-label="Transformat10n"
            alt="Transformat10n"
          />
        </Box>
        <Text
          as="h3"
          {...tenYearTheme.components.text}
          {...tenYearTheme.typography.subheading}
          color="white"
          maxW="1000px"
          marginTop="-20px"
          marginBottom="-20px"
        >
          Giving Information:
        </Text>
        <SelectorBox
          options={selectorOptions}
          defaultSelected={0} // 0 for Hong Kong, 1 for International
        />
      </Flex>
    </Box>
  );
};

export default OfferingSection;
