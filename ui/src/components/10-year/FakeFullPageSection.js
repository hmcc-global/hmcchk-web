import { Flex, Heading, Text } from '@chakra-ui/react';
import { tenYearTheme } from './theme';

const FakeFullPageSection = (props) => {
  const {
    title = 'Section',
    subtitle,
    bg = 'transparent', // Use transparent to show gradient
    color = tenYearTheme.components.heading.color, // Use theme color
  } = props;

  return (
    <Flex as="section" {...tenYearTheme.components.fullPageSection} bg={bg}>
      <Heading
        {...tenYearTheme.components.heading}
        fontSize={tenYearTheme.fontSizes.hero}
        color={color}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          fontSize={tenYearTheme.fontSizes.body}
          {...tenYearTheme.components.text}
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  );
};

export default FakeFullPageSection;
