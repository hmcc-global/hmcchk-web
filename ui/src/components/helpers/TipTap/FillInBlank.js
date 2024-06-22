import { Node, nodeInputRule, nodePasteRule } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import React, { useState, useEffect, useRef } from 'react';

export const FillInBlankNode = Node.create({
  name: 'fillInBlank',
  content: 'text*',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      editorText: {
        default: null,
      },
      userText: {
        default: null,
      },
    };
  },
  addCommands() {
    return {
      insertFillInBlank:
        (fillText) =>
        ({ commands, editor }) => {
          const position = editor.state.selection.from;
          return commands.insertContentAt(position, {
            type: 'fillInBlank',
            attrs: { editorText: fillText, userText: '' },
          });
        },
      filledInBlank:
        (editorText) =>
        ({ commands }) => {
          return commands.setNodeAttribute('editorText', editorText);
        },
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: /(_{4}\(([^)]+)\))/,
        type: this.type,
        getAttributes: (match) => {
          return {
            editorText: match[2],
          };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: /(_{4}\(([^)]+)\))/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            editorText: match[2],
          };
        },
      }),
    ];
  },

  toDOM() {
    return ['span', { class: 'fillInBlank' }, 0];
  },

  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      { class: 'fillInBlank', ...HTMLAttributes },
      0,
      // Remove the trailing break element
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      const inputRef = useRef(null);
      const [userText, setUserText] = useState(props.node.attrs.userText);

      useEffect(() => {
        inputRef.current.style.color = '#3182CE';
        if (inputRef.current) {
          let textWidth = getTextWidth(userText);
          if (!userText) {
            textWidth = getTextWidth('Blankspace');
          }
          inputRef.current.style.width = `${textWidth + 40}px`;
        }
      }, [userText]);

      const getTextWidth = (text) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = window.getComputedStyle(inputRef.current).font;
        const metrics = context.measureText(text);
        return metrics.width;
      };

      const handleInputChange = (event) => {
        setUserText(event.target.value);
        props.updateAttributes({
          userText: event.target.value,
        });
      };

      const handleToggle = () => {
        setUserText(props.node.attrs.editorText);
        props.updateAttributes({
          userText: props.node.attrs.editorText,
        });
      };

      return (
        <NodeViewWrapper style={{ display: 'inline' }}>
          <span className="fillInBlank" contentEditable={false}>
            <input
              type="text"
              ref={inputRef}
              value={userText || ''}
              onChange={handleInputChange}
              style={{
                borderBottomColor: '#3182CE',
                borderBottomWidth: '0.15rem',
                textAlign: 'center',
                height: '1.5rem',
              }}
            />
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/images/sermons/green-tick.svg'}
              style={{
                display: 'inline-block',
                marginLeft: '0.3rem',
                marginBottom: '-0.2rem',
              }}
              onClick={handleToggle}
            ></img>
          </span>
        </NodeViewWrapper>
      );
    });
  },
});
