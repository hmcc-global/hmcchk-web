import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import MenuBar from './MenuBar.js';
import Link from '@tiptap/extension-link';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Link,
      BibleVerseNode,
      UserNotesNode,
    ],
  });

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};