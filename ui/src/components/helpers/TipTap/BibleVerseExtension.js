import {
  Node,
  mergeAttributes,
  nodeInputRule,
  nodePasteRule,
} from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { BibleVerseAccordion } from '../components/Modal.js';
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
  addInputRules() {
    return [
      nodeInputRule({
        find: /\b(READ[\s\S]*?)\n/,
        type: this.type,
        getAttributes: (match) => {
          return { bibleVerse: match[1].replace('READ ', '') };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: /\b(READ[\s\S]*)/g,
        type: this.type,
        getAttributes: (match) => {
          return { bibleVerse: match[1].replace('READ ', '') };
        },
      }),
    ];
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
      return <BibleVerseWithAccordion {...props} />;
    });
  },
});
//READ Isaiah 53:5
const BibleVerseWithAccordion = (props) => {
  const verse = props.node.attrs.bibleVerse;

  return (
    <NodeViewWrapper>
      <BibleVerseAccordion bibleVerse={verse} />
    </NodeViewWrapper>
  );
};
