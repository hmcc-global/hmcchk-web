import {
  Text,
  VStack,
  Button,
  Input,
  Select,
  Checkbox,
  Textarea,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../../helpers/customAxios';
import { lifegroupList } from '../../helpers/lists';

const ResponseForm = (props) => {
  const { formId, formName, user, history } = props;
  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { errors } = formState;

  const [submissionData, setSubmissionData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Handle a form submission event
  const handleSubmitForm = (data) => {
    setSubmitting(true);
    if (formId) setSubmissionData(data);
    else console.log("this form doesn't support submission");
  };

  const postSubmission = async (formId, data, userId) => {
    try {
      const { status } = await axios.post('/api/forms/post-create-submission', {
        formId: formId,
        submissionData: data,
        userId: userId,
      });
      if (status === 200) {
        reset();
        setSubmitting(false);
        history.push('/easter/form-success');
        // setTimeout(() => {
        //   window.open(
        //     'https://www.google.com/maps/d/u/0/edit?hl=en&hl=en&mid=1EY4YEOU3Kcmz5kEHlcjLkh3fUSiBY7Qd&ll=22.368791195813237%2C114.1568863064498&z=11',
        //     '_blank'
        //   );
        // }, 3000);
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (submissionData) {
      postSubmission(formId, submissionData, user.id);
    } else if (!submissionData && user.id) {
      setValue('fullName', user['fullName']);
      setValue('email', user['email']);
      setValue('lifeGroup', user['lifeGroup']);
    }
  }, [user, submissionData, formId, setValue]);

  return (
    <>
      <Box
        fontSize={'2xl'}
        textAlign="center"
        color="#538EC7"
        textStyle="NextSoutherlandSerif"
        fontWeight="700"
      >
        {formName}
      </Box>
      <form onSubmit={handleSubmit(handleSubmitForm)} style={{ width: '100%' }}>
        <VStack spacing={5} w="100%" fontWeight="500">
          <VStack w="100%">
            <Text w="100%">
              I want to... <i>(Check the boxes that you want to commit to)</i>
            </Text>
            <VStack
              w="100%"
              bg="white"
              borderRadius="md"
              border="2px solid #E2E8F0"
              p={[3, 7]}
              align="left"
              spacing={[3, 1]}
            >
              <Checkbox {...register('checkCommit')}>
                Commit to following Jesus Christ as my Lord and Savior{' '}
                <u>for the first time</u>
              </Checkbox>
              <Checkbox {...register('checkRecommit')}>
                Recommit to following and living for Jesus Christ
              </Checkbox>
              <Checkbox {...register('checkJoinHMCC')}>
                Sign-up for a LIFE Group and learn more about HMCC
              </Checkbox>
              <Checkbox {...register('checkInvestLG')}>
                Commit to investing in building up my LIFE Group
              </Checkbox>
              <Checkbox {...register('checkServeCity')}>
                Proactively find ways to serve the people in our city
              </Checkbox>
            </VStack>
          </VStack>
          <VStack w="100%">
            <Text w="100%">
              The following prompt is an open-ended response. <br />
              <br />
              In light of today's message, we saw 6 character traits of God:
              <br />
              - God shepherds us
              <br />
              - God attends to us
              <br />
              - God values us
              <br />
              - God interacts with us
              <br />
              - God overflows in us
              <br />
              - God reaches out to us
              <br />
              <br />
              Choose one of the traits above and fill in your response below:
              <br />
              <i>
                For example: "Because <u>God interacts with us</u>, I commit to{' '}
                <u>interacting intentionally with others</u> in{' '}
                <u>my workplace</u>."
              </i>
            </Text>
            <VStack
              w="100%"
              bg="white"
              borderRadius="md"
              border="2px solid #E2E8F0"
              px={['2%', '15%']}
              py={['1%', '4%']}
              fontWeight="500"
              align="left"
            >
              <Textarea
                border="none"
                resize="none"
                defaultValue="Because __________ (trait of God), I commit to __________ (action) in __________ (context)"
                _focus={{ border: '0px' }}
                {...register('openResponse')}
              ></Textarea>
            </VStack>
          </VStack>
          <VStack w="100%" spacing="5">
            <Text w="100%">
              Please fill in your information so that we can follow up with you
              on your commitments.
            </Text>
            <FormControl isInvalid={errors['fullName']}>
              <FormLabel fontWeight="500">
                Full Name{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                size="md"
                fontWeight="700"
                bg="white"
                {...register('fullName', {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl isInvalid={errors['email']}>
              <FormLabel fontWeight="500">
                Email Address{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                size="md"
                fontWeight="700"
                bg="white"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </FormControl>
            <FormControl isInvalid={errors['lifeGroup']}>
              <FormLabel fontWeight="500">
                LIFE Group{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Select
                size="md"
                fontWeight="700"
                bg="white"
                {...register('lifeGroup', { required: true })}
              >
                {lifegroupList.map((item) => {
                  return <option key={'lg' + item}>{item}</option>;
                })}
              </Select>
            </FormControl>
          </VStack>
          <Button
            px="10%"
            py="3%"
            type="submit"
            isLoading={submitting}
            border="1px solid #6E7F98"
            bg="#E0EDFF"
            fontWeight="700"
            _hover={{
              bg: '#004B81',
              border: '1px solid #E0EDFF',
              color: 'white',
            }}
          >
            SUBMIT
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default ResponseForm;
