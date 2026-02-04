import { useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import {
  AspectRatio,
  Box,
  Container,
  Fade,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

const opportunities = [
  {
    title: 'Tai Po Healthcare Outreach',
    date: 'Sunday, Jan 18, 2026',
    images: [
      {
        src: '/images/shine/taipo_healthcare_1.jpg',
        alt: 'Tai Po Healthcare Outreach highlight',
      },
      {
        src: '/images/shine/taipo_healthcare_2.jpg',
        alt: 'Tai Po Healthcare Outreach team',
      },
      {
        src: '/images/shine/taipo_healthcare_3.jpg',
        alt: 'Tai Po Healthcare Outreach service moment',
      },
      {
        src: '/images/shine/taipo_healthcare_4.jpg',
        alt: 'Tai Po Healthcare Outreach activity',
      },
      {
        src: '/images/shine/taipo_healthcare_5.jpg',
        alt: 'Tai Po Healthcare Outreach volunteers',
      },
      {
        src: '/images/shine/taipo_healthcare_6.jpg',
        alt: 'Tai Po Healthcare Outreach volunteers',
      },
    ],
  },
  {
    // TODO-aparedan: Please put down some photos from the Mother's Choice event here
    title: "Mother's Choice Family Fun Fest",
    date: 'Sunday, Jan 25, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.svg',
        alt: "Mother's Choice Family Fun Fest highlight",
      },
      {
        src: '/images/shine/placeholder-2.svg',
        alt: "Mother's Choice Family Fun Fest gathering",
      },
      {
        src: '/images/shine/placeholder-3.svg',
        alt: "Mother's Choice Family Fun Fest activity",
      },
      {
        src: '/images/shine/placeholder-4.svg',
        alt: "Mother's Choice Family Fun Fest volunteers",
      },
      {
        src: '/images/shine/placeholder-5.svg',
        alt: "Mother's Choice Family Fun Fest support",
      },
      {
        src: '/images/shine/placeholder-6.svg',
        alt: "Mother's Choice Family Fun Fest extra moment",
      },
    ],
  },
  {
    // TODO-aparedan: Please put down some photos from the English Academy Tutoring event here
    title: 'English Academy Tutoring',
    date: 'Jan-Mar, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.svg',
        alt: 'English Academy Tutoring session',
      },
      {
        src: '/images/shine/placeholder-2.svg',
        alt: 'English Academy Tutoring classroom',
      },
      {
        src: '/images/shine/placeholder-3.svg',
        alt: 'English Academy Tutoring volunteers',
      },
      {
        src: '/images/shine/placeholder-4.svg',
        alt: 'English Academy Tutoring mentorship',
      },
      {
        src: '/images/shine/placeholder-5.svg',
        alt: 'English Academy Tutoring support',
      },
      {
        src: '/images/shine/placeholder-6.svg',
        alt: 'English Academy Tutoring extra moment',
      },
    ],
  },
  {
    title: 'Mei Foo Healthcare Outreach',
    date: 'Sunday, Feb 28, 2026',
    images: [
      {
        src: '/images/shine/meifoo_healthcare_1.jpg',
        alt: 'Mei Foo Healthcare Outreach highlight',
      },
      {
        src: '/images/shine/meifoo_healthcare_2.jpg',
        alt: 'Mei Foo Healthcare Outreach clinic',
      },
      {
        src: '/images/shine/meifoo_healthcare_3.jpg',
        alt: 'Mei Foo Healthcare Outreach care moment',
      },
      {
        src: '/images/shine/meifoo_healthcare_4.jpg',
        alt: 'Mei Foo Healthcare Outreach volunteers',
      },
      {
        src: '/images/shine/meifoo_healthcare_5.jpg',
        alt: 'Mei Foo Healthcare Outreach support',
      },
      {
        src: '/images/shine/meifoo_healthcare_6.jpg',
        alt: 'Mei Foo Healthcare Outreach extra moment',
      },
    ],
  },
];

const fadeTransition = { enter: { duration: 0.8 }, exit: { duration: 0.8 } };

const PastOpportunitiesPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const selectedOpportunity = opportunities[selectedIndex];
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageTap = (image) => {
    setModalImage(image);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setModalImage(null);
  };

  const renderImageContent = (image, index) => {
    const imageNode = (
      <Fade
        in
        key={`${selectedOpportunity.title}-${index}`}
        transition={fadeTransition}
        w="100%"
        h="100%"
      >
        <Image
          src={image.src}
          alt={image.alt}
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition={{ base: 'left', md: 'center' }}
          transform={{ base: 'scale3d(1,1,1)', md: 'scale(1.65)' }}
          transformOrigin="center"
        />
      </Fade>
    );

    if (!isMobile) {
      return imageNode;
    }

    return (
      <AspectRatio ratio={4 / 3} w="100%">
        {imageNode}
      </AspectRatio>
    );
  };
  const itemHeightRem = isMobile ? 2.5 : 3.5;
  const itemGapRem = isMobile ? 0.75 : 0.75;
  const visibleCount = isMobile ? 2.5 : 4;
  const stepRem = itemHeightRem + itemGapRem;
  const listHeightRem =
    visibleCount * itemHeightRem + (visibleCount - 1) * itemGapRem;
  const translateY =
    listHeightRem / 2 - itemHeightRem / 2 - selectedIndex * stepRem;

  return (
    <Container maxW="container.xl">
      <VStack
        alignItems="start"
        justifyContent="space-between"
        h="90%"
        m={{ base: '1', md: '3' }}
        gap={{ base: '3', md: 'none' }}
      >
        <Box w="100%" py={{ base: 8, md: 12 }}>
          <HStack
            spacing={2}
            mb={2}
            alignItems="baseline"
            justifyContent={{ base: 'flex-start', md: 'flex-start' }}
          >
            <Box
              as="svg"
              width={{ base: '1.5rem', md: '1.75rem' }}
              height={{ base: '1.5rem', md: '1.75rem' }}
              viewBox="0 0 36 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              mt={{ base: '0.125rem', md: '0.25rem' }}
            >
              <g clipPath="url(#clip0_158_2614)">
                <path
                  d="M17.0859 2.09326C17.2329 2.09326 17.3527 2.13954 17.4287 2.19775C17.4879 2.24312 17.5646 2.32588 17.6006 2.521L19.1504 10.9321C19.4361 12.483 20.6494 13.6962 22.2002 13.9819L30.6113 15.5317C30.8066 15.5677 30.8902 15.6444 30.9355 15.7036C30.9937 15.7796 31.04 15.8995 31.04 16.0464C31.04 16.1933 30.9937 16.3132 30.9355 16.3892C30.8902 16.4484 30.8066 16.5251 30.6113 16.561L22.2002 18.1108C20.6494 18.3966 19.4361 19.6098 19.1504 21.1606L17.6006 29.5718C17.5646 29.7669 17.4879 29.8496 17.4287 29.895C17.3527 29.9532 17.2329 30.0005 17.0859 30.0005C16.939 30.0004 16.8191 29.9532 16.7432 29.895C16.684 29.8496 16.6072 29.7666 16.5713 29.5718L15.0225 21.1606C14.7368 19.6097 13.5226 18.3965 11.9717 18.1108L3.56055 16.561C3.36557 16.525 3.28267 16.4483 3.2373 16.3892C3.17909 16.3132 3.13281 16.1934 3.13281 16.0464C3.13282 15.8994 3.1791 15.7796 3.2373 15.7036C3.28268 15.6444 3.36563 15.5677 3.56055 15.5317L11.9717 13.9819C13.5226 13.6962 14.7368 12.4831 15.0225 10.9321L16.5713 2.521C16.6072 2.32615 16.684 2.24318 16.7432 2.19775C16.8191 2.13957 16.9391 2.09331 17.0859 2.09326ZM-149.699 -41.0308C-149.552 -41.0308 -149.432 -40.9835 -149.356 -40.9253C-149.297 -40.8799 -149.221 -40.7972 -149.185 -40.6021L-147.635 -32.1909C-147.349 -30.6401 -146.136 -29.4269 -144.585 -29.1411L-136.174 -27.5913C-135.979 -27.5553 -135.895 -27.4787 -135.85 -27.4194C-135.791 -27.3434 -135.745 -27.2235 -135.745 -27.0767C-135.745 -26.9298 -135.791 -26.8099 -135.85 -26.7339C-135.895 -26.6747 -135.979 -26.598 -136.174 -26.562L-144.585 -25.0132C-146.136 -24.7275 -147.349 -23.5133 -147.635 -21.9624L-149.185 -13.5513C-149.221 -13.3562 -149.297 -13.2734 -149.356 -13.228C-149.432 -13.1698 -149.552 -13.1235 -149.699 -13.1235C-149.846 -13.1236 -149.966 -13.1698 -150.042 -13.228C-150.101 -13.2734 -150.178 -13.3564 -150.214 -13.5513L-151.763 -21.9624C-152.048 -23.5133 -153.263 -24.7275 -154.813 -25.0132L-163.225 -26.562C-163.42 -26.598 -163.502 -26.6747 -163.548 -26.7339C-163.606 -26.8099 -163.652 -26.9297 -163.652 -27.0767C-163.652 -27.2237 -163.606 -27.3435 -163.548 -27.4194C-163.502 -27.4786 -163.42 -27.5553 -163.225 -27.5913L-154.813 -29.1411C-153.263 -29.4268 -152.048 -30.64 -151.763 -32.1909L-150.214 -40.6021C-150.178 -40.7969 -150.101 -40.8799 -150.042 -40.9253C-149.966 -40.9835 -149.846 -41.0307 -149.699 -41.0308ZM-65.3555 -100.007C-65.2085 -100.007 -65.0887 -99.961 -65.0127 -99.9028C-64.9535 -99.8575 -64.8768 -99.7746 -64.8408 -99.5796L-63.291 -91.1685C-63.0053 -89.6176 -61.792 -88.4034 -60.2412 -88.1177L-51.8301 -86.5688C-51.6348 -86.5329 -51.5512 -86.4562 -51.5059 -86.397C-51.4477 -86.321 -51.4014 -86.2011 -51.4014 -86.0542C-51.4014 -85.9074 -51.4477 -85.7874 -51.5059 -85.7114C-51.5512 -85.6522 -51.6348 -85.5755 -51.8301 -85.5396L-60.2412 -83.9897C-61.792 -83.704 -63.0053 -82.4907 -63.291 -80.9399L-64.8408 -72.5288C-64.8768 -72.3335 -64.9535 -72.25 -65.0127 -72.2046C-65.0887 -72.1465 -65.2087 -72.1001 -65.3555 -72.1001C-65.5023 -72.1002 -65.6223 -72.1464 -65.6982 -72.2046C-65.7575 -72.25 -65.8341 -72.3335 -65.8701 -72.5288L-67.4189 -80.9399C-67.7047 -82.4908 -68.9188 -83.704 -70.4697 -83.9897L-78.8809 -85.5396C-79.0758 -85.5756 -79.1588 -85.6522 -79.2041 -85.7114C-79.2623 -85.7874 -79.3086 -85.9072 -79.3086 -86.0542C-79.3086 -86.2011 -79.2623 -86.321 -79.2041 -86.397C-79.1587 -86.4561 -79.0757 -86.5329 -78.8809 -86.5688L-70.4697 -88.1177C-68.9188 -88.4034 -67.7046 -89.6175 -67.4189 -91.1685L-65.8701 -99.5796C-65.8342 -99.7744 -65.7574 -99.8574 -65.6982 -99.9028C-65.6223 -99.961 -65.5023 -100.007 -65.3555 -100.007Z"
                  fill="#21A0A7"
                  stroke="#21A0A7"
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
              Past Opportunities
            </Heading>
          </HStack>
          <Text
            color="gray.600"
            mb={{ base: 6, md: 8 }}
            fontFamily="Manrope, sans-serif"
            fontWeight="400"
            fontStyle="normal"
            fontSize={{ base: '1rem', md: '1.25rem' }}
            lineHeight="100%"
            letterSpacing="0rem"
            textAlign={{ base: 'left', md: 'left' }}
          >
            {/* // TODO-aparedan: Please put down some description here */}
            We hope to accomplish our mission ...
          </Text>

          <Box bg="#B7E0E2" borderRadius="3xl" p={{ base: 5, md: 8 }}>
            <HStack
              alignItems={{ base: 'center', md: 'stretch' }}
              spacing={{ base: 6, md: 10 }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <VStack
                alignItems={{ base: 'start', md: 'start' }}
                spacing={{ base: 4, md: 6 }}
                w={{ base: '100%', md: '35%' }}
                justifyContent="center"
              >
                <HStack
                  alignItems="center"
                  spacing={{ base: 2, md: 4 }}
                  w="100%"
                  justifyContent={{ base: 'flex-start', md: 'flex-start' }}
                >
                  <Box
                    as={BiSolidRightArrow}
                    color="#21A0A7"
                    boxSize={{ base: '1.5rem', md: '2.1875rem' }}
                  />
                  <Box
                    w="100%"
                    h={`${listHeightRem}rem`}
                    overflow="hidden"
                  >
                    <VStack
                      alignItems={{ base: 'start', md: 'start' }}
                      spacing={`${itemGapRem}rem`}
                      transform={{
                        base: `translateY(${translateY}rem)`,
                        md: `translateY(${translateY}rem)`,
                      }}
                      transition="transform 0.7s ease"
                    >
                      {opportunities.map((opportunity, index) => {
                        const isSelected = index === selectedIndex;

                        return (
                          <Box
                            key={opportunity.title}
                            cursor="pointer"
                            opacity={isSelected ? 1 : 0.5}
                            onClick={() => setSelectedIndex(index)}
                            minH={`${itemHeightRem}rem`}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                          >
                            <Text
                              fontWeight={isSelected ? '700' : '500'}
                              color={isSelected ? 'gray.800' : 'gray.500'}
                              fontFamily="Manrope, sans-serif"
                              fontStyle="normal"
                              fontSize={{ base: '1rem', md: '1.125rem' }}
                              lineHeight="100%"
                              letterSpacing="0rem"
                              textAlign={{ base: 'left', md: 'left' }}
                            >
                              {opportunity.title}
                            </Text>
                            <Text
                              color={isSelected ? 'gray.700' : 'gray.400'}
                              fontFamily="Manrope, sans-serif"
                              fontWeight="600"
                              fontStyle="normal"
                              fontSize={{ base: '0.75rem', md: '0.875rem' }}
                              lineHeight="100%"
                              letterSpacing="0rem"
                              mt={{ base: '0.25rem', md: '0.5rem' }}
                              textAlign={{ base: 'left', md: 'left' }}
                            >
                              {opportunity.date}
                            </Text>
                          </Box>
                        );
                      })}
                    </VStack>
                  </Box>
                </HStack>
              </VStack>

              <Box
                w={{ base: '100%', md: '65%' }}
                maxW={{ base: '100%', md: 'none' }}
                mx={{ base: '20%', md: 0 }}
              >
                <Box
                  bg="#E2FEFF"
                  borderRadius="2xl"
                  p={{ base: 3, md: 5 }}
                  mr={{ base: 3, md: 0 }}
                  ml={{ base: -2, md: 0 }}
                >
                  <Grid
                    templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
                    templateRows={{
                      base: 'repeat(3, auto)',
                      md: 'repeat(2, 10.3125rem)',
                    }}
                    templateAreas={{
                      base: `"feature rightTop" "rightTop2 bottomLeft" "bottomMid rightBottom"`,
                      md: `"feature feature rightTop rightTop2" "bottomLeft bottomMid bottomMid rightBottom"`,
                    }}
                    gap={{ base: 3, md: 5 }}
                  >
                  <GridItem
                    area="feature"
                    overflow="hidden"
                    borderRadius="2xl"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => handleImageTap(selectedOpportunity.images[0])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        isMobile &&
                        (event.key === 'Enter' || event.key === ' ')
                      ) {
                        event.preventDefault();
                        handleImageTap(selectedOpportunity.images[0]);
                      }
                    }}
                  >
                    {renderImageContent(selectedOpportunity.images[0], 0)}
                  </GridItem>
                  <GridItem
                    area="rightTop"
                    overflow="hidden"
                    borderRadius="2xl"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => handleImageTap(selectedOpportunity.images[1])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        isMobile &&
                        (event.key === 'Enter' || event.key === ' ')
                      ) {
                        event.preventDefault();
                        handleImageTap(selectedOpportunity.images[1]);
                      }
                    }}
                  >
                    {renderImageContent(selectedOpportunity.images[1], 1)}
                  </GridItem>
                  <GridItem
                    area="rightTop2"
                    overflow="hidden"
                    borderRadius="2xl"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => handleImageTap(selectedOpportunity.images[5])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        isMobile &&
                        (event.key === 'Enter' || event.key === ' ')
                      ) {
                        event.preventDefault();
                        handleImageTap(selectedOpportunity.images[5]);
                      }
                    }}
                  >
                    {renderImageContent(selectedOpportunity.images[5], 5)}
                  </GridItem>
                  <GridItem
                    area="bottomLeft"
                    overflow="hidden"
                    borderRadius="2xl"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => handleImageTap(selectedOpportunity.images[2])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        isMobile &&
                        (event.key === 'Enter' || event.key === ' ')
                      ) {
                        event.preventDefault();
                        handleImageTap(selectedOpportunity.images[2]);
                      }
                    }}
                  >
                    {renderImageContent(selectedOpportunity.images[2], 2)}
                  </GridItem>
                  <GridItem
                    area="bottomMid"
                    overflow="hidden"
                    borderRadius="2xl"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => handleImageTap(selectedOpportunity.images[3])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        isMobile &&
                        (event.key === 'Enter' || event.key === ' ')
                      ) {
                        event.preventDefault();
                        handleImageTap(selectedOpportunity.images[3]);
                      }
                    }}
                  >
                    {renderImageContent(selectedOpportunity.images[3], 3)}
                  </GridItem>
                  <GridItem
                    area="rightBottom"
                    overflow="hidden"
                    borderRadius="2xl"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => handleImageTap(selectedOpportunity.images[4])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        isMobile &&
                        (event.key === 'Enter' || event.key === ' ')
                      ) {
                        event.preventDefault();
                        handleImageTap(selectedOpportunity.images[4]);
                      }
                    }}
                  >
                    {renderImageContent(selectedOpportunity.images[4], 4)}
                  </GridItem>
                  </Grid>
                </Box>
              </Box>
            </HStack>
          </Box>
        </Box>
      </VStack>
      <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="blackAlpha.900" maxW={{ base: '90vw', md: '48rem' }}>
          <ModalCloseButton color="white" />
          <ModalBody
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {modalImage && (
              <Image
                src={modalImage.src}
                alt={modalImage.alt}
                w="100%"
                maxH={{ base: '80vh', md: '70vh' }}
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PastOpportunitiesPage;
