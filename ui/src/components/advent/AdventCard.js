import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Image,
  useDisclosure,
} from '@chakra-ui/react';

// Replace with actual card data
const CardData = Array.from({ length: 24 }, () => {
  return {
    rotation: Math.random() * 30 - 15,
  };
});

const AdventCard = (props) => {
  const { isActive, date } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const thisCardData = CardData[date - 1];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay filter="blur(8px)" />
        <ModalContent bg="none">
          <Image
            src={
              process.env.PUBLIC_URL + '/images/advent/adventCalendar/card.png'
            }
            w="100%"
            margin="auto"
          />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      {thisCardData && (
        <Image
          src={
            process.env.PUBLIC_URL + '/images/advent/adventCalendar/card.png'
          }
          w="90%"
          position="relative"
          onClick={isActive ? onOpen : null}
          // Rotation
          transform={'rotateZ(' + thisCardData.rotation + 'deg)'}
          // Centering
          margin="auto"
          // Grayscale filter
          filter={isActive ? 'none' : 'grayscale(100%)'}
          // Hover effect
          _hover={isActive ? { boxShadow: '0px 0px 20px #fff' } : {}}
        />
      )}
    </>
  );
};

export default AdventCard;
