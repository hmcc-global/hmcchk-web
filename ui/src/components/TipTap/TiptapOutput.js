import './styles.scss';

import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';
import { EditorContent, useEditor } from '@tiptap/react';
import { TextContext } from './index.js';
import { FillInBlankNode } from './FillInBlank.js';
import { FontSize } from './FontSizeExtension.js';

const TiptapOutput = forwardRef(
  ({ input, textPassage, setUserSermonNotes }, ref) => {
    const editor = useEditor({
      editable: false,
      content: input,
      extensions: [
        StarterKit,
        Highlight,
        TaskList,
        TaskItem,
        Link,
        BibleVerseNode,
        UserNotesNode,
        FillInBlankNode,
        FontSize,
        TextStyle,
      ],
    });

    // Parent pulls HTML (Email) / JSON (Save) on demand — we don't mirror either
    // into React state, so the payload is read live at click time.
    useImperativeHandle(
      ref,
      () => ({
        getHTML: () => (editor ? editor.getHTML() : null),
        getJSON: () => (editor ? editor.getJSON() : null),
      }),
      [editor]
    );

    useEffect(() => {
      if (editor) {
        editor.commands.focus();
      }
    }, [editor]);

    // JSON only: keeps editUserSermonNotes in sync for the localStorage draft.
    // The event payload is { editor, transaction }, so read docChanged off the
    // transaction. Selection-only transactions carry no content and would
    // otherwise re-serialize the whole document on every cursor move.
    useEffect(() => {
      if (editor) {
        const setNotes = ({ transaction }) => {
          if (transaction.docChanged) {
            setUserSermonNotes(editor.getJSON());
          }
        };
        editor.on('transaction', setNotes);

        return () => {
          editor.off('transaction', setNotes);
        };
      }
    }, [editor, setUserSermonNotes]);

    return (
      <TextContext.Provider value={textPassage}>
        <EditorContent editor={editor} />
      </TextContext.Provider>
    );
  }
);

export default TiptapOutput;
