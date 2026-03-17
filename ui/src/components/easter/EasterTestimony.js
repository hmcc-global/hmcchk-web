import { useEffect, useRef, useState } from 'react';
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
    const bracketContainerRef = useRef(null);
    const iconRef = useRef(null);
    const iframeContainerRef = useRef(null);
    const [bracketBounds, setBracketBounds] = useState({ top: 0, bottom: 0 });

    useEffect(() => {
        const updateBracketBounds = () => {
            if (!bracketContainerRef.current || !iconRef.current || !iframeContainerRef.current) return;

            const containerEl = bracketContainerRef.current;
            const iconEl = iconRef.current;
            const iframeEl = iframeContainerRef.current;

            const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
            const iconHeight = iconEl.offsetHeight || 0;
            const topOffsetFactor =
                viewportWidth >= 1280 ? 4 : viewportWidth >= 992 ? 0.8 : viewportWidth >= 768 ? 0.6 : viewportWidth >= 400 ? 5 : 3;
            const dynamicTopOffset = Math.round(iconHeight * topOffsetFactor);

            const nextTop = Math.max(0, iconEl.offsetTop + dynamicTopOffset);
            const nextBottom = Math.max(
                0,
                containerEl.offsetHeight - (iframeEl.offsetTop + iframeEl.offsetHeight)
            );

            setBracketBounds((prev) => {
                if (prev.top === nextTop && prev.bottom === nextBottom) return prev;
                return { top: nextTop, bottom: nextBottom };
            });
        };

        updateBracketBounds();

        let observer;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
                updateBracketBounds();
            });

            if (bracketContainerRef.current) observer.observe(bracketContainerRef.current);
            if (iconRef.current) observer.observe(iconRef.current);
            if (iframeContainerRef.current) observer.observe(iframeContainerRef.current);
        }

        window.addEventListener('resize', updateBracketBounds);
        return () => {
            window.removeEventListener('resize', updateBracketBounds);
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <Box as="section" w="100%" py={{ base: 6, md: 10, lg: 16 }} px={{ base: 1, md: 6, lg: 12 }}>
            <VStack spacing={{ base: 6, md: 7, lg: 8 }} align="stretch">
                <Box position="relative" ref={bracketContainerRef}>
                    <Image
                        ref={iconRef}
                        src={process.env.PUBLIC_URL + '/images/easter/easter_testimony_icon.png'}
                        alt="icon"
                        mx="auto"
                        display="block"
                        w={{ base: '3rem', md: '4.5rem', lg: '6rem' }}
                        mb={{ base: 3, md: 4, lg: 6 }}
                    />
                    <Heading
                        as="h2"
                        mt={{ base: 2, md: 3, lg: 4 }}
                        fontFamily="Instrument Serif"
                        fontStyle="italic"
                        fontWeight={400}
                        fontSize={{ base: '2.25rem', md: '2.375rem', lg: '2.5rem' }}
                        lineHeight="97%"
                        textAlign="center"
                        textTransform="uppercase"
                        background="linear-gradient(90deg, #982896 0%, #320D19 100%)"
                        backgroundClip="text"
                        maxW={{ base: '100%', md: '36rem', lg: '100%' }}
                        mx="auto"
                        pb={{ base: 4, md: 3, lg: 2 }}
                        sx={{
                            WebkitTextStrokeWidth: '0.075rem',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        WE ARE ALSO SHARING TESTIMONIES!
                    </Heading>
                    <Box
                        position="absolute"
                        left={{ base: 0, md: -2, lg: -4, xl: -6 }}
                        top={`${bracketBounds.top / 16}rem`}
                        bottom={`${bracketBounds.bottom / 16}rem`}
                        width={{ base: '0.6875rem', md: '1rem', lg: '1.25rem', xl: '1.75rem' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box display={{ base: 'block', md: 'none' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="100%"
                                viewBox="0 0 11 961"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M10.5 0.5C4.97715 0.5 0.5 4.97716 0.5 10.5V950.5C0.5 956.023 4.97715 960.5 10.5 960.5" stroke="#A690B4" />
                            </svg>
                        </Box>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="100%"
                                viewBox="0 0 24 581"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M23.5 0.5C10.7975 0.5 0.5 10.7974 0.5 23.5V557.5C0.5 570.203 10.7975 580.5 23.5 580.5" stroke="#B8A9C6" strokeWidth="1" />
                            </svg>
                        </Box>
                    </Box>

                    <Box
                        position="absolute"
                        right={{ base: 0, md: -2, lg: -4, xl: -6 }}
                        top={`${bracketBounds.top / 16}rem`}
                        bottom={`${bracketBounds.bottom / 16}rem`}
                        width={{ base: '0.6875rem', md: '1rem', lg: '1.25rem', xl: '1.75rem' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box display={{ base: 'block', md: 'none' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="100%"
                                viewBox="0 0 11 961"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M0 0.5C5.52285 0.5 10 4.97716 10 10.5V950.5C10 956.023 5.52285 960.5 0 960.5" stroke="#A690B4" />
                            </svg>
                        </Box>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="100%"
                                viewBox="0 0 24 581"
                                preserveAspectRatio="none"
                                fill="none"
                                aria-hidden="true"
                                focusable="false"
                                style={{ transform: 'scaleX(-1)' }}
                            >
                                <path d="M23.5 0.5C10.7975 0.5 0.5 10.7974 0.5 23.5V557.5C0.5 570.203 10.7975 580.5 23.5 580.5" stroke="#B8A9C6" strokeWidth="1" />
                            </svg>
                        </Box>
                    </Box>

                    <Grid
                        position="relative"
                        templateColumns={{ base: '1fr', xl: '1fr 26.25rem' }}
                        gap={{ base: 8, md: 10, lg: 12 }}
                        alignItems={{ base: 'center', md: 'start' }}
                    >
                        <Box bg="transparent" borderRadius="md" p={{ base: 3, md: 6, lg: 8 }}>
                            <Stack spacing={{ base: 4, md: 5, lg: 6 }}>
                                <HStack justifyContent={{ base: 'center', md: 'space-between' }} alignItems="start">
                                    <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
                                        <Text
                                            fontSize="sm"
                                            letterSpacing="widest"
                                            fontWeight="600"
                                            color="gray.600"
                                            textTransform="uppercase"
                                            border={{ base: '0.0625rem solid #7D736E', md: 'none' }}
                                            borderRadius={{ base: '0.5625rem', md: '0' }}
                                            px={{ base: 4, md: 0 }}
                                            py={{ base: 1, md: 0 }}
                                        >
                                            HOW TO PARTICIPATE
                                        </Text>
                                        <Box display={{ base: 'none', md: 'block' }} width={{ md: '100%', lg: '32.375rem' }} height="0.0625rem" bg="rgba(0,0,0,0.20)" />
                                    </VStack>
                                </HStack>


                                <Text
                                    fontFamily="Manrope"
                                    color="#161616"
                                    fontSize={{ base: '1rem', md: '1rem' }}
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
                                    fontSize={{ base: '2.125rem', md: '2rem', lg: '1.875rem' }}
                                    color="#982896"
                                    lineHeight="normal"
                                    display="block"
                                    textAlign={{ base: 'center', md: 'left' }}
                                    sx={{
                                        WebkitTextStrokeWidth: '0.0625rem',
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
                                    fontSize={{ base: '1rem', md: '1rem' }}
                                    fontStyle="normal"
                                    fontWeight={400}
                                    lineHeight="120.156%"
                                    textAlign={{ base: 'center', md: 'left' }}
                                >
                                    Include the hashtag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="1rem" lineHeight="120.156%">#hmcc_livinghope</Text> and <br />
                                    tag <Text as="span" fontWeight={700} fontFamily="Manrope" fontSize="1rem" lineHeight="120.156%">@HMCC_HK</Text> in your Instagram post!
                                    <br /><br />
                                    *Make your account public so that people can see your testimony from the hashtag!
                                </Text>

                                <HStack pt={4} justifyContent={{ base: 'center', md: 'flex-start' }}>
                                    <Link href="https://www.instagram.com/" isExternal _hover={{ textDecoration: 'none' }}>
                                        <Button
                                            rightIcon={<ArrowForwardIcon transition="transform .18s" _groupHover={{ transform: 'translateX(0.375rem)' }} />}
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
                                            _hover={{ opacity: 0.95, transform: 'translateY(-0.1875rem)', bg: '#5a002a', boxShadow: 'lg' }}
                                            role="group"
                                        >
                                            View More on Instagram
                                        </Button>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Box>

                        <Box
                            ref={iframeContainerRef}
                            display="block"
                            width={{ base: '100%', md: '58%', lg: '52%', xl: '80%' }}
                            height={{ base: '24rem', md: '20rem', lg: '22rem', xl: '22rem' }}
                            border="none"
                            px={{ base: 2, md: 0 }}
                            mt={{ base: 0, xl: 8 }}
                            mx="auto"
                        >
                            <iframe
                                title="instagram"
                                src="https://widget.tagembed.com/319774?website=11"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                }}
                            ></iframe>
                        </Box>
                    </Grid>

                </Box>

                <Box pt={{ base: 0, md: 8 }}>
                    <Text
                        fontFamily="Instrument Serif"
                        fontSize={{ base: '1.5rem', md: '2.25rem', lg: '2.5rem' }}
                        textAlign="center"
                        color="#7586C1"
                        fontStyle="normal"
                        fontWeight={400}
                        lineHeight={{ base: '1.9rem', md: '2.5rem', lg: '2rem' }}
                        maxW={{ base: '100%', md: '100%' }}
                        mx="auto"
                        sx={{
                            WebkitTextStrokeWidth: '0.0375rem',
                            WebkitTextStrokeColor: '#7586C1',
                            WebkitTextFillColor: '#7586C1',
                        }}
                    >
                        Come experience the <Text as="span" fontStyle="italic">Living Hope</Text>
                        <Box as="br" display={{ base: 'block', md: 'none' }} />
                        {' '}we have in Jesus Christ this Passion Week!
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}