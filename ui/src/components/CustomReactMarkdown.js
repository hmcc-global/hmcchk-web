import { Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

const CustomReactMarkdown = (props) => {
  return (
    <Box className="prose">
      <ReactMarkdown {...props} />
    </Box>
  );
};

export default CustomReactMarkdown;
