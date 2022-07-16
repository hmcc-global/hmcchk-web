import React, { useState, useRef } from 'react';
import {
  Button,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { customAxios as axios } from '../../helpers/customAxios';
import { TriangleDownIcon } from '@chakra-ui/icons';

const fieldMapping = {
  'address': 'Address',
  'campus' : 'Campus',
  'ministryTeam': 'Ministry Team',
  'lifeGroup': 'LIFE Group'
};

const ResetUserFields = (props) => {
  const [value, setValue] = useState('');
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Select
        placeholder="Reset"
        width="45%"
        icon={<TriangleDownIcon />}
        variant="filled"
        value={value}
        onChange={handleChange}
      >
        <option value="address">{fieldMapping['address']}</option>
        <option value="campus">{fieldMapping['campus']}</option>
        <option value="ministryTeam">{fieldMapping['ministryTeam']}</option>
        <option value="lifeGroup">{fieldMapping['lifeGroup']}</option>
      </Select>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to reset <b>{fieldMapping[value]}</b>? <p style={{color: 'red'}}>You can't undo this
              action afterwards.</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => resetUsers(value)}
                ml={3}
              >
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ResetUserFields ;
