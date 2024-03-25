import { useRef, useState } from 'react';
import { customAxios as axios } from '../customAxios';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Progress,
  Button,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FiFile } from 'react-icons/fi';

const FileUpload = (props) => {
  const {
    name,
    placeholder,
    control,
    children,
    acceptedFileTypes = '',
    isRequired = false,
    setImageUrl,
    inputValue,
  } = props;

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [textValue, setTextValue] = useState(inputValue || '');
  const inputRef = useRef();

  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  const handleTextChange = (event) => setTextValue(event.target.value);

  const uploadFile = async () => {
    if (inputRef.current.files.length > 0) {
      setIsUploading(true);

      let file = inputRef.current.files[0];

      // set up file in form data
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

      let config = {
        onUploadProgress: (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        },
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_WP_MEDIA_API,
          formData,
          { ...config, headers }
        );

        const url = response.data.source_url;
        setImageUrl(url);
        setTextValue(url);
        setIsUploading(false);
        setProgress(0);

        return name;
      } catch (err) {
        console.log('Image fail to upload');
        console.log(err);
        setIsUploading(false);
        setProgress(0);
      }
    }
  };

  return (
    <Stack direction={['row']} align={'end'}>
      <FormControl isInvalid={invalid} isRequired>
        <FormLabel htmlFor="writeUpFile">{children}</FormLabel>

        <InputGroup>
          <input
            type="file"
            onChange={uploadFile}
            accept={acceptedFileTypes}
            name={name}
            ref={inputRef}
            {...inputProps}
            style={{ display: 'none' }}
          />
          <Input
            placeholder={placeholder || ''}
            value={textValue}
            onChange={handleTextChange}
          />
          <Button
            leftIcon={<FiFile />}
            colorScheme="green"
            onClick={() => inputRef.current.click()}
            ml={2}
          >
            Upload
          </Button>
        </InputGroup>
        {isUploading && (
          <Progress colorScheme="blue" value={progress} min="0" max="100" />
        )}
        <FormErrorMessage>{invalid}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export default FileUpload;
