import { Prose } from '@nikolovlazar/chakra-ui-prose';
import ReactMarkdown from 'react-markdown';

const CustomReactMarkdown = (props) => {
  return (
    <Prose>
      <ReactMarkdown {...props} />
    </Prose>
  );
};

export default CustomReactMarkdown;
