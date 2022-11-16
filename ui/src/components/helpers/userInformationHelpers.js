import { customAxios as axios } from '../helpers/customAxios';
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  Link,
  Spacer,
} from '@chakra-ui/react';

// Only allow setting field values that are defined here
const settableDataFields = [
  'email',
  'countryOfOrigin',
  'birthday',
  'campus',
  'lifestage',
  'isMember',
  'isBaptised',
  'ministryTeam',
  'phoneNumber',
  'fullName',
  'address',
  'membershipInfo',
  'baptismInfo',
  'lifeGroup',
];

const fixAddress = (data) => {
  data.address = {
    floor: data['addressFloor'],
    flat: data['addressFlat'],
    street: data['addressStreet'],
    district: data['addressDistrict'],
    region: data['addressRegion'],
  };
};

const fixName = (data) => {
  data.fullName = data.firstName + ' ' + data.lastName;
};

const splitFullName = (fullName) => {
  let nameParts = fullName.split(' ');
  let lastName = nameParts.pop(-1);
  let firstName = nameParts.join(' ');
  return { firstName, lastName };
};

// Must be called when using forms
const purgeFormFields = (data) => {
  delete data['addressFloor'];
  delete data['addressFlat'];
  delete data['addressStreet'];
  delete data['addressDistrict'];
  delete data['addressRegion'];
  delete data['firstName'];
  delete data['lastName'];
  delete data['baptismDate'];
  delete data['baptismPlace'];
  delete data['membershipRecognitionDate'];
  delete data['membershipRecommitmentDate'];
};

const userDataCleanup = (data) => {
  fixAddress(data);
  fixName(data);

  purgeFormFields(data);

  // Don't allow these fields to be reset or changed through here
  delete data['email'];
  delete data['isMember'];
  delete data['isBaptised'];
  delete data['membershipInfo'];
  delete data['baptismInfo'];

  for (let key in data) {
    if (!settableDataFields.includes(key)) {
      delete data[key];
    }
  }
};

const getUserDataRequest = async (uid) => {
  return await axios.get('/api/users/get', { params: { userId: uid } });
};

const updateUserDataRequest = async (data) => {
  return await axios.put('/api/users/update', {
    params: data,
  });
};

const getLoginOnlyFormsRequest = async () => {
  // Hardcoded to true as it is assumed only logged in users can call this function
  return await axios.get('/api/forms/get-form', {
    params: {},
  });
};

const signUpButton = {
  backgroundColor: '#ADCFFF',
  color: '#00377C',
  fontSize: 'inherit',
  borderRadius: '3px',
  padding: '20px 10px',
  textAlign: 'center',
};

const isPaymentRequired = (form) => form.isPaymentRequired ? '- [Payment Required]' : '';

const generatePublishedFormLinks = (forms) => {
  if (forms) {
    return (
      <Box>
        {forms.map((item, index) => {
          return (
            <>
              <Flex
                direction="row"
                key={'fl' + item['formName']}
                align="center"
                w={['100%', '90%', '90%', '80%', '80%']}
                fontSize={['0.85rem', '1.0rem']}
                fontWeight="700"
                textAlign="left"
              >
                <Image
                  src={item['formImage']}
                  fit="cover"
                  h={['4rem', '3rem', '4rem', '5rem', '6rem']}
                  w={['8rem', '6rem', '8rem', '10rem', '12rem']}
                />

                <Text 
                    margin="0px 15px" 
                    alignSelf="baseline">
                    {`${item['formName']} ${isPaymentRequired(item)}`}
                </Text>
                <Spacer />
                <Link
                  href={`/forms/${item['id']}`}
                  _hover={{ textDecoration: 'none', opacity: '75%' }}
                  width="fit-content"
                >
                  <Button style={signUpButton}>Sign Up</Button>
                </Link>
              </Flex>
              {index !== forms.length - 1 && (
                <Divider margin="15px 0px" backgroundColor="black" />
              )}
            </>
    
          );
        })}
      </Box>
    );
  } else return;
};

export {
  splitFullName,
  settableDataFields,
  userDataCleanup,
  getUserDataRequest,
  updateUserDataRequest,
  getLoginOnlyFormsRequest,
  fixName,
  fixAddress,
  purgeFormFields,
  generatePublishedFormLinks,
};
