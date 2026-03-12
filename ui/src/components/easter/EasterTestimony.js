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
                            WebkitTextStrokeWidth: '1.2px',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        WE ARE ALSO SHARING TESTIMONIES!
                    </Heading>
                    <Box position="absolute" left={-6} top="6%" bottom="6%" width="28px" display="flex" alignItems="center" justifyContent="center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="100%" viewBox="0 0 24 521" fill="none" style={{ display: 'block' }}>
                            <path d="M23.5 0.5C10.7975 0.5 0.5 10.7974 0.5 23.5V497.5C0.5 510.203 10.7975 520.5 23.5 520.5" stroke="#A690B4" strokeWidth="1" />
                        </svg>
                    </Box>

                    <Box position="absolute" right={-6} top="6%" bottom="6%" width="28px" display="flex" alignItems="center" justifyContent="center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="100%" viewBox="0 0 24 521" fill="none" style={{ display: 'block', transform: 'scaleX(-1)' }}>
                            <path d="M23.5 0.5C10.7975 0.5 0.5 10.7974 0.5 23.5V497.5C0.5 510.203 10.7975 520.5 23.5 520.5" stroke="#A690B4" strokeWidth="1" />
                        </svg>
                    </Box>

                    <Grid templateColumns={{ base: '1fr', md: '1fr 420px' }} gap={{ base: 8, md: 12 }} alignItems="center">
                        <Box bg="transparent" borderRadius="md" p={{ base: 6, md: 8 }}>
                            <Stack spacing={6}>
                                <HStack justifyContent="space-between" alignItems="start">
                                    <VStack alignItems="flex-start">
                                        <Text fontSize="sm" letterSpacing="widest" fontWeight="600" color="gray.600">
                                            HOW TO PARTICIPATE
                                        </Text>
                                        {/* divider replaced with fixed-width line */}
                                        <Box width="518px" height="1px" bg="rgba(0,0,0,0.20)" />
                                    </VStack>
                                </HStack>


                                <Text
                                    fontFamily="Manrope"
                                    color="#161616"
                                    fontSize="16px"
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                >
                                    Post a Living Hope testimony with the following prompt:
                                </Text>

                                <Text
                                    as="span"
                                    fontFamily="Instrument Serif"
                                    fontStyle="italic"
                                    fontWeight={400}
                                    fontSize="30px"
                                    color="#982896"
                                    lineHeight="normal"
                                    display="block"
                                    sx={{
                                        WebkitTextStrokeWidth: '1px',
                                        WebkitTextStrokeColor: '#982896',
                                        WebkitTextFillColor: '#982896',
                                    }}
                                >
                                    My hope was in ___,
                                    <br />
                                    but now, Jesus is my Living Hope because ____.
                                </Text>


                                <Text
                                    fontFamily="Manrope"
                                    color="#161616"
                                    fontSize="16px"
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                >
                                    Include the hashtag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="16px" lineHeight="120.156%">#hmcc_livinghope</Text> and <br />
                                    tag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="16px" lineHeight="120.156%">@HMCC_HK</Text> in your Instagram post!
                                </Text>

                                <HStack pt={4}>
                                    <Link href="https://www.instagram.com/" isExternal _hover={{ textDecoration: 'none' }}>
                                        <Button
                                            rightIcon={<ArrowForwardIcon />}
                                            bgColor={"#410025"}
                                            color="#FFF"
                                            borderRadius="full"
                                            px={6}
                                            py={5}
                                            fontFamily="Manrope"
                                            fontSize="16px"
                                            fontWeight={700}
                                            lineHeight="normal"
                                            textAlign="center"
                                            _hover={{ opacity: 0.92 }}
                                        >
                                            View More on Instagram
                                        </Button>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Box>

                        <Box width={{ base: '90%', md: '80%' }} height="90%" border="none">
                            <iframe
                                title="instagram"
                                src="https://widget.taggbox.com/2163216"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                }}
                            ></iframe>
                        </Box>
                    </Grid>

                    <Box pt={{ base: 6, md: 12 }}>
                        <Text
                            fontFamily="Instrument Serif"
                            fontSize="40px"
                            textAlign="center"
                            color="#7586C1"
                            fontStyle="normal"
                            fontWeight={400}
                            lineHeight="32px"
                            sx={{
                                WebkitTextStrokeWidth: '0.6px',
                                WebkitTextStrokeColor: '#7586C1',
                                WebkitTextFillColor: '#7586C1',
                            }}
                        >
                            Come experience the <Text as="span" fontStyle="italic">Living Hope</Text> we have in Jesus Christ this Passion Week!
                        </Text>
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
}