import React, { useState } from 'react';
import {
  Dialog,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  ModalHeader,
  CloseButton,
  ModalBody,
  Input,
} from '@chakra-ui/react';

export default function AdminPaymentDataModal(props) {
  const { modalOpen, setModalOpen, modalType, modalTitle, handler } = props;

  const [value, setValue] = useState('');

  const saveHandler = (e) => {
    if (e) e.preventDefault();
    handler(value);
    setValue('');
    setModalOpen(false);
  };

  const closeHandler = () => {
    setValue('');
    setModalOpen(false);
  };

  return (
    <Dialog.Root
      open={modalOpen}
      onOpenChange={(next) => {
        if (!next) closeHandler();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <ModalHeader>{modalTitle}</ModalHeader>
          <Dialog.CloseTrigger asChild>
            <CloseButton aria-label="Close" />
          </Dialog.CloseTrigger>
          <form
            onSubmit={(e) => {
              saveHandler(e);
            }}
          >
            <Dialog.Body as={ModalBody}>
              <Input
                type={modalType}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={() => saveHandler()}
              >
                Save
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
