import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { getBiblePassage } from '../SermonNotes';
import { useState, useRef, useEffect } from 'react';

export const BibleModal = ({ verse }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passage, setPassage] = useState('');
  (async () => {
    const res = await getBiblePassage(verse);
    setPassage(res);
  })();

  return (
    <>
      <Button onClick={onOpen}>click</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{verse + ' (ESV)'}</ModalHeader>
          <ModalBody>
            <p>{passage ? passage : 'Loading...'}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const LinkModal = ({ editor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const urlRef = useRef('');

  const openLinkModal = () => {
    const previousUrl = editor.getAttributes('link').href;
    urlRef.current = previousUrl;
    onOpen();
  };

  const closeLinkModal = () => {
    onClose();
  };

  const handleUrlChange = (event) => {
    urlRef.current = event.target.value;
  };

  const handleSave = () => {
    const url = urlRef.current;

    // Cancelled
    if (url === null) {
      return;
    }

    // Empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      // Update link
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }

    onClose();
  };

  useEffect(() => {
    const { dom } = editor.view;
    dom.addEventListener('mouseover', openLinkModal);
    dom.addEventListener('mouseleave', closeLinkModal);

    return () => {
      dom.removeEventListener('mouseover', openLinkModal);
      dom.removeEventListener('mouseleave', closeLinkModal);
    };
  }, [editor.view, openLinkModal, closeLinkModal]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Insert Link</ModalHeader>
        <ModalBody>
          <p>testing</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
