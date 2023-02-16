import { Button, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import EasterPrayerModal from './EasterPrayerModal';

const SharePrayerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        SHARE YOUR PRAYER
      </Button>
      <EasterPrayerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SharePrayerButton;