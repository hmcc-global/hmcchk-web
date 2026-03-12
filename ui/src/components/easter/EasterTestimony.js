import React from 'react';
import {
    Box,
    Grid,
    GridItem,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
    HStack,
    Button,
    Divider,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const placeholders = new Array(9).fill(null);

export default function EasterTestimony() {
    const accent = useColorModeValue('purple.700', 'purple.300');
    const cardBg = useColorModeValue('whiteAlpha.900', 'gray.800');

    return (
        <Box as="section" w="100%" py={{ base: 8, md: 16 }} px={{ base: 6, md: 12 }}>
            <VStack spacing={8} align="stretch">
                <Box position="relative">
                    <Image
                        src={process.env.PUBLIC_URL + '/images/easter/easter_testimony_icon.png'}
                        alt="icon"
                        mx="auto"
                        display="block"
                        w={{ base: '64px', md: '96px' }}
                        mb={2}
                    />
                    <Heading
                        as="h2"
                        fontFamily="Instrument Serif"
                        fontStyle="italic"
                        fontWeight={400}
                        fontSize="40px"
                        lineHeight="97%"
                        textAlign="center"
                        textTransform="uppercase"
                        background="linear-gradient(90deg, #982896 0%, #320D19 100%)"
                        backgroundClip="text"
                        pb={2}
                        sx={{
                            WebkitTextStrokeWidth: '1.3px',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        WE ARE ALSO SHARING TESTIMONIES!
                    </Heading>
                    <Box position="absolute" left={-6} top="6%" bottom="6%" width="28px" border="1.5px solid" borderColor="#d7bfd9" borderRadius="24px" />
                    <Box position="absolute" right={-6} top="6%" bottom="6%" width="28px" border="1.5px solid" borderColor="#d7bfd9" borderRadius="24px" />

                    <Grid templateColumns={{ base: '1fr', md: '1fr 420px' }} gap={{ base: 8, md: 12 }} alignItems="center">
                        <Box bg="transparent" borderRadius="md" p={{ base: 6, md: 8 }}>
                            <Stack spacing={6}>
                                <HStack justifyContent="space-between" alignItems="start">
                                    <VStack alignItems="flex-start">
                                        <Text fontSize="sm" letterSpacing="widest" fontWeight="600" color="gray.600">
                                            HOW TO PARTICIPATE
                                        </Text>
                                        <Divider borderColor="gray.300" width="100%" />
                                    </VStack>
                                </HStack>

                                <Text textStyle="manrope" color="gray.700">Post a Living Hope testimony with the following prompt:</Text>

                                <Text
                                    as="span"
                                    fontFamily="Instrument Serif"
                                    fontStyle="italic"
                                    fontSize={{ base: '20px', md: '28px' }}
                                    color="#982896"
                                    lineHeight={{ base: '1.02', md: '0.5' }}
                                    display="block"
                                >
                                    My hope was in ___,
                                </Text>
                                <Text
                                    as="span"
                                    fontFamily="Instrument Serif"
                                    fontStyle="italic"
                                    fontSize={{ base: '20px', md: '28px' }}
                                    color="#982896"
                                    lineHeight={{ base: '1.02', md: '0.5' }}
                                    display="block"
                                >
                                    but now, Jesus is my Living Hope because ____.
                                </Text>

                                <Text textStyle="manrope" color="gray.700" fontSize={{ base: '0.95em', md: '1em' }}>
                                    Include the hashtag <Text as="span" fontWeight="700">#hmcc_livinghope</Text> and tag <Text as="span" fontWeight="700">@HMCC_HK</Text> in your Instagram post!
                                </Text>

                                <HStack pt={4}>
                                    <Link href="https://www.instagram.com/" isExternal _hover={{ textDecoration: 'none' }}>
                                        <Button
                                            rightIcon={<ArrowForwardIcon />}
                                            bgGradient="linear(to-r, #3A042E, #8A1F4B)"
                                            color="white"
                                            borderRadius="full"
                                            px={6}
                                            py={5}
                                            _hover={{ opacity: 0.92 }}
                                        >
                                            View More on Instagram
                                        </Button>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Box>

                        <Box>
                            <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                                {placeholders.map((_, i) => (
                                    <GridItem key={i} w="100%">
                                        <Box h={{ base: '70px', md: '96px' }} bg="gray.200" borderRadius="md" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
                                            <Text color="gray.400">Image</Text>
                                        </Box>
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    <Box pt={{ base: 6, md: 12 }}>
                        <Text
                            fontFamily="Instrument Serif"
                            fontSize={{ base: '1.25em', md: '2xl' }}
                            textAlign="center"
                            color="#7B8ECF"
                            fontStyle="italic"
                            fontWeight={400}
                        >
                            Come experience the Living Hope we have in Jesus Christ this Passion Week!
                        </Text>
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
}