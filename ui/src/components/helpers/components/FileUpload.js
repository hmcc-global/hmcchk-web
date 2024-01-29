import { useRef, useState } from 'react';
import { customAxios as axios } from '../customAxios';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Stack,
  Progress,
} from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { FiFile } from 'react-icons/fi';

const FileUpload = (props) => {
  const {
    name,
    options,
    placeholder,
    control,
    children,
    acceptedFileTypes = '',
    allowMultipleFiles = false,
    isRequired = false,
  } = props;

  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef();

  const { register } = useFormContext();
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  const uploadFile = async () => {
    if (inputRef.current.files.length > 0) {
      setIsUploading(true);

      let file = inputRef.current.files[0];

      // set up file in formdata
      let formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);

      // authorization header need to be base64-encoded
      let headers = {
        'Content-Disposition': `form-data; filename=${file.name}`,
        Authorization:
          'Basic ' +
          btoa(
            `${process.env.REACT_APP_WP_USERNAME}:${process.env.REACT_APP_WP_PASSWORD}`
          ),
      };

      try {
        await axios.post(process.env.REACT_APP_WP_MEDIA_API, formData, {
          headers,
        });

        console.log('Image uploaded to WP');
        // value = response.data.source_url;

        setIsUploading(false);

        return name;
      } catch (err) {
        console.log('Image fail to upload');
        console.log(err);
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <Stack direction={['row']} align={'end'}>
        <FormControl isInvalid={invalid} isRequired>
          <FormLabel htmlFor="writeUpFile">{children}</FormLabel>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiFile} />
            </InputLeftElement>
            <input
              type="file"
              // onChange={(e) => onChange(e.target.files[0])}
              onChange={uploadFile}
              accept={acceptedFileTypes}
              name={name}
              ref={inputRef}
              {...register(name, options)}
              {...inputProps}
              style={{ display: 'none' }}
            />
            <Input
              placeholder={placeholder || 'Your file ...'}
              onClick={() => inputRef.current.click()}
              readOnly={true}
              value={(value && value.name) || ''}
            />
          </InputGroup>
          {isUploading && (
            <Progress
              colorScheme="blue"
              isAnimated
              isIndeterminate={isUploading}
            />
          )}
          <FormErrorMessage>{invalid}</FormErrorMessage>
        </FormControl>
      </Stack>
    </>
  );
};

export default FileUpload;
