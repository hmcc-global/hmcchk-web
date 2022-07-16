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

const ResetUserFields = (props) => {
  const [value, setValue] = useState(null);
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    setValue(e.target.value);
    onOpen();
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
        <option value="address">Address</option>
        <option value="campus">Campus</option>
        <option value="ministryTeam">Ministry Team</option>
        <option value="lifeGroup">LIFE Group</option>
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
              Are you sure you want to reset {value}? You can't undo this
              action afterwards.
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
