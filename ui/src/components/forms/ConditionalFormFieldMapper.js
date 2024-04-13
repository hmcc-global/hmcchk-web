import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Stack,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

const ConditionalFormFieldMapper = (props) => {
  const {
    opt,
    conditionalFieldParent,
    formFields,
    conditionalFieldChild,
    setConditionalFieldChild,
  } = props;

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onMappingSubmit = (data) => {
    // Sort the fields
    let sortedChildren = [];
    for (let fieldId in data) {
      if (data[fieldId] !== '') sortedChildren.push([fieldId, data[fieldId]]);
    }
    sortedChildren.sort((a, b) => {
      return a[1] - b[1];
    });

    // Save the fields
    if (conditionalFieldChild) {
      let toSave = conditionalFieldChild;
      toSave[opt] = sortedChildren;
      setConditionalFieldChild(toSave);
    } else {
      setConditionalFieldChild({
        opt: sortedChildren,
      });
    }
  };

  useEffect(() => {
    if (opt in conditionalFieldChild) {
      reset();
      conditionalFieldChild[opt].forEach((optChildren) => {
        setValue(optChildren[0], optChildren[1]);
      });
    } else {
      reset();
    }
  }, [formFields, opt, conditionalFieldChild, setValue]);

  return (
    <Stack>
      <Text key={`${opt}`}>
        <b>Option: </b>
        {opt}
      </Text>
      <Text>Assign a number to indicate order of rendering fields</Text>
      <form onSubmit={handleSubmit(onMappingSubmit)}>
        <Box>
          {formFields
            .filter((field) => {
              if (field.id === conditionalFieldParent) return false;
              // Disable prefill types, for nowthese cannot be a special conditional field for simplicity
              else if (field.fieldType === 'prefill') return false;
              else return field;
            })
            .map((field, j) => (
              <FormControl>
                <FormLabel>{field.fieldName}</FormLabel>
                <Input {...register(field.id)} />
              </FormControl>
            ))}
        </Box>
        <Button mt="3" type="submit">
          Save mapping for this option
        </Button>
      </form>
    </Stack>
  );
};

export default ConditionalFormFieldMapper;
