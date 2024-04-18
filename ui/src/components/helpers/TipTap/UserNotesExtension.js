import {
  Node,
  mergeAttributes,
  nodeInputRule,
  nodePasteRule,
} from '@tiptap/core';
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  NodeViewContent,
} from '@tiptap/react';
import React from 'react';

export const UserNotesNode = Node.create({
  name: 'userNotes',
  group: 'block',

  addAttributes() {
    return {
      userNotes: {
        default: null,
      },
    };
  },
  addCommands() {
    return {
      insertUserNotes:
        () =>
        ({ commands, editor }) => {
          const position = editor.state.selection.from;
          return commands.insertContentAt(position, {
            type: 'userNotes',
          });
        },
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: /(\{[Nn][Oo][Tt][Ee][Ss]\})\n/,
        type: this.type,
        // getAttributes: (match) => {
        //   return {
        //     bibleVerse: match[1].replace('READ ', '').replace('TEXT: ', ''),
        //   };
        // },
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: /(\{[Nn][Oo][Tt][Ee][Ss]\})\n/g,
        type: this.type,
        // getAttributes: (match) => {
        //   return {
        //     bibleVerse: match[1].replace('READ ', '').replace('TEXT: ', ''),
        //   };
        // },
      }),
    ];
  },
  parseHTML() {
    return [
      {
        tag: 'user-notes',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['user-notes', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      return (
        <NodeViewWrapper className="user-notes">
          <NodeViewContent className="content" contentEditable={true} />
        </NodeViewWrapper>
      );
    });
  },
});
