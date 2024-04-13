import { getBiblePassage } from '../SermonNotes';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react';
// import styled from '@emotion/styled';

export const BibleVerseModal = ({ isOpen, onClose, bibleVerse, verseRef }) => {
  const [passage, setPassage] = useState('');
  (async () => {
    const res = await getBiblePassage(bibleVerse);
    setPassage(res);
  })();

  const calculateModalPosition = () => {
    const buttonRect = verseRef.current.getBoundingClientRect();
    return {
      top: buttonRect.top,
      left: buttonRect.left,
    };
  };
  const modalPosition = calculateModalPosition();
  console.log(modalPosition);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        style={{
          // position: 'absolute',
          // top: `${modalPosition.top}px`,
          // left: `${modalPosition.left}px`,
        }}
      >
        <ModalHeader>{bibleVerse + ' (ESV)'}</ModalHeader>
        <ModalBody>{passage}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
