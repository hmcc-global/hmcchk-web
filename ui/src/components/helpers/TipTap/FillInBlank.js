import { Node, nodeInputRule, nodePasteRule } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import React, { useState, useEffect, useRef } from 'react';

let currentId = 0;

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
      currentId: {
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
          currentId++;
          return commands.insertContentAt(position, {
            type: 'fillInBlank',
            attrs: { editorText: fillText, userText: '', currentId: currentId },
          });
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

  parseHTML() {
    return [
      {
        tag: 'fillInBlank',
      },
    ];
  },

  renderHTML() {
    return [
      'span',
      { class: 'fillInBlank' },
      0,
      // Remove the trailing break element
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      const inputRef = useRef(null);
      // const userInput = props.node.attrs.userText;
      const [userText, setUserText] = useState(() => {
        // Retrieve the userText from localStorage or use an empty string
        const storedUserText = localStorage.getItem(
          `fillInBlank-${props.node.attrs.currentId}-userText`
        );
        return storedUserText || '';
      });

      useEffect(() => {
        inputRef.current.style.color = '#3182CE';
        if (inputRef.current) {
          let textWidth = getTextWidth(userText);
          if (!userText) {
            textWidth = getTextWidth('Blankspace');
          }
          inputRef.current.style.width = `${textWidth + 40}px`;
        }
        localStorage.setItem(
          `fillInBlank-${props.node.attrs.currentId}-userText`,
          userText
        );
      }, [userText]);

      const getTextWidth = (text) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = window.getComputedStyle(inputRef.current).font;
        const metrics = context.measureText(text);
        return metrics.width;
      };

      const handleInputChange = (event) => {
        setUserText(event.target.value.toUpperCase());
        props.updateAttributes({
          userText: event.target.value,
        });
      };

      const handleToggle = () => {
        if (props.node.attrs.editorText === null) {
          return;
        }
        setUserText(props.node.attrs.editorText.toUpperCase());
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
                height: '2rem',
                textTransform: 'uppercase',
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
