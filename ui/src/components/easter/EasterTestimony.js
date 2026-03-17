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
    const [mobileBracketBounds, setMobileBracketBounds] = useState({ top: 0, bottom: 0 });

    useEffect(() => {
        const updateMobileBracketBounds = () => {
            if (!bracketContainerRef.current || !iconRef.current || !iframeContainerRef.current) return;

            const containerRect = bracketContainerRef.current.getBoundingClientRect();
            const iconRect = iconRef.current.getBoundingClientRect();
            const iframeRect = iframeContainerRef.current.getBoundingClientRect();

            const nextTop = Math.max(0, iconRect.top - containerRect.top);
            const nextBottom = Math.max(0, containerRect.bottom - iframeRect.bottom);

            setMobileBracketBounds((prev) => {
                if (prev.top === nextTop && prev.bottom === nextBottom) return prev;
                return { top: nextTop, bottom: nextBottom };
            });
        };

        updateMobileBracketBounds();

        let observer;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
                updateMobileBracketBounds();
            });

            if (bracketContainerRef.current) observer.observe(bracketContainerRef.current);
            if (iconRef.current) observer.observe(iconRef.current);
            if (iframeContainerRef.current) observer.observe(iframeContainerRef.current);
        }

        window.addEventListener('resize', updateMobileBracketBounds);
        return () => {
            window.removeEventListener('resize', updateMobileBracketBounds);
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <Box as="section" w="100%" py={{ base: 6, md: 16 }} px={{ base: 1, md: 12 }}>
            <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                <Box position="relative" ref={bracketContainerRef}>
                    <Image
                        ref={iconRef}
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
                        fontSize={{ base: '2.25rem', md: '2.5rem' }}
                        lineHeight="97%"
                        textAlign="center"
                        textTransform="uppercase"
                        background="linear-gradient(90deg, #982896 0%, #320D19 100%)"
                        backgroundClip="text"
                        maxW={{ base: '100%', md: '100%' }}
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
                        top={{ base: `${mobileBracketBounds.top}px`, md: '-2rem' }}
                        bottom={{ base: `${mobileBracketBounds.bottom}px`, md: '-3.75rem' }}
                        width={{ base: '0.6875rem', md: '1.75rem' }}
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
                                height="80%"
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
                        right={{ base: 0, md: -6 }}
                        top={{ base: `${mobileBracketBounds.top}px`, md: '-2rem' }}
                        bottom={{ base: `${mobileBracketBounds.bottom}px`, md: '-3.75rem' }}
                        width={{ base: '0.6875rem', md: '1.75rem' }}
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
                        templateColumns={{ base: '1fr', lg: '1fr 420px' }}
                        gap={{ base: 8, md: 12 }}
                        alignItems="center"
                    >
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
                                            border={{ base: '1px solid #7D736E', md: 'none' }}
                                            borderRadius={{ base: '9px', md: '0' }}
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
                                    <br /><br />
                                    *Make your account public so that people can see your testimony from the hashtag!
                                </Text>

                                <HStack pt={4} justifyContent={{ base: 'center', md: 'flex-start' }}>
                                    <Link href="https://www.instagram.com/" isExternal _hover={{ textDecoration: 'none' }}>
                                        <Button
                                            rightIcon={<ArrowForwardIcon transition="transform .18s" _groupHover={{ transform: 'translateX(6px)' }} />}
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

                        <Box
                            ref={iframeContainerRef}
                            display="block"
                            width={{ base: '100%', lg: '80%' }}
                            height={{ base: '22rem', md: '21rem' }}
                            border="none"
                            px={{ base: 4, md: 0 }}
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

                <Box>
                    <Text
                        fontFamily="Instrument Serif"
                        fontSize={{ base: '1.5rem', md: '40px' }}
                        textAlign="center"
                        color="#7586C1"
                        fontStyle="normal"
                        fontWeight={400}
                        maxW={{ base: '100%', md: '100%' }}
                        mx="auto"
                        sx={{
                            WebkitTextStrokeWidth: '0.6px',
                            WebkitTextStrokeColor: '#7586C1',
                            WebkitTextFillColor: '#7586C1',
                        }}
                    >
                        Come experience the <Text as="span" fontStyle="italic">Living Hope</Text> <br/> we have in Jesus Christ this Passion Week!
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}