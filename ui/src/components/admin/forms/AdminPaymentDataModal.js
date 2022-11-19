import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
} from '@chakra-ui/react';

export default function AdminPaymentDataModal(props) {
  const { modalOpen, setModalOpen, modalType, modalTitle, handler } = props;

  const [value, setValue] = useState('');
  
  const saveHandler = (e) => {
    if (e) 
      e.preventDefault();
    handler(value);
    setValue('');
    setModalOpen(false);
  }

  const closeHandler = () => {
    setValue('');
    setModalOpen(false);
  }

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => closeHandler()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={e => {saveHandler(e)}}>
            <ModalBody>
              <Input
                type={modalType}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button type='submit' colorScheme='blue' mr={3} onClick={() => saveHandler()}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}