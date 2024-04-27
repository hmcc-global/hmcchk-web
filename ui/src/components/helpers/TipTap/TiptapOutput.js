import './styles.scss';

import React from 'react';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';
import { EditorContent, useEditor } from '@tiptap/react';

const TiptapOutput = ({ input }) => {
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
    ],
  });

  return <EditorContent editor={editor} />;
};

export default TiptapOutput;
