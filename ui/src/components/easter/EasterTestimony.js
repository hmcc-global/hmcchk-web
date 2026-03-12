import React from 'react';
import {
    Box,
    Grid,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
    HStack,
    Button,
    Link,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function EasterTestimony() {
    return (
        <Box as="section" w="100%" py={{ base: 6, md: 16 }} px={{ base: 1, md: 12 }}>
            <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                <Box position="relative">
                    <Image
                        src={process.env.PUBLIC_URL + '/images/easter/easter_testimony_icon.png'}
                        alt="icon"
                        mx="auto"
                        display="block"
                        w={{ base: '3rem', md: '6rem' }}
                        mb={{ base: 1, md: 2 }}
                    />
                    <Heading
                        as="h2"
                        fontFamily="Instrument Serif"
                        fontStyle="italic"
                        fontWeight={400}
                        fontSize={{ base: '2.25rem', md: '2.5rem' }}
                        lineHeight="97%"
                        textAlign="center"
                        textTransform="uppercase"
                        background="linear-gradient(90deg, #982896 0%, #320D19 100%)"
                        backgroundClip="text"
                        maxW={{ base: '16.25rem', md: '100%' }}
                        mx="auto"
                        pb={{ base: 4, md: 2 }}
                        sx={{
                            WebkitTextStrokeWidth: '1.2px',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        WE ARE ALSO SHARING TESTIMONIES!
                    </Heading>
                    <Box
                        position="absolute"
                        left={{ base: 0, md: -6 }}
                        top={{ base: 0, md: '6%' }}
                        bottom={{ base: 0, md: '6%' }}
                        width={{ base: '0.6875rem', md: '1.75rem' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="100%"
                            viewBox="0 0 11 681"
                            preserveAspectRatio="none"
                            fill="none"
                            display={{ base: 'block', md: 'none' }}
                        >
                            <path d="M10.5 0.5C4.97715 0.5 0.5 4.97716 0.5 10.5V670.5C0.5 676.023 4.97715 680.5 10.5 680.5" stroke="#A690B4" />
                        </Box>
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="100%"
                            viewBox="0 0 24 521"
                            preserveAspectRatio="none"
                            fill="none"
                            display={{ base: 'none', md: 'block' }}
                        >
                            <path d="M12.5 0.5C5.87258 0.5 0.5 5.87258 0.5 12.5V508.5C0.5 515.127 5.87258 520.5 12.5 520.5" stroke="#B8A9C6" strokeWidth="1" />
                        </Box>
                    </Box>

                    <Box
                        position="absolute"
                        right={{ base: 0, md: -6 }}
                        top={{ base: 0, md: '6%' }}
                        bottom={{ base: 0, md: '6%' }}
                        width={{ base: '0.6875rem', md: '1.75rem' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="100%"
                            viewBox="0 0 11 681"
                            preserveAspectRatio="none"
                            fill="none"
                            display={{ base: 'block', md: 'none' }}
                        >
                            <path d="M0 0.5C5.52285 0.5 10 4.97716 10 10.5V670.5C10 676.023 5.52285 680.5 0 680.5" stroke="#A690B4" />
                        </Box>
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="100%"
                            viewBox="0 0 24 521"
                            preserveAspectRatio="none"
                            fill="none"
                            display={{ base: 'none', md: 'block' }}
                            style={{ transform: 'scaleX(-1)' }}
                        >
                            <path d="M12.5 0.5C5.87258 0.5 0.5 5.87258 0.5 12.5V508.5C0.5 515.127 5.87258 520.5 12.5 520.5" stroke="#B8A9C6" strokeWidth="1" />
                        </Box>
                    </Box>

                    <Grid templateColumns={{ base: '1fr', md: '1fr 420px' }} gap={{ base: 8, md: 12 }} alignItems="center">
                        <Box bg="transparent" borderRadius="md" p={{ base: 3, md: 8 }}>
                            <Stack spacing={{ base: 4, md: 6 }}>
                                <HStack justifyContent={{ base: 'center', md: 'space-between' }} alignItems="start">
                                    <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
                                        <Text
                                            fontSize="sm"
                                            letterSpacing="widest"
                                            fontWeight="600"
                                            color="gray.600"
                                            textTransform="uppercase"
                                            border={{ base: '1px solid rgba(0,0,0,0.25)', md: 'none' }}
                                            borderRadius={{ base: '999rem', md: '0' }}
                                            px={{ base: 4, md: 0 }}
                                            py={{ base: 1, md: 0 }}
                                        >
                                            HOW TO PARTICIPATE
                                        </Text>
                                        <Box display={{ base: 'none', md: 'block' }} width="518px" height="1px" bg="rgba(0,0,0,0.20)" />
                                    </VStack>
                                </HStack>


                                <Text
                                    fontFamily="Manrope"
                                    color="#161616"
                                    fontSize={{ base: '1rem', md: '16px' }}
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                    textAlign={{ base: 'center', md: 'left' }}
                                >
                                    Post a Living Hope testimony with the following prompt:
                                </Text>

                                <Text
                                    as="span"
                                    fontFamily="Instrument Serif"
                                    fontStyle="italic"
                                    fontWeight={400}
                                    fontSize={{ base: '2.125rem', md: '30px' }}
                                    color="#982896"
                                    lineHeight="normal"
                                    display="block"
                                    textAlign={{ base: 'center', md: 'left' }}
                                    sx={{
                                        WebkitTextStrokeWidth: '1px',
                                        WebkitTextStrokeColor: '#982896',
                                        WebkitTextFillColor: '#982896',
                                    }}
                                >
                                    My hope was in ______,
                                    <br />
                                    but now, Jesus is my Living Hope because ____.
                                </Text>


                                <Text
                                    fontFamily="Manrope"
                                    color="#161616"
                                    fontSize={{ base: '1rem', md: '16px' }}
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                    textAlign={{ base: 'center', md: 'left' }}
                                >
                                    Include the hashtag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="16px" lineHeight="120.156%">#hmcc_livinghope</Text> and <br />
                                    tag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="16px" lineHeight="120.156%">@HMCC_HK</Text> in your Instagram post!
                                </Text>

                                <HStack pt={4} justifyContent={{ base: 'center', md: 'flex-start' }}>
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

                        <Box
                            display="block"
                            width={{ base: '100%', md: '80%' }}
                            height={{ base: '22rem', md: '21rem' }}
                            border="none"
                            px={{ base: 4, md: 0 }}
                        >
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

                    <Box pt={{ base: 6, md: 12 }} display={{ base: 'none', md: 'block' }}>
                        <Text
                            fontFamily="Instrument Serif"
                            fontSize={{ base: '2.5rem', md: '40px' }}
                            textAlign="center"
                            color="#7586C1"
                            fontStyle="normal"
                            fontWeight={400}
                            lineHeight={{ base: '2.5rem', md: '32px' }}
                            maxW={{ base: '17.5rem', md: '100%' }}
                            mx="auto"
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

                <Box pt={6} display={{ base: 'block', md: 'none' }}>
                    <Text
                        fontFamily="Instrument Serif"
                        fontSize="2.5rem"
                        textAlign="center"
                        color="#7586C1"
                        fontStyle="normal"
                        fontWeight={400}
                        lineHeight="2.5rem"
                        maxW="17.5rem"
                        mx="auto"
                        sx={{
                            WebkitTextStrokeWidth: '0.6px',
                            WebkitTextStrokeColor: '#7586C1',
                            WebkitTextFillColor: '#7586C1',
                        }}
                    >
                        Come experience the <Text as="span" fontStyle="italic">Living Hope</Text> we have in Jesus Christ this Passion Week!
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}