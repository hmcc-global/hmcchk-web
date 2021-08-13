import { Button } from "@chakra-ui/react";

const CustomButton = (props) => {
  const { text, ...style } = props;

  return (
    <Button {...style} borderRadius={10}>
      {text}
    </Button>
  );
};

export default CustomButton;
