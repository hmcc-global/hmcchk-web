import {
  Button,
  Flex,
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
      py={{ base: '1.25rem', lg: '1.75rem' }}
      px={{ base: '1rem', lg: '1.5rem' }}
      borderRadius="1.25rem"
      bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/${imgPath}')`}
      bgPosition="center"
      bgSize="cover"
      shadow="lg"
      color="#fff"
      textAlign="center"
      flexDir="column"
      fontFamily="Manrope"
    >
      <Text fontSize={{ base: '1.375rem', lg: '2rem' }} fontWeight={800}>
        {name}
      </Text>
      <Text
        fontSize={{ base: '0.875rem', lg: '1.125rem' }}
        mb={4}
        fontWeight={{ base: 400, lg: 700 }}
      >
        {fullname}
      </Text>
      <Spacer />
      <LinkBox>
        <LinkOverlay href={igLink} isExternal>
          <Button
            leftIcon={<AiOutlineInstagram size="1.2rem" />}
            colorScheme="whiteAlpha"
            borderColor="#fff"
            color="#fff"
            size={['xs', 'xs', 'sm']}
            borderRadius={'0.625rem'}
            px={{ base: '0.60rem', lg: '1.75rem' }}
            py={'0.375rem'}
            variant="outline"
            backdropFilter="blur(3px)"
            fontWeight={700}
          >
            <Text fontSize={{ base: '0.62rem', lg: '1.125rem' }}>
              {' '}
              {igHandle}
            </Text>
          </Button>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};

export default LifeGroupCard;
