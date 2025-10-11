import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, isEmptyObject, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MenuBar from './MenuBar.js';
import Link from '@tiptap/extension-link';
import { BibleVerseNode } from './BibleVerseExtension.js';
import { UserNotesNode } from './UserNotesExtension.js';
import { FillInBlankNode } from './FillInBlank.js';
import { FontSize } from './FontSizeExtension.js';

// Find a better way to pass the text passage
export const TextContext = createContext();

export const LastUpdatedPosContext = createContext();

const TiptapEditor = ({
  onEditorChange,
  onFocus,
  existingContent,
  textPassage,
}) => {
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
      FontSize,
      TextStyle,
    ],
    content: existingContent,
    onUpdate: () => {
      const json = editor.getJSON();
      onEditorChange(json);
    },
  });

  const isContentEmpty = useMemo(
    () => isEmptyObject(existingContent) || existingContent === '',
    [existingContent]
  );

  const [lastUpdatedPos, setLastUpdatedPos] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && editor && !isContentEmpty) {
      editor.commands.setContent(existingContent);
      hasRun.current = true;
    }
  }, [existingContent, editor, isContentEmpty]);

  return (
    <LastUpdatedPosContext.Provider
      value={{ lastUpdatedPos, setLastUpdatedPos }}
    >
      <TextContext.Provider value={textPassage}>
        <div
          className="editor"
          onFocus={() => {
            onFocus();
          }}
        >
          {editor && <MenuBar editor={editor} />}
          <EditorContent className="editor__content" editor={editor} />
        </div>
      </TextContext.Provider>
    </LastUpdatedPosContext.Provider>
  );
};

export const useTextContext = () => {
  return useContext(TextContext);
};

export default TiptapEditor;
