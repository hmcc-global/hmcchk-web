import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, isEmptyObject, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { createContext, useContext, useEffect, useState } from 'react';
import MenuBar from './MenuBar.js';
import Link from '@tiptap/extension-link';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';
import { FillInBlankNode } from './FillInBlank.js';

// Find a better way to pass the text passage
export const TextContext = createContext();

const TiptapEditor = ({
  onEditorChange,
  onFocus,
  existingContent,
  textPassage,
}) => {
  const [blurred, setBlurred] = useState(true);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Link,
      BibleVerseNode,
      UserNotesNode,
      FillInBlankNode,
    ],
    content: existingContent,
    onUpdate: () => {
      const json = editor.getJSON();
      onEditorChange(json);
    },
  });

  const isContentEmpty = isEmptyObject(existingContent);
  useEffect(() => {
    if (editor && !isContentEmpty && blurred) {
      editor.commands.setContent(existingContent);
    }
  }, [editor, isContentEmpty, blurred]);

  return (
    <TextContext.Provider value={textPassage}>
      <div
        className="editor"
        onFocus={() => {
          onFocus();
          setBlurred(false);
        }}
        onBlur={() => setBlurred(true)}
      >
        {editor && <MenuBar editor={editor} />}
        <EditorContent className="editor__content" editor={editor} />
      </div>
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  return useContext(TextContext);
};

export default TiptapEditor;
