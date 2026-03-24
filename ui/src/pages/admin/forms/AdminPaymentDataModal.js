import React, {useState} from 'react';
import { Button, Input, Dialog, Portal } from '@chakra-ui/react';

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
      <Dialog.Root open={modalOpen} onOpenChange={e => {
        if (!e.open) {
          closeHandler();
        }
      }}>
        <Portal>

          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>{modalTitle}</Dialog.Header>
              <Dialog.CloseTrigger />
              <form onSubmit={e => {saveHandler(e)}}>
                <Dialog.Body>
                  <Input
                    type={modalType}
                    value={value}
                    onValueChange={(e) => setValue(e.target.value)}
                  />
                </Dialog.Body>

                <Dialog.Footer>
                  <Button type='submit' colorPalette='blue' mr={3} onClick={() => saveHandler()}>
                    Save
                  </Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>

        </Portal>
      </Dialog.Root>
    </>
  );
}