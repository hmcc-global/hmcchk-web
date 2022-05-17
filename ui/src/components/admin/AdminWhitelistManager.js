import {
  Heading,
  Text,
  Container,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';

const AdminWhitelistManager = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  const submitWhitelist = async (formData) => {
    try {
      let arrayOfEmails = formData.whitelistData.split('\n');
      let { data } = await axios.get('/api/whitelist/get');
      if (data.length === 0) {
        let { status } = await axios.post('/api/whitelist/create', {
          eventName: 'ignite-2022',
          data: arrayOfEmails,
        });
        if (status === 200) {
          toast({
            title: 'Success!',
            description: 'Whitelist created.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
        reset();
      } else {
        let igniteEntry = data.filter((obj) => obj.eventName === 'ignite-2022');
        if (igniteEntry.length === 1) {
          let { status } = await axios.post('/api/whitelist/update', {
            id: igniteEntry[0].id,
            eventName: 'ignite-2022',
            data: arrayOfEmails,
          });
          if (status === 200) {
            toast({
              title: 'Success!',
              description: 'Whitelist updated.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
          reset();
        }
      }
    } catch (err) {
      toast({
        title: 'Something went wrong.',
        description: 'Please contact a system admin',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container maxW="container.lg" minHeight="85vh" p={5}>
        <Heading mb={6} alignItems="center">
          Whitelist Manager
        </Heading>
        <Text>
          Insert whitelist here (hardcoded for ignite, don't touch if you don't
          know what you're doing)
        </Text>
        <form onSubmit={handleSubmit(submitWhitelist)}>
          <Textarea
            {...register('whitelistData', {
              required: 'Whitelist data is required',
            })}
            mt={3}
          ></Textarea>
          <Button type="submit" mt={5}>
            Update Whitelist
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AdminWhitelistManager;
