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
      py={'1.75rem'}
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
      <Text fontSize={{ base: '1.125rem', lg: '2rem' }} fontWeight={700}>
        {name}
      </Text>
      <Text
        fontSize={['0.75rem', '0.875rem']}
        mb={4}
        fontWeight={{ base: 400, lg: 700 }}
      >
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
            borderRadius={'0.625rem'}
            px={{ base: '1rem', lg: '1.75rem' }}
            py={'0.375rem'}
            variant="outline"
            backdropFilter="blur(3px)"
            fontWeight={700}
          >
            <Text fontSize={{ base: '0.75rem', lg: '1.125rem' }}>
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
