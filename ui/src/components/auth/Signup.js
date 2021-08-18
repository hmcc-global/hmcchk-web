import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { ChevronLeftIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import Country from './country.json';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box, Center, UnorderedList, ListItem,Card, Paper, VStack, Flex, Image, Text, Stack, HStack, Button, Link } from "@chakra-ui/react";

const Signup = () => {

  const { register, handleSubmit, watch, formState:{errors} } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => setResult(JSON.stringify(data));
  const onChangeReCAPTCHA = (value) => {console.log("Captcha value:", value);}

  const inputBox = {
    color:'black',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    boxSizing: 'border-box',
    borderRadius: '6px',
    flex: 'none',
    alignSelf: 'stretch',
    flexGrow: '0',
    margin: '8px 0px',
    padding:'3px 10px',
  }

  const submitBoxStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 19px',
    background: 'rgba(0, 0, 0, 0.04)',
    border: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    width:'250px',
    fontWeight:'bold',
    marginTop:'20px',
    marginBottom:'20px'
  };

  const Input = ({ label, name, type, placeholder, register, required }) => (
    <>
      <label>{label}</label>
      <input style={inputBox} type={type} placeholder={placeholder} {...register(name, { required })} />
    </>
  );

  const SelectCountry = React.forwardRef(({ onChange, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select style={inputBox} name={name} ref={ref} onChange={onChange}>
        <option style={{color:'color: rgba(0, 0, 0, 0.36)'}} value='' selected disabled>Select Country</option>
        {Country.map((result) =>{
            return result.country.map((result)=>{return <option value={result}>{result}</option>})
          })
        }
      </select>
    </>
  ));

  const SelectLifestage = React.forwardRef(({ onChange, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select style={inputBox} name={name} ref={ref} onChange={onChange}>
        <option style={{color:'color: rgba(0, 0, 0, 0.36)'}} value='' selected disabled>Select Lifestage</option>
        {Country.map((result) =>{
            return result.country.map((result)=>{return <option value={result}>{result}</option>})
          })
        }
      </select>
    </>
  ));

  return(
    <>
      <Stack background='#2C5282' color='white' padding='20px' fontFamily='inter'>
        <Flex>
        <Box>
            <Link href='/login'>
              <ChevronLeftIcon boxSize={10} />
              Return to Log In
            </Link>
          </Box>
        </Flex>
        <Flex justifyContent='center'>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <VStack justify='center' align='center'>
              <Image
                marginTop = {{base:'30px', md:'none'}}
                marginBottom={{base:'15px', md:"40px"}}
                h={{ base: "6vh", sm: "8vh", md: "10vh", lg: "12vh", xl: "15vh" }}
                src={`${process.env.PUBLIC_URL}/images/ripple.png`}
                alt="Logo of HMCC"
              />
              <Text fontWeight="bold" fontSize="2xl" display={{base:'flex', md:'none'}}>Sign Up</Text>
              <HStack spacing={{base:'none',md:'8'}}>
                <Text fontWeight="bold" fontSize="2xl" display={{base:'none', md:'flex'}}>Sign Up</Text>
                <Image 
                  h='85vh'
                  src={`${process.env.PUBLIC_URL}/images/HLine.svg`}
                  alt='Horizontal Line' /> 
                <VStack alignItems='flex-start' marginLeft={{base:'20px', md:'none'}}>
                  <Input 
                    label='Enter Your Email Address' 
                    name='email'
                    type='email' 
                    placeholder='e.g. chantaiman@gmail.com' 
                    register = {register} 
                    required />
                  <Input 
                    label='Enter Your Account Password' 
                    name='password'
                    type='password' 
                    placeholder='Password' 
                    register = {register} 
                    required />
                  <Center>
                  <Box maxW="300">
                    <Text color="#FED7D7" w="50vw" fontSize={[12, 12, 12, 14]}>
                      Your new password should consist of:
                    </Text>
                    <UnorderedList
                      color="#FED7D7"
                      w="300"
                      fontSize={[12, 12, 12, 14]}
                    >
                      <ListItem>At least 8 characters in length</ListItem>
                      <ListItem>
                        Mixture of both uppercase and lowercase characters
                      </ListItem>
                      <ListItem>Contains at least one number</ListItem>
                      <ListItem>
                        Contains at least one special character
                      </ListItem>
                    </UnorderedList>
                  </Box>
                </Center>
                  <Input 
                    label='Re-enter Your Account Password' 
                    name= 'repassword'
                    type='password' 
                    placeholder='Re-enter Password' 
                    register = {register} 
                    required />
                  <Input 
                    label='First Name (and Middle Name)' 
                    name='firstName'
                    type='text' 
                    placeholder='First Name' 
                    register = {register} 
                    required />
                  <Input 
                    label='Last Name' 
                    name='lastName'
                    type='text' 
                    placeholder='Last Name' 
                    register = {register} 
                    required />
                  <Input 
                    label='Phone Number' 
                    name='phoneNumber'
                    type='number' 
                    placeholder='Phone Number' 
                    register = {register} 
                    required />
                  <SelectCountry 
                    label='Country of Origin' 
                    name='Country'
                    {...register("Country")}
                    required/>
                  <SelectLifestage
                    label='Lifestage'
                    name ='lifestage'
                    {...register("Lifestage")}
                    required />
                  
                </VStack>
              </HStack>
              <ReCAPTCHA
                style={{left:'5%', position:'relative', marginTop:'20px'}}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeReCAPTCHA}  
              />
              <input type="submit" name="Login" value="Register" style ={submitBoxStyle} />
            </VStack>
          </form>
        </Flex>
      </Stack>
    </>
  );
}

export default Signup;