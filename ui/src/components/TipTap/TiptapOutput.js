import './styles.scss';

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';
import { EditorContent, useEditor } from '@tiptap/react';
import { TextContext, LastUpdatedPosContext } from './index.js';
import { FillInBlankNode } from './FillInBlank.js';
import { FontSize } from './FontSizeExtension.js';

const TiptapOutput = forwardRef(
  ({ input, textPassage, setUserSermonNotes }, ref) => {
    const [lastUpdatedPos, setLastUpdatedPos] = useState(null);
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

    // Parent (Email button) pulls HTML on demand — we don't mirror getHTML() into React state.
    useImperativeHandle(
      ref,
      () => ({
        getHTML: () => (editor ? editor.getHTML() : null),
      }),
      [editor]
    );

    useEffect(() => {
      if (editor) {
        editor.commands.focus();
      }
    }, [editor]);

    // JSON only: keeps editUserSermonNotes in sync for Save / localStorage.
    useEffect(() => {
      if (editor && lastUpdatedPos !== null) {
        const setNotes = () => {
          setUserSermonNotes(editor.getJSON());
        };
        editor.on('transaction', setNotes);

        return () => {
          editor.off('transaction', setNotes);
        };
      }
    }, [editor, lastUpdatedPos, setUserSermonNotes]);

    return (
      <LastUpdatedPosContext.Provider
        value={{ lastUpdatedPos, setLastUpdatedPos }}
      >
        <TextContext.Provider value={textPassage}>
          <EditorContent editor={editor} />
        </TextContext.Provider>
      </LastUpdatedPosContext.Provider>
    );
  }
);

export default TiptapOutput;
