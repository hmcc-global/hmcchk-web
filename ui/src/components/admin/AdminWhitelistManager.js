import { Heading, Text, Container, Textarea, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';

const AdminWhitelistManager = (props) => {
  const { register, handleSubmit, reset } = useForm();

  const submitWhitelist = async (formData) => {
    try {
      let arrayOfEmails = formData.whitelistData.split('\n');
      let { data } = await axios.get('/api/whitelist/get');
      if (data.length === 0) {
        let { status } = await axios.post('/api/whitelist/create', {
          eventName: 'cwc-2022',
          data: arrayOfEmails,
        });
        if (status === 200) alert('Successfully created new whitelist entry');
        reset();
      } else {
        let cwcEntry = data.filter((obj) => obj.eventName === 'cwc-2022');
        if (cwcEntry.length === 1) {
          let { status } = await axios.post('/api/whitelist/update', {
            id: cwcEntry[0].id,
            eventName: 'cwc-2022',
            data: arrayOfEmails,
          });
          if (status === 200) alert('Successfully updated whitelist entry');
          reset();
        }
      }
    } catch (err) {
      alert(
        'Something went wrong with the whitelist update, please contact a system admin'
      );
    }
  };

  return (
    <>
      <Container maxW="container.lg" minHeight="85vh" p={5}>
        <Heading mb={6} alignItems="center">
          Whitelist Manager
        </Heading>
        <Text>
          Insert whitelist here (hardcoded for retreat, don't touch if you don't
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
            Update Retreat Whitelist
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AdminWhitelistManager;
