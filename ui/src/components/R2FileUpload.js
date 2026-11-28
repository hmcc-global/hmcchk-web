import { useEffect, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
    folder,
    onUploadingChange,
  } = props;

  const inputRef = useRef();
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const isUploadComplete = uploadedUrl && uploadedUrl === inputValue;
  const { upload, isUploading, progress, error, clearError } = useR2Upload({
    folder,
  });

  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  useEffect(() => {
    if (onUploadingChange) {
      onUploadingChange(isUploading);
    }
  }, [isUploading, onUploadingChange]);

  const applyUrl = (url) => {
    setImageUrl(url);
    onChange(url);
  };

  const handleTextChange = (event) => {
    clearError();
    setUploadedUrl(null);
    applyUrl(event.target.value);
  };

  const handleFileChange = async () => {
    const file = inputRef.current.files[0];
    if (!file) {
      return;
    }

    setUploadedUrl(null);
    const result = await upload(file);
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    if (result) {
      applyUrl(result.publicUrl);
      setUploadedUrl(result.publicUrl);
    }
  };

  return (
    <Stack direction={['row']} align={'end'}>
      <FormControl
        isInvalid={invalid || Boolean(error)}
        isRequired={isRequired}
      >
        <FormLabel htmlFor={name}>{children}</FormLabel>

        <InputGroup>
          <input
            id={name}
            type="file"
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            name={name}
            ref={inputRef}
            disabled={isUploading}
            {...inputProps}
            style={{ display: 'none' }}
          />
          <Input
            aria-label="File URL"
            placeholder={placeholder || ''}
            value={inputValue ?? ''}
            isDisabled={isUploading}
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
        {isUploadComplete && (
          <FormHelperText color="green.600">
            Upload completed successfully.
          </FormHelperText>
        )}
        <FormErrorMessage>
          {error || (invalid && 'This field is required')}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export default R2FileUpload;
