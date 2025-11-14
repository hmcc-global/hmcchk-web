import {
  Box,
  Button,
  Link,
  Dialog,
  CloseButton,
  Image,
  AspectRatio,
  ButtonGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Prose } from '../../components/ui/prose';
import TrackingUtil from '../../util/TrackingUtil';
import ReactMarkdown from 'react-markdown';

const PopupContainer = ({ props }) => {
  const popupData = props;
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      size="3xl"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content borderRadius="20">
          {popupData.image && (
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
              <Image
                borderTopLeftRadius="20"
                borderTopRightRadius="20"
                src={popupData.image}
                objectFit="cover"
              />
            </AspectRatio>
          )}
          <Dialog.CloseTrigger asChild>
            <CloseButton aria-label="Close" />
          </Dialog.CloseTrigger>
          {popupData.title && (
            <Box
              as="header"
              ml={[0, 16]}
              mr={[0, 16]}
              fontWeight="900"
              fontSize={['2xl', '3xl']}
            >
              {popupData.title}
            </Box>
          )}
          <Dialog.Body ml={[0, 16]} mr={[0, 16]}>
            <Box fontSize="sm" mt="5" color="#4C80A5" textAlign="justify">
              <Prose>
                <ReactMarkdown>{popupData.description}</ReactMarkdown>
              </Prose>
            </Box>
          </Dialog.Body>
          <Dialog.Footer ml={[0, 16]} mr={[0, 16]}>
            <ButtonGroup
              size="md"
              flexDirection={['column', 'row']}
              spacing={[0, 0]}
              display={'flex'}
              flexWrap={'wrap'}
              w="100%"
              variant="outline"
              colorScheme="gray"
              alignItems="center"
            >
              {popupData.buttonText.length > 0 &&
                popupData.buttonText.map((buttonTextItem, i) => (
                  <Button
                    my="1"
                    marginRight={['0', '4']}
                    minW={['18em', '10em']}
                    maxW={['30em', '11em']}
                    flex={[false, 1]}
                    as={Link}
                    target="_blank"
                    href={
                      popupData.buttonLink[i] ? popupData.buttonLink[i] : null
                    }
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                    colorScheme="teal"
                    id={`popup-check-${TrackingUtil.generateIdFromTitle(
                      popupData.title
                    )}`}
                  >
                    {buttonTextItem}
                  </Button>
                ))}
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default PopupContainer;
