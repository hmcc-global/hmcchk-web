import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';

const AdminGivingTuesdayCategoryForm = ({ categoryDetails, onFieldChange }) => {
  const { name, amount, givers } = categoryDetails;

  const onAmountChange = (newAmount) => {
    onFieldChange({
      ...categoryDetails,
      amount: newAmount,
    });
  };

  const onGiversChange = (newGivers) => {
    onFieldChange({
      ...categoryDetails,
      givers: newGivers,
    });
  };

  return (
    <Box style={{ border: '1px solid gray', borderRadius: 10 }} my={5} p={5}>
      <Text mb={5} style={{ fontWeight: 'bold' }}>
        {name}
      </Text>
      <FormControl isRequired>
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        <FormErrorMessage>Amount is required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired mt={2}>
        <FormLabel>Givers</FormLabel>
        <Input
          type="number"
          value={givers}
          onChange={(e) => onGiversChange(e.target.value)}
        />
        <FormErrorMessage>Givers is required</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default AdminGivingTuesdayCategoryForm;
