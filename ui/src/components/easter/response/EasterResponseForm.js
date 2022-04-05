import {
  Box,
  Image,
  VStack,
  Input,
  FormErrorMessage,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import ResponseForm from './ResponseForm';

const EasterResponseForm = (props) => {
  const { formId, formName, user } = props;
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handlePasswordCheck = (e) => {
    e.preventDefault();
    if (password === 'becauseHelives') {
      setIsInvalid(false);
      setPasswordChecked(true);
    } else {
      setIsInvalid(true);
    }
  };

  const handleChange = (e) => setPassword(e.target.value);

  return (
    <Box pt="12" pb="12" minH="90vh">
      <VStack spacing={7}>
        <Image
          key="formImage"
          boxSize="90%"
          objectFit="cover"
          mb=""
          src={`${process.env.PUBLIC_URL}/images/easter/response/because-ad-compressed.png`}
          borderRadius="3xl"
        />
        {passwordChecked ? (
          <ResponseForm formId={formId} formName={formName} user={user} />
        ) : (
          <>
            <Box
              fontSize={'2xl'}
              textAlign="center"
              color="#538EC7"
              textStyle="NextSoutherlandSerif"
              fontWeight="700"
            >
              Enter Password:
            </Box>
            <form onSubmit={handlePasswordCheck} style={{ width: '100%' }}>
              <VStack w="100%">
                <FormControl
                  w="50%"
                  textAlign="center"
                  color="#538EC7"
                  fontWeight="500"
                >
                  <Input
                    variant="flushed"
                    textAlign="center"
                    fontWeight="500"
                    borderColor="#538EC7"
                    onChange={handleChange}
                    mb={3}
                  />
                  {isInvalid ? (
                    <Text>Please enter the correct password!</Text>
                  ) : (
                    <Text>(key in password and hit 'Enter')</Text>
                  )}
                </FormControl>
              </VStack>
            </form>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default EasterResponseForm;
