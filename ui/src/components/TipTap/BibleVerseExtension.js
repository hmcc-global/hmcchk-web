import {
  Node,
  mergeAttributes,
  nodeInputRule,
  nodePasteRule,
} from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { BibleVerseAccordion } from '../components/BibleVerseAccordion.js';
import React from 'react';

export const BibleVerseNode = Node.create({
  name: 'bibleVerse',
  inline: true,
  group: 'inline',
  atom: true,

  addAttributes() {
    return {
      bibleVerse: {
        default: null,
      },
      actionText: {
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
        find: /\b((?:READ|TEXT:)[\s\S]*?)\n/,
        type: this.type,
        getAttributes: (match) => {
          return {
            bibleVerse: match[1].replace('READ ', '').replace('TEXT: ', ''),
            actionText: match[1].split(' ')[0],
          };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: /\b((?:READ|TEXT:)[\s\S]*)/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            bibleVerse: match[1].replace('READ ', '').replace('TEXT: ', ''),
            actionText: match[1].split(' ')[0],
          };
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

  renderHTML({ HTMLAttributes, node }) {
    return ['strong', mergeAttributes(HTMLAttributes), node.attrs.bibleVerse];
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      return <BibleVerseWithAccordion {...props} />;
    });
  },
});

const BibleVerseWithAccordion = (props) => {
  const verse = props.node.attrs.bibleVerse;
  const actionText = props.node.attrs.actionText;
  return (
    <NodeViewWrapper>
      <BibleVerseAccordion bibleVerse={verse} actionText={actionText} />
    </NodeViewWrapper>
  );
};
