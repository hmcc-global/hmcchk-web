import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  IconButton,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const images = [
  "/images/building-blocks/carousel-1.jpg",
  "/images/building-blocks/carousel-2.jpg",
  "/images/building-blocks/carousel-3.png"
];

export default function Curriculum() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(true);
    }, 400);
  };
  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 400);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      bg="#F7F9FC"
      minH="100vh"
      align="center"
      justify="center"
      px={{ base: 2, md: 8 }}
      py={8}
    >
      <Flex
        w="100%"
        maxW="1200px"
        bg="#F7F9FC"
        overflow="hidden"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
      >
        {/* Carousel Section */}
        <Box
          position="relative"
          w={{ base: "100%", md: "55%" }}
          h={{ base: "300px", md: "628px" }}
          minW={{ md: "650px" }}
          bg="gray.200"
          borderRadius={{ base: "40px", md: "60px" }}
          overflow="hidden"
          role="group"
        >
          <Image
            src={images[current]}
            alt="Curriculum"
            objectFit="cover"
            objectPosition="100% 50%"
            w="100%"
            h="100%"
            transition="opacity 1.2s"
            opacity={fade ? 1 : 0}
          />
          {/* Carousel Controls */}
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={8} color="white" />}
            position="absolute"
            top="50%"
            left="4"
            transform="translateY(-50%)"
            onClick={prevSlide}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            zIndex={1}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.2s"
            _focus={{ boxShadow: 'none', outline: 'none' }}
            _active={{ boxShadow: 'none', outline: 'none' }}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={8} color="white" />}
            position="absolute"
            top="50%"
            right="4"
            transform="translateY(-50%)"
            onClick={nextSlide}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            zIndex={1}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.2s"
            _focus={{ boxShadow: 'none', outline: 'none' }}
            _active={{ boxShadow: 'none', outline: 'none' }}
          />
          {/* Dots overlayed at the bottom center of the carousel */}
          <HStack
            position="absolute"
            bottom="4"
            left="50%"
            transform="translateX(-50%)"
            spacing={2}
          >
            {images.map((_, idx) => (
              <Box
                key={idx}
                w={2}
                h={2}
                borderRadius="full"
                bg={current === idx ? " #EBAC09;" : "#D9D9D9"}
                cursor="pointer"
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrent(idx);
                    setFade(true);
                  }, 400);
                }}
              />
            ))}
          </HStack>
        </Box>

        {/* Text Section */}
        <Box
          flex="1"
          px={{ md: "6.5rem" }}
          py={{ base:6, md: 12 }}
          textAlign="left"
          minW={{ md: "30rem" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "1.25rem", lg: "4xl" }}
            fontWeight="bold"
            fontStyle="italic"
            color="gray.800"
            mb={6}
          >
            Curriculum
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">
            In Building Blocks, we use the curriculum <b>"The Biggest Story Curriculum"</b> by Crossway as the backbone for our lessons. The curriculum spans over the entire Bible, helping children understand that God has written this story of redeeming the world through his Son, Jesus Christ.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
