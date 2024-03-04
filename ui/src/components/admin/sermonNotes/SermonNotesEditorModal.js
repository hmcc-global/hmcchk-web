import React from 'react';
import { Heading, Container, FormControl, Box, FormLabel, Input, FormHelperText, Grid, Stack, Button} from '@chakra-ui/react';
import { BsGearWideConnected } from 'react-icons/bs';

const SermonNotesEditorModal = (props) => {
  const { user } = props;


  return (
    <>
      <Container borderColor="#FOF357" borderWidth={1} maxW="container.xl" borderRadius={10} p={6}>
        <Box>
          <form>
            <Stack gap={6}>
            <FormControl isRequired>
              <FormLabel color="#656565" fontWeight="bold">
                Title
                </FormLabel>
                <Input>
                </Input>
                <FormHelperText color="red">
                  Text is required
                </FormHelperText>
            </FormControl>
            <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={6}>

              <FormControl>
                <FormLabel color="#656565" fontWeight="bold">
                  Subtitle
                </FormLabel>
                <Input></Input>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#656565" fontWeight="bold">
                    Service Type
                    </FormLabel>
                    <Input></Input>
                    <FormHelperText color="red"> Service type is required </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel color="#656565" fontWeight="bold">
                  Sermon Series
                </FormLabel>
                <Input></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#656565" fontWeight="bold">
                  Service Verse
                </FormLabel>
                <Input></Input>
                <FormHelperText color="red"> Verse is required </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#656565" fontWeight="bold">
                  Author
                </FormLabel>
                <Input></Input>
                <FormHelperText color="red"> Author is required </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#656565" fontWeight="bold">
                  Sermon Date
                </FormLabel>
                <Input></Input>
                <FormHelperText color="red"> Sermon Date is required </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel color="#656565" fontWeight="bold">
                  Sermon Link
                </FormLabel>
                <Input></Input>
              </FormControl>
              <FormControl>
                <FormLabel color="#656565" fontWeight="bold">
                  Image Link
                </FormLabel>
                <Input></Input>
              </FormControl>
            </Grid>
            <FormControl>
              <FormLabel color="#656565" fontWeight="bold">
                Rich Text Editor Sermon Notes
              </FormLabel>
              <Input></Input>
            </FormControl>
            <Stack direction='row' spacing={5}>
            <Button width='13vw' bgColor="#3182CE" color="#FFFFFF" _hover={{bgColor:'#3D678E'}}> Publish </Button>
            <Button width='13vw' bgColor='#6C7BFF' color='#FFFFFF' _hover={{bgColor:'#4F5ABE'}}> Preview </Button>
            </Stack>
            </Stack>

          </form>
        </Box>
      </Container>
    </>
  );
};

export default SermonNotesEditorModal;
