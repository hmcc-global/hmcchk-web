import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { BibleVerseModal } from '../components/Modal.js';
import React from 'react';

export const BibleVerseMark = Node.create({
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


const BibleVerseWithModal = (props) => {
  const verse = props.node.attrs.bibleVerse;
  const [isOpen, setIsOpen] = React.useState(false);
  const verseRef = React.useRef(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <NodeViewWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={verseRef}
    >
      <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
        {verse}
      </span>
      {isOpen && (
        <BibleVerseModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          bibleVerse={verse}
          verseRef= {verseRef}
        />
      )}
    </NodeViewWrapper>
  );
};

