import { Button, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import EasterPrayerModal from './EasterPrayerModal';

const SubmitPrayerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        textStyle="dm_sans"
        borderRadius={10}
        my={3}
        size="lg"
        w="100%"
        leftIcon={<EditIcon w={7} h={8} />}
        bg="#C11553"
        color="white"
        _hover={{ bg: 'white', color: '#C11553' }}
        onClick={onOpen}
        gap="13px"
        px="7"
        fontSize={{ base: 'md', md: 'lg' }}
        boxShadow="0px 8px 15px rgba(0, 0, 0, 0.4)"
      >
        SUBMIT A PRAYER
      </Button>
      <EasterPrayerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SubmitPrayerButton;
