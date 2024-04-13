import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { sentencize } from '../helpers/formsHelpers';
import {
  FormControl,
  FormLabel,
  Button,
  Select,
  Box,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react';

import {
  campusList,
  countryList,
  lifegroupList,
  lifestageList,
  ministryTeamList,
} from '../helpers/lists';

import ConditionalFormFieldMapper from './ConditionalFormFieldMapper';
import { getFieldById, getFieldIndexById } from './helpers/formHelpers';

const ConditionalFormFieldEditor = (props) => {
  const { formFields, setFormFields } = props;
  const conditionalEnabledPrefillFields = [
    'countryOfOrigin',
    'campus',
    'lifestage',
    'lifeGroup',
    'ministryTeam',
  ];

  const prefillFieldOptions = {
    countryOfOrigin: countryList,
    campus: campusList,
    lifestage: lifestageList,
    lifeGroup: lifegroupList,
    ministryTeam: ministryTeamList,
  };

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const conditionalFieldParent = watch('conditionalFieldParent');
  const conditionalFieldOption = watch('conditionalFieldOption');

  const [conditionalFieldChild, setConditionalFieldChild] = useState({});

  const getFieldOptions = (id, formFields) => {
    let field = getFieldById(id, formFields);
    if (field.fieldType === 'prefill')
      return prefillFieldOptions[field.fieldName];
    else return field.options;
  };

  const onSaveConditionalField = () => {
    let field = getFieldById(conditionalFieldParent, formFields);
    field.conditional = true;
    field.children = conditionalFieldChild;

    let parentIndex = getFieldIndexById(conditionalFieldParent, formFields);

    let temp = [...formFields];
    temp[parentIndex] = field;

    setFormFields(temp);
  };

  useEffect(() => {
    if (conditionalFieldParent && conditionalFieldOption) {
      let parentIndex = getFieldIndexById(conditionalFieldParent, formFields);
      let parentField = formFields[parentIndex];
      if ('children' in parentField) {
        setConditionalFieldChild(formFields[parentIndex].children);
      }
    }
  }, [
    formFields,
    conditionalFieldParent,
    conditionalFieldOption,
    setConditionalFieldChild,
  ]);

  return (
    <Stack spacing="3">
      <Box>
        <Heading as="h3" size="md">
          Conditional Field Settings
        </Heading>
        <Text>
          Please create all fields before setting the conditional fields
        </Text>
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Applied Conditional Fields
        </Heading>
        {formFields
          .filter((obj) => {
            if (obj.children) {
              return obj;
            } else return false;
          })
          .map((fieldData, i) => {
            return <Text>{fieldData.fieldName}</Text>;
          })}
      </Box>
      <Box>
        <Heading as="h4" size="sm" mb="1">
          Conditional Field Editor
        </Heading>
        <Stack>
          <FormControl>
            <FormLabel>Parent Field</FormLabel>
            <Select
              placeholder="Select parent"
              {...register('conditionalFieldParent')}
            >
              {formFields
                .filter((obj) => {
                  if (obj.fieldType === 'select') {
                    return obj;
                  } else if (
                    obj.fieldType === 'prefill' &&
                    conditionalEnabledPrefillFields.includes(obj.fieldName)
                  ) {
                    return obj;
                  } else {
                    return false;
                  }
                })
                .map((fieldData, i) => (
                  <option key={`${fieldData}+${i}`} value={fieldData.id}>
                    {sentencize(fieldData.fieldName)}
                  </option>
                ))}
            </Select>
          </FormControl>
          {conditionalFieldParent && (
            <FormControl>
              <Select
                placeholder="Select option to create condition for"
                {...register('conditionalFieldOption')}
              >
                {getFieldOptions(conditionalFieldParent, formFields).map(
                  (opt, i) => (
                    <option value={opt}>{opt}</option>
                  )
                )}
              </Select>
            </FormControl>
          )}
          {conditionalFieldParent && conditionalFieldOption && (
            <ConditionalFormFieldMapper
              opt={conditionalFieldOption}
              conditionalFieldParent={conditionalFieldParent}
              formFields={formFields}
              conditionalFieldChild={conditionalFieldChild}
              setConditionalFieldChild={setConditionalFieldChild}
            />
          )}
          <Text>
            Click the following button after all mappings are finalized
          </Text>
          <Button onClick={onSaveConditionalField}>
            Save Conditional Field
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ConditionalFormFieldEditor;
