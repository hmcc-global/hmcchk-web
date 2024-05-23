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
import React, { useContext } from 'react';
import { LastUpdatedPosContext } from './index.js';

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
  // TO-DO: Implement {notes} into the node
  addInputRules() {
    return [
      nodeInputRule({
        find: /(\{[Nn][Oo][Tt][Ee][Ss]\})\n/,
        type: this.type,
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: /(\{[Nn][Oo][Tt][Ee][Ss]\})\n/g,
        type: this.type,
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
      const { setLastUpdatedPos } = useContext(LastUpdatedPosContext);
      const handleInput = (event) => {
        const newTextContent = event.target.textContent;
        const { node, getPos } = props;
        const { view } = props.editor;
        const { tr } = view.state;
        const pos = getPos();
        const transaction = tr.setNodeMarkup(pos, node.type, {
          ...node.attrs,
          userNotes: newTextContent,
        });

        setLastUpdatedPos(pos);
        view.dispatch(transaction);
      };
      return (
        <NodeViewWrapper className="user-notes">
          <NodeViewContent
            className="content"
            contentEditable={true}
            onInput={handleInput}
          />
        </NodeViewWrapper>
      );
    });
  },
});
