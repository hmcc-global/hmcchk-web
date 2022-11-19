import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Stack,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react';
import { customAxios as axios } from '../../helpers/customAxios';
import AdminGivingTuesdayCategoryForm from './AdminGivingTuesdayCategoryForm';

// Change this to query a different year (model has to pre-exist in DB)
const currYear = 2022;

const AdminGivingTuesdayContainer = () => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [givingDetails, setGivingDetails] = useState({});

  const updateHandler = async () => {
    try {
      const res = await axios.post(
        `/api/giving-tuesday/update-giving-tuesday-data`,
        {
          categories: givingDetails.categories,
          year: currYear,
        }
      );
      if (res.status === 200) return true;
    } catch (err) {
      toast({
        description: err,
        status: 'error',
        duration: 5000,
      });
      console.log(err);
      return false;
    }
  };

  const handleFieldChange = (key) => (newData) => {
    const newGivingDetails = { ...givingDetails };
    const foundIndex = newGivingDetails.categories.findIndex((detail) => {
      return detail.key === key;
    });

    newGivingDetails.categories[foundIndex] = newData;
    setGivingDetails(newGivingDetails);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsSaving(true);
    let success = false;
    success = await updateHandler();

    if (success) {
      toast({
        description: 'Saved',
        status: 'success',
        duration: 5000,
      });
      setIsLoading(true);
      await getData();
    }
    setIsSaving(false);
  };

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/api/giving-tuesday/get-giving-tuesday-data`,
        {
          params: {
            year: currYear,
          },
        }
      );

      if (data) {
        setGivingDetails(data);
      }
    } catch (err) {
      toast({
        description: err,
        status: 'error',
        duration: 5000,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container w="100%" maxW="100%">
      {!isLoading && (
        <>
          <Heading as="h5" mb={5}>
            Giving Tuesday Manager
          </Heading>
          <Text>Year: {givingDetails.year}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'red' }}>
            ONLY the 'Total Giving' amount and givers will be shown during
            Giving Tuesday.
          </Text>
          <form onSubmit={onSubmit}>
            <Stack direction={['column']} w="100%">
              {givingDetails.categories.map((category) => (
                <AdminGivingTuesdayCategoryForm
                  key={category.key}
                  categoryDetails={category}
                  onFieldChange={handleFieldChange(category.key)}
                />
              ))}
            </Stack>
            <Button
              mt={5}
              colorScheme="green"
              type="submit"
              w="full"
              isLoading={isSaving}
            >
              UPDATE
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default AdminGivingTuesdayContainer;
