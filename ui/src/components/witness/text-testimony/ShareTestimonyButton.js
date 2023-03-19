import { Button, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import TextTestimonyModal from './TextTestimonyModal';

const ShareTestimonyButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        borderRadius={10}
        my={3}
        size="lg"
        w="100%"
        leftIcon={<EditIcon w={7} h={8} />}
        bg="#C11553"
        color="white"
        _hover={{ bg: 'white', color: '#8D2C72' }}
        onClick={onOpen}
        boxShadow="0px 8px 15px rgba(0, 0, 0, 0.4)"
        gap="13px"
        px="7"
        fontSize={{ base: 'md', md: 'lg' }}
        position="inherit"
      >
        SHARE YOUR TESTIMONY
      </Button>
      <TextTestimonyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ShareTestimonyButton;
