import { AspectRatio, Box, Image, Text, VStack } from '@chakra-ui/react';

const NAME_FONT_SIZE = ['md', 'xl', '2xl'];
const TITLE_FONT_SIZE = ['xs', 'sm', 'md'];
const CARD_PX = [1, 3, 5];

const PhotoPlaceholder = () => (
  <AspectRatio ratio={1} w="100%">
    <Box borderRadius="7" bgColor="#E9E9E9">
      <Text color="#9AA0A6" fontSize="sm">
        Photo coming soon
      </Text>
    </Box>
  </AspectRatio>
);

const StaffMember = ({ name, title, photo }) => {
  const titles = Array.isArray(title) ? title : title ? [title] : [];

  return (
    <VStack
      fontFamily="Manrope"
      textAlign="center"
      w="100%"
      mx="auto"
      mb={3}
      spacing={2}
    >
      <Box w="100%" px={CARD_PX}>
        {photo ? (
          <AspectRatio ratio={1} w="100%">
            <Image
              src={`${process.env.PUBLIC_URL}images/about/${photo}`}
              alt={name}
              objectFit="cover"
              objectPosition="center"
              borderRadius="7"
            />
          </AspectRatio>
        ) : (
          <PhotoPlaceholder />
        )}
      </Box>

      <Text fontSize={NAME_FONT_SIZE} fontWeight="700" color="#0628A3">
        {name}
      </Text>

      {titles.map((t, i) => (
        <Text key={i} fontSize={TITLE_FONT_SIZE} fontWeight="700">
          {t}
        </Text>
      ))}
    </VStack>
  );
};

export default StaffMember;
