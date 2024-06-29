import { Node, nodeInputRule, nodePasteRule } from '@tiptap/core';
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  NodeViewContent,
} from '@tiptap/react';
import React, { useContext, useState } from 'react';
import { LastUpdatedPosContext } from './index.js';
import { v4 as uuid } from 'uuid';
import { Plugin } from 'prosemirror-state';

export const UserNotesNode = Node.create({
  name: 'userNotes',
  group: 'block',

  addAttributes() {
    return {
      userNotes: {
        default: null,
      },
      id: {
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
            id: uuid(),
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

  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (_transactions, oldState, newState) => {
          if (newState.doc === oldState.doc) {
            return;
          }
          const tr = newState.tr;

          newState.doc.descendants((node, pos, parent) => {
            if (node.isBlock && parent === newState.doc && !node.attrs.id) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                id: uuid(),
              });
            }
          });

          return tr;
        },
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: 'div.userNotes',
        getAttrs: (dom) => ({
          id: dom.getAttribute('id'),
        }),
      },
    ];
  },

  renderHTML({ node }) {
    return [
      'div',
      {
        class: 'userNotes',
        id: node.attrs.id, // Use the id attribute here
      },
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      const { setLastUpdatedPos } = useContext(LastUpdatedPosContext);
      const userInput = props.node.attrs.userNotes;
      const [localUserNotes, setLocalUserNotes] = useState(userInput);
      const handleInput = (event) => {
        let text = event.target.innerHTML;
        text = text.replace(/<div>/gi, '\n').replace(/<\/div>/gi, '');
        setLocalUserNotes(text);
      };
      const handleBlur = () => {
        const { node, getPos } = props;
        const { view } = props.editor;
        const { tr } = view.state;
        const pos = getPos();
        const transaction = tr.setNodeMarkup(pos, node.type, {
          ...node.attrs,
          userNotes: localUserNotes,
        });

        setLastUpdatedPos(pos);
        view.dispatch(transaction);
      };
      return (
        <NodeViewWrapper className="user-notes">
          <NodeViewContent
            className="content"
            onBlur={handleBlur}
            contentEditable={true}
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: userInput }}
          />
        </NodeViewWrapper>
      );
    });
  },
});
