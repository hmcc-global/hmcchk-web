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
    const newData = { ...categoryDetails };
    onFieldChange({
      ...newData,
      amount: newAmount,
    });
  };

  const onGiversChange = (newGivers) => {
    const newData = { ...categoryDetails };
    onFieldChange({
      ...newData,
      givers: newGivers,
    });
  };

  return (
    <Box
      style={{
        border: '1px solid gray',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
      }}
      p={5}
    >
      <Text mb={5} style={{ fontWeight: 'bold' }}>
        {name}
      </Text>
      <FormControl isRequired>
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.valueAsNumber)}
        />
        <FormErrorMessage>Amount is required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired mt={2}>
        <FormLabel>Givers</FormLabel>
        <Input
          type="number"
          value={givers}
          onChange={(e) => onGiversChange(e.target.valueAsNumber)}
        />
        <FormErrorMessage>Givers is required</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default AdminGivingTuesdayCategoryForm;
