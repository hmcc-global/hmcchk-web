import {
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import parse, { domToReact, attributesToProps } from 'html-react-parser';

const options = {
  replace: (domNode) => {
    if (domNode.name === 'p') {
      return <Text mb="2">{domToReact(domNode.children, options)}</Text>;
    } else if (domNode.name === 'ul') {
      return (
        <UnorderedList marginInlineStart="1.25em" mb="2">
          {domToReact(domNode.children, options)}
        </UnorderedList>
      );
    } else if (domNode.name === 'ol') {
      return (
        <OrderedList marginInlineStart="1.25em" mb="2">
          {domToReact(domNode.children, options)}
        </OrderedList>
      );
    } else if (domNode.name === 'li') {
      return <ListItem>{domToReact(domNode.children, options)}</ListItem>;
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
