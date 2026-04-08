import { Box, Button, Link, Image, AspectRatio, ButtonGroup, Dialog, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { default as ReactMarkdown } from '../../components/CustomReactMarkdown';
import TrackingUtil from '../../util/TrackingUtil';

const PopupContainer = ({ props }) => {
  const popupData = props;
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog.Root size='xl' open={isOpen} onOpenChange={e => {
      if (!e.open) {
        onClose();
      }
    }}>
      <Portal>

        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="20px">
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
            <Dialog.CloseTrigger />
            {popupData.title && (
              <Dialog.Header
                ml={[0, 16]}
                mr={[0, 16]}
                fontWeight="900"
                fontSize={['2xl', '3xl']}
              >
                {popupData.title}
              </Dialog.Header>
            )}
            <Dialog.Body ml={[0, 16]} mr={[0, 16]}>
              <Box fontSize="sm" mt="5" color="#4C80A5" textAlign="justify">
                <ReactMarkdown children={popupData.description} skipHtml />
              </Box>
            </Dialog.Body>
            <Dialog.Footer ml={[0, 16]} mr={[0, 16]}>
              <ButtonGroup
                size="md"
                flexDirection={['column', 'row']}
                gap={[0, 0]}
                display={'flex'}
                flexWrap={'wrap'}
                w="100%"
                variant="outline"
                colorPalette="gray"
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
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                      colorPalette="teal"
                      id={`popup-check-${TrackingUtil.generateIdFromTitle(
                        popupData.title
                      )}`}
                      asChild><Link
                        target="_blank"
                        href={
                          popupData.buttonLink[i] ? popupData.buttonLink[i] : null
                        }>
                        {buttonTextItem}
                      </Link></Button>
                  ))}
              </ButtonGroup>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>
    </Dialog.Root>
  );
};

export default PopupContainer;
