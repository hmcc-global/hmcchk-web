import React, { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Container,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Checkbox,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

export default function FundraiseContainer(props) {
  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Fundraise Manager
      </Heading>
    </Container>
  );
}
