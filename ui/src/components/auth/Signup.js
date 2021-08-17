import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { ChevronLeftIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import Country from './country.json';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box, Card, Paper, VStack, Flex, Image, Text, Stack, HStack, Button, Link } from "@chakra-ui/react";

const Signup = () => {

  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => setResult(JSON.stringify(data));
  const onChangeReCAPTCHA = (value) => {console.log("Captcha value:", value);}

  const inputBox = {
    color:'black'
  }

  const submitBoxStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 19px',
    background: 'rgba(0, 0, 0, 0.04)',
    border: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    width:'250px',
    fontWeight:'bold',
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
      <Stack background='#2C5282' color='white' w='100vw' padding='20px' fontFamily='inter'>
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
                marginBottom='15px'
                h={{base:'5vh', sm:'5.5vh', md:'6.5vh',lg:'7vh',xl:'8vh'}} 
                src={`${process.env.PUBLIC_URL}/images/ripple.png`}
                alt='Logo of HMCC' /> 
              <HStack>
                <Text>Sign Up</Text>
                <Image 
                  h='20vh'
                  src={`${process.env.PUBLIC_URL}/images/HLine.svg`}
                  alt='Horizontal Line' /> 
                <VStack alignItems='flex-start'>
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
                  <Text>Password should</Text>
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