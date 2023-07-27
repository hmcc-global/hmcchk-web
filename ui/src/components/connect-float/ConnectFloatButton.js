import { useState } from 'react';
import { Box, HStack, IconButton, useDisclosure } from '@chakra-ui/react';
import { IoChatbubblesSharp } from 'react-icons/io5';
import ConnectModal from './ConnectModal';
import './connectfloat.css';

const ConnectFloatButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      className="connectposition"
      position="absolute"
      right={['2rem', '3rem']}
      overflow="hidden"
      zIndex={999}
    >
      <IconButton
        bg="#0628A3"
        w="0"
        size="lg"
        isRound
        icon={
          <HStack
            className="content"
            transition="all 0.5s"
            marginLeft={isHover ? '0%' : '240%'}
          >
            <IoChatbubblesSharp color="#fff" />
            <Box
              as="span"
              fontSize="sm"
              opacity={isHover ? 1 : 0}
              transition="opacity 0.5s"
            >
              Connect with us
            </Box>
          </HStack>
        }
        onClick={onOpen}
        transition="width 0.5s"
        colorScheme="messenger"
        _hover={{
          width: '175px',
          transition: 'width 0.5s',
        }}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className="connect-float-btn"
      ></IconButton>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ConnectFloatButton;
