import { Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import TextTestimonyModal from './TextTestimonyModal';

const ShareTestimonyButton = ({ onOpen, isOpen, onClose }) => {
  return (
    <>
      <Button
        borderRadius={10}
        my={3}
        size="lg"
        w="100%"
        leftIcon={<EditIcon />}
        bg="#8D2C72"
        color="white"
        _hover={{ bg: 'white', color: '#8D2C72' }}
        onClick={onOpen}
        boxShadow="0px 8px 15px rgba(0, 0, 0, 0.4)"
      >
        SHARE YOUR TESTIMONY
      </Button>
      <TextTestimonyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ShareTestimonyButton;
