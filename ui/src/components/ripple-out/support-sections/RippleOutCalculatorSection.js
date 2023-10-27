import {
  HStack,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  subHeaderFontSize,
  bodyFontSize,
  bodyFontSize3,
} from '../RippleOutTextStyle';

const RippleOutCalculatorSection = () => {
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();
  const [total, setTotal] = useState();
  const calcTextStyle = {
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'center',
  };
  const handleCalculate = () => {
    setTotal(amount * duration);
  };

  return (
    <>
      <VStack>
        <Text fontSize={bodyFontSize} fontWeight={500}>
          You may also use the calculator below to get an idea of your
          contribution!
        </Text>
        <VStack
          w="100%"
          border="1px solid #182E57"
          borderRadius={10}
          padding={['1em', '2em']}
        >
          <Text
            fontSize={subHeaderFontSize}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            GIVING CALCULATOR
          </Text>
          <HStack w="100%" display="flex" justifyContent="space-evenly">
            <FormControl isInvalid={amount < 0} w="25%">
              <FormLabel fontSize={bodyFontSize3} style={calcTextStyle}>
                Giving Per Day (HKD)
              </FormLabel>
              <NumberInput min={0} onChange={(e) => setAmount(e)}>
                <NumberInputField placeholder="Insert Amount" />
              </NumberInput>
              <FormErrorMessage>
                Amount cannot be lower than 0.
              </FormErrorMessage>
            </FormControl>
            <Text
              marginTop="35px !important"
              fontSize={bodyFontSize}
              style={calcTextStyle}
            >
              X
            </Text>
            <FormControl isInvalid={duration < 0} w="25%">
              <FormLabel fontSize={bodyFontSize3} style={calcTextStyle}>
                Duration (days)
              </FormLabel>
              <NumberInput min={0} onChange={(e) => setDuration(e)}>
                <NumberInputField placeholder="Insert Amount" />
              </NumberInput>
              <FormErrorMessage>
                Amount cannot be lower than 0.
              </FormErrorMessage>
            </FormControl>
            <Text
              marginTop="35px !important"
              fontSize={bodyFontSize}
              style={calcTextStyle}
            >
              =
            </Text>
            <FormControl w="25%">
              <FormLabel fontSize={bodyFontSize3} style={calcTextStyle}>
                Total (HKD)
              </FormLabel>
              <NumberInput
                style={{ color: 'black', opacity: 1 }}
                value={isNaN(total) ? '' : total}
                isDisabled
              >
                <NumberInputField background="#C9DDED" />
              </NumberInput>
            </FormControl>
          </HStack>
          <Button onClick={() => handleCalculate()}>CALCULATE</Button>
        </VStack>
      </VStack>
    </>
  );
};

export default RippleOutCalculatorSection;
