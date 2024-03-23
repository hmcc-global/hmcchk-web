import { Node, mergeAttributes } from '@tiptap/core';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { getBiblePassage } from '../SermonNotes';
import React, { useState } from 'react';

export const BibleVersseNode = Node.create({
  name: 'bibleVerse',
  inline: true,
  group: 'inline',

  addAttributes() {
    return {
      bibleVerse: {
        default: null,
      },
    };
  },
  addCommands() {
    return {
      insertBibleVerse:
        (bibleVerse) =>
        ({ commands, editor }) => {
          const position = editor.state.selection.from;
          return commands.insertContentAt(position, {
            type: 'bibleVerse',
            attrs: { bibleVerse },
          });
        },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'bible-verse',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['bible-verse', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      return <BibleVerseWithModal {...props} />;
    });
  },
});

const BibleVerseModal = ({ isOpen, onClose, bibleVerse }) => {
  const [passage, setPassage] = useState('');
  (async () => {
    const res = await getBiblePassage(bibleVerse);
    setPassage(res);
  })();
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent width="unset" height="unset">
        <ModalHeader>{bibleVerse + ' (ESV)'}</ModalHeader>
        <ModalBody>{passage}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
const BibleVerseWithModal = (props) => {
  const verse = props.node.attrs.bibleVerse;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(true);
  };

  return (
    <NodeViewWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
        {verse}
      </span>
      {isOpen && (
        <BibleVerseModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          bibleVerse={verse}
        />
      )}
    </NodeViewWrapper>
  );
};

// export default BibleVerseExtension;
