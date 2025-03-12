import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
  Text,
  Box,
  ModalHeader,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const EventsExporter = ({ content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatEventMessage = (content) => {
    return content
      .map((event) => {
        let message = `
*${event.title}*
📍 *Location*: ${event.location || 'TBA'}
🕒 *Time*: ${event.eventStart || 'TBA'}`;

        if (event.signUpLink) {
          message += `\n🔗 **Sign Up Here**: ${event.signUpLink}`;
        }
        message += `\n ${event.description}`;

        return message;
      })
      .join('\n\n');
  };

  const [whatsappMessage, setWhatsAppMessage] = useState('');

  useEffect(() => {
    setWhatsAppMessage(formatEventMessage(content));
  }, [content]);

  // Function to copy the message to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(whatsappMessage)
      .then(() => {
        alert('Message copied to clipboard!'); // Optional: Notify the user
      })
      .catch((err) => {
        console.error('Failed to copy: ', err); // Handle any errors
      });
  };

  return (
    <>
      <Button onClick={onOpen} borderRadius="full">
        <ExternalLinkIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Announcements</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="gray" fontSize="xs" fontWeight="bold">
              Simply change filters in the EVENTS page if you want to filter out
              certain events
            </Text>
            <Box>
              <Textarea
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                value={whatsappMessage}
                height={['30em', '40em']}
                fontFamily="monospace"
                placeholder="The WhatsApp message will appear here..."
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" mr={3} onClick={copyToClipboard}>
              Copy to Clipboard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventsExporter;
