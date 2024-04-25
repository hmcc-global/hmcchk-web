import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import MenuBar from './MenuBar.js';
import Link from '@tiptap/extension-link';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';
import { FillInBlankNode } from './FillInBlank.js';

const TiptapEditor = ({ onEditorChange, onFocus, existingContent }) => {
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

  useEffect(() => {
    if (editor && existingContent) {
      editor.commands.setContent(existingContent);
    }
  }, [editor, existingContent]);

  return (
    <div className="editor" onFocus={onFocus}>
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};

export default TiptapEditor;
