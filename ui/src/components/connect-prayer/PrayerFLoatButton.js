import { useState } from "react";
import {Box, HStack,IconButton,useMediaQuery}  from '@chakra-ui/react'
import {LiaPrayingHandsSolid} from 'react-icons/lia'

const PrayerFloatButton = (props) => {
    const [isHover,setIsHover] = useState(false);
    const [isLargerThan480px] = useMediaQuery("(min-width: 480px)");

    return (
        <Box
            position="absolute"
            bottom={['5.5rem', '6.5rem']}
            right={['2rem', '3rem']}
            overflow="hidden"
            zIndex={999}
        >
            <IconButton
                bg="#A5CBFF"
                w = "0"
                size="lg"
                isRound
                icon = {
                    <HStack
                        className="content"
                        transition="all 0.5s"
                        marginLeft={isHover ? '0%' : '200%'}
                    >
                        <LiaPrayingHandsSolid color="#172848" />
                        <Box    
                            as="span"
                            fontSize="sm"
                            opacity={isHover ? 1 : 0}
                            transition="opacity 0.5s"
                            color="#172848"
                        >
                            Need Prayer?
                        </Box>
                    </HStack>
                }
                transition = "width 0.5s"
                colorScheme="messenger"
                _hover={{
                    width: isLargerThan480px ?'175px' : "0",
                    transition: 'width 0.5s',
                }}
                onMouseOver={() => isLargerThan480px && setIsHover(true)}
                onMouseOut={() => isLargerThan480px && setIsHover(false)}
                onClick={() => window.open("https://forms.gle/6jasxuLNZt5MVXAy8")}
                className="prayer-float-btn"
            > </IconButton>   
        </Box>
    )
}

export default PrayerFloatButton;