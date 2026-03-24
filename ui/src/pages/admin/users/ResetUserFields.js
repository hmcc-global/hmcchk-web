import React, { useState, useRef } from 'react';
import { Button, NativeSelect, useDisclosure, Dialog, Portal } from '@chakra-ui/react';
import { customAxios as axios } from '../../helpers/customAxios';

const fieldMapping = {
  address: 'Address',
  campus: 'Campus',
  ministryTeam: 'Ministry Team',
  lifeGroup: 'LIFE Group',
  lifestage: 'Lifestage',
  countryOfOrigin: 'Country of Origin',
};

const ResetUserFields = (props) => {
  const [value, setValue] = useState('');
  const cancelRef = useRef();
  const { open, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    if (e.target.value !== '') {
      setValue(e.target.value);
      onOpen();
    }
  };

  const resetUsers = async (value) => {
    try {
      await axios.post('/api/users/reset', {
        field: value,
      });
      props.checkIfUpdated();
    } catch (err) {
      console.log(err);
    }
    onClose();
  };
  return (
    <>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Reset"
          width="45%"
          variant="filled"
          value={value}
          onValueChange={handleChange}>
          <option value="address">{fieldMapping['address']}</option>
          <option value="campus">{fieldMapping['campus']}</option>
          <option value="ministryTeam">{fieldMapping['ministryTeam']}</option>
          <option value="lifeGroup">{fieldMapping['lifeGroup']}</option>
          <option value="lifestage">{fieldMapping['lifestage']}</option>
          <option value="countryOfOrigin">
            {fieldMapping['countryOfOrigin']}
          </option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Dialog.Root
        open={open}
        initialFocusEl={() => cancelRef.current}
        role='alertdialog'
        onOpenChange={e => {
          if (!e.open) {
            onClose();
          }
        }}>
        <Portal>

          <Dialog.Backdrop>
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header fontSize="lg" fontWeight="bold">
                  Reset
                </Dialog.Header>
                <Dialog.Body>
                  Are you sure you want to reset <b>{fieldMapping[value]}</b>?{' '}
                  <p style={{ color: 'red' }}>
                    You can't undo this action afterwards.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorPalette="red"
                    onClick={() => resetUsers(value)}
                    ml={3}
                  >
                    Reset
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Backdrop>

        </Portal>
</Dialog.Root>
    </>
  );
};

export default ResetUserFields;
