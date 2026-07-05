import './styles.scss';

import React, { useEffect, useState } from 'react';
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

const TiptapOutput = ({
  input,
  textPassage,
  setUserSermonNotes,
  setHtmlUserNotes,
}) => {
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
    onCreate: ({ editor }) => {
      const setEmailNotes = () => {
        setHtmlUserNotes(editor.getHTML());
      };

      setEmailNotes();
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
      const setEmailNotes = () => {
        setHtmlUserNotes(editor.getHTML());
        console.log(editor.getHTML());
      };

      editor.on('create', setEmailNotes);
      editor.on('create', () => {
        console.log('Create event triggered');
      });

      return () => {
        editor.off('create', setEmailNotes);
      };
    }
  }, [editor, setHtmlUserNotes]);

  useEffect(() => {
    if (editor && lastUpdatedPos !== null) {
      const setNotes = () => {
        setUserSermonNotes(editor.getJSON());
        setHtmlUserNotes(editor.getHTML());
      };
      editor.on('transaction', setNotes);

      return () => {
        editor.off('transaction', setNotes);
      };
    }
  }, [editor, lastUpdatedPos, setUserSermonNotes, setHtmlUserNotes]);
  return (
    <LastUpdatedPosContext.Provider
      value={{ lastUpdatedPos, setLastUpdatedPos }}
    >
      <TextContext.Provider value={textPassage}>
        <EditorContent editor={editor} />
      </TextContext.Provider>
    </LastUpdatedPosContext.Provider>
  );
};

export default TiptapOutput;
