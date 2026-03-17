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
                <Box position="relative" sx={{ marginLeft: "-12px", marginRight: "-12px" }}>
                    <Image
                        src={process.env.PUBLIC_URL + '/images/easter/easter_testimony_icon.png'}
                        alt="icon"
                        mx="auto"
                        display="block"
                        w={{ base: '3rem', md: '6rem' }}
                        mb={{ base: 3, md: 6 }}
                    />
                    <Heading
                        as="h2"
                        mt={{ base: 2, md: 4 }}
                        fontFamily="Instrument Serif"
                        fontStyle="italic"
                        fontWeight={400}
                        fontSize={{ base: '1.625rem', md: '2.5rem' }}
                        lineHeight="97%"
                        textAlign="center"
                        textTransform="uppercase"
                        background="linear-gradient(90deg, #982896 0%, #320D19 100%)"
                        backgroundClip="text"
                        maxW={{ base: '16.25rem', md: '100%' }}
                        mx="auto"
                        pb={{ base: 4, md: 2 }}
                        sx={{
                            WebkitTextStrokeWidth: '1px',
                            // WebkitTextStrokeColor: '#000',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        WE ARE ALSO SHARING TESTIMONIES!
                    </Heading>
                    <Box
                        position="absolute"
                        left={{ base: 0, md: -6 }}
                        top={{ base: '-1.5rem', md: '6%' }}
                        bottom={{ base: 0, md: '6%' }}
                        width={{ base: '0.6875rem', md: '1.75rem' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflow="visible"
                    >
                        <Box display={{ base: 'block', md: 'none' }} height="70%">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="100%"
                                viewBox="0 0 11 707"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M10.5 0.5C4.97715 0.5 0.5 4.97717 0.5 10.5V696.5C0.5 702.023 4.97715 706.5 10.5 706.5" stroke="#A690B4" />
                            </svg>
                        </Box>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="100%"
                                viewBox="0 0 24 521"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M12.5 0.5C5.87258 0.5 0.5 5.87258 0.5 12.5V508.5C0.5 515.127 5.87258 520.5 12.5 520.5" stroke="#B8A9C6" strokeWidth="1" />
                            </svg>
                        </Box>
                    </Box>

                    <Box
                        position="absolute"
                        right={{ base: 0, md: -6 }}
                        top={{ base: '-1.5rem', md: '6%' }}
                        bottom={{ base: 0, md: '6%' }}
                        width={{ base: '0.6875rem', md: '1.75rem' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflow="visible"
                    >
                        <Box display={{ base: 'block', md: 'none' }} height="70%">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="100%"
                                viewBox="0 0 11 707"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M-2.68221e-07 0.5C5.52285 0.5 10 4.97717 10 10.5V696.5C10 702.023 5.52285 706.5 -2.68221e-07 706.5" stroke="#A690B4" />
                            </svg>
                        </Box>

                        <Box display={{ base: 'none', md: 'block' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="100%"
                                viewBox="0 0 24 521"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                                style={{ transform: 'scaleX(-1)' }}
                            >
                                <path d="M12.5 0.5C5.87258 0.5 0.5 5.87258 0.5 12.5V508.5C0.5 515.127 5.87258 520.5 12.5 520.5" stroke="#B8A9C6" strokeWidth="1" />
                            </svg>
                        </Box>

                    </Box>


                    <Grid templateColumns={{ base: '1fr', lg: '1fr 420px' }} gap={{ base: 8, md: 12 }} alignItems="center">
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
                                    fontSize={{ base: '0.875rem', md: '1rem' }}
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
                                    fontSize={{ base: '1.25rem', md: '1.875rem' }}
                                    color="#982896"
                                    lineHeight={{ base: '26px', md: 'normal' }}
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
                                    fontSize={{ base: '0.875rem', md: '1.0625rem' }}
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                    textAlign={{ base: 'center', md: 'left' }}
                                >
                                    Include the hashtag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="16px" lineHeight="120.156%">#hmcc_livinghope</Text> and <br />
                                    tag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="16px" lineHeight="120.156%">@HMCC_HK</Text> in your Instagram post!
                                </Text>
                                {/*  */}
                                <Text
                                    fontFamily="Manrope"
                                    color="#161616"
                                    fontSize={{ base: '0.812rem', md: '0.8125rem' }}
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                    textAlign={{ base: 'center', md: 'left' }}
                                    mt={2}
                                >
                                    *Make your account public so that people can see your testimony from the hashtag!
                                </Text>
                                {/*  */}

                                <HStack pt={4} justifyContent={{ base: 'center', md: 'flex-start' }}>
                                    <Link href="https://www.instagram.com/explore/search/keyword/?q=%23hmcc_livinghope" isExternal _hover={{ textDecoration: 'none' }}>
                                        <Button
                                            rightIcon={<ArrowForwardIcon transition="transform .18s" _groupHover={{ transform: 'translateX(6px)' }} />}
                                            bgColor={"#410025"}
                                            color="#FFF"
                                            borderRadius="full"
                                            px={6}
                                            py={5}
                                            fontFamily="Manrope"
                                            fontSize="1rem"
                                            fontWeight={700}
                                            lineHeight="normal"
                                            textAlign="center"
                                            transition="transform .18s ease, background-color .18s ease, box-shadow .18s ease"
                                            _hover={{ opacity: 0.95, transform: 'translateY(-3px)', bg: '#5a002a', boxShadow: 'lg' }}
                                            role="group"
                                        >
                                            View More on Instagram
                                        </Button>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Box>

                        {/* the new taggbox */}
                        <Box
                            display="block"
                            width={{ base: '100%', lg: '80%' }}
                            height={{ base: '22rem', md: '21rem' }}
                            border="none"
                            px={{ base: 4, md: 0 }}
                        >
                            <iframe
                                title="instagram"
                                src="https://widget.tagembed.com/319774?website=11"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                }}
                            ></iframe>
                        </Box>

                    </Grid>
                    <Box pt={{ base: 3, md: 12 }} display={{ base: 'block', md: 'block' }}>
                        <Text
                            fontFamily="Instrument Serif"
                            fontSize={{ base: '1.725rem', md: '2.5rem' }}
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
            </VStack>
        </Box>
    );
}