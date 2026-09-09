import { useRef } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Progress,
  Stack,
} from 'components/chakra';
import { useController } from 'react-hook-form';
import { FiFile } from 'react-icons/fi';
import { useR2Upload } from 'hooks/useR2Upload';

const R2FileUpload = (props) => {
  const {
    name,
    placeholder,
    control,
    children,
    acceptedFileTypes = '',
    isRequired = false,
    setImageUrl,
    inputValue,
    folder = 'uploads',
  } = props;

  const inputRef = useRef();
  const { upload, isUploading, progress } = useR2Upload({ folder });

  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  const handleTextChange = (event) => setImageUrl(event.target.value);

  const handleFileChange = async () => {
    const file = inputRef.current.files[0];
    if (!file) {
      return;
    }

    const result = await upload(file);
    if (result) {
      setImageUrl(result.publicUrl);
    }
  };

  return (
    <Stack direction={['row']} align={'end'}>
      <FormControl isInvalid={invalid} isRequired>
        <FormLabel htmlFor={name}>{children}</FormLabel>

        <InputGroup>
          <input
            type="file"
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            name={name}
            ref={inputRef}
            {...inputProps}
            style={{ display: 'none' }}
          />
          <Input
            placeholder={placeholder || ''}
            value={inputValue ?? ''}
            onChange={handleTextChange}
          />
          <Button
            leftIcon={<FiFile />}
            colorScheme="green"
            onClick={() => inputRef.current.click()}
            ml={2}
            isLoading={isUploading}
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

export default R2FileUpload;
