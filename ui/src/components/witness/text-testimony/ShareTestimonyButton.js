import { Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import TextTestimonyModal from './TextTestimonyModal';

const ShareTestimonyButton = ({ onOpen, isOpen, onClose }) => {
  return (
    <>
      <Button
        borderRadius={15}
        my={3}
        size="lg"
        w="100%"
        leftIcon={<EditIcon />}
        bg="#8D2C72"
        color="white"
        _hover={{ bg: 'white', color: '#8D2C72' }}
        onClick={onOpen}
      >
        SHARE YOUR TESTIMONY
      </Button>
      <TextTestimonyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ShareTestimonyButton;
