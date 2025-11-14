import { Text, List, Link } from '@chakra-ui/react';
import parse, { domToReact, attributesToProps } from 'html-react-parser';

const options = {
  replace: (domNode) => {
    if (domNode.name === 'p') {
      return <Text mb="2">{domToReact(domNode.children, options)}</Text>;
    } else if (domNode.name === 'ul') {
      return (
        <List marginInlineStart="1.25em" mb="2" styleType="disc">
          {domToReact(domNode.children, options)}
        </List>
      );
    } else if (domNode.name === 'ol') {
      return (
        <List as="ol" marginInlineStart="1.25em" mb="2" styleType="decimal">
          {domToReact(domNode.children, options)}
        </List>
      );
    } else if (domNode.name === 'li') {
      return <List.Item>{domToReact(domNode.children, options)}</List.Item>;
    } else if (domNode.name === 'a') {
      return (
        <Link color="teal.500" {...attributesToProps(domNode.attribs)}>
          {domToReact(domNode.children, options)}
        </Link>
      );
    }
  },
};

export const parseDescription = (desc) => {
  return parse(desc, options);
};
