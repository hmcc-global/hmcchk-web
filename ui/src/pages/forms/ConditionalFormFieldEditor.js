import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  sentencize,
  getFieldById,
  getFieldIndexById,
} from '../helpers/formsHelpers';
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
  countryList,
  ministryTeamList,
} from '../helpers/lists';

import ConditionalFormFieldMapper from './ConditionalFormFieldMapper';

const ConditionalFormFieldEditor = (props) => {
  const { formFields, setFormFields, staticData } = props;
  const { lifegroupList, lifestageList, campusList } = staticData;
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

  const { register, watch, setValue } = useForm();

  const conditionalFieldParent = watch('conditionalFieldParent');
  const conditionalFieldOption = watch('conditionalFieldOption');

  const [conditionalFieldChild, setConditionalFieldChild] = useState({});

  const getFieldOptions = (id, formFields) => {
    let field = getFieldById(id, formFields);
    if (!field) return [];
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

  const onDelete = (e) => {
    setConditionalFieldChild({});
    setValue('conditionalFieldParent', null);
    setValue('conditionalFieldOption', null);

    let fi = getFieldIndexById(e.target.value, formFields);

    if (fi) {
      let field = formFields[fi];
      field.conditional = false;
      delete field.children;

      let temp = [...formFields];
      temp[fi] = field;
      setFormFields(temp);
    }
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
        <Stack>
          {formFields
            .filter((obj) => {
              if (obj.children) {
                return obj;
              } else return false;
            })
            .map((fieldData, i) => {
              return (
                <Stack key={`${fieldData.fieldName}-${i}`} direction="row">
                  <Text margin="auto" flex="2">
                    {fieldData.fieldName}
                  </Text>
                  <Button value={fieldData.id} onClick={onDelete}>
                    Delete
                  </Button>
                </Stack>
              );
            })}
        </Stack>
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
                    <option key={`${opt + i}`} value={opt}>
                      {opt}
                    </option>
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
