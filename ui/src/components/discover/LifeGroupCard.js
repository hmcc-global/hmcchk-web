import {
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { AiOutlineInstagram } from 'react-icons/ai';

const LifeGroupCard = (props) => {
  const { lifeGroupInfo } = props;
  const { name, fullname, igLink, igHandle, imgPath } = lifeGroupInfo;

  return (
    <Flex
      px={[3, 2]}
      py={4}
      borderWidth="1px"
      borderRadius="20"
      bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/${imgPath}')`}
      bgPosition="center"
      bgSize="cover"
      shadow="lg"
      color="#fff"
      textAlign="center"
      flexDir="column"
      fontFamily="Manrope"
    >
      <Heading as="h4" fontSize={['xl', '2xl', '3xl']} fontWeight={700}>
        {name}
      </Heading>
      <Text fontSize={['.75em', '1em']} mb={4} fontWeight={[400, 700]}>
        {fullname}
      </Text>
      <Spacer />
      <LinkBox>
        <LinkOverlay href={igLink} isExternal>
          <Button
            leftIcon={<AiOutlineInstagram size="20px" />}
            colorScheme="whiteAlpha"
            borderColor="#fff"
            color="#fff"
            size={['xs', 'xs', 'sm']}
            p={[1, 2]}
            variant="outline"
          >
            <Text fontSize={['xs', 'xs', 'sm']}> {igHandle}</Text>
          </Button>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};

export default LifeGroupCard;
