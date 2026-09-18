import { describe, expect, it } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { UserNotesNode } from './UserNotesExtension.js';

const userNotes =
  '<span style="font-family: var(--chakra-fonts-body); -webkit-text-size-adjust: 100%;">user content here</span><br>line two';

const createEditor = () =>
  new Editor({
    extensions: [StarterKit, UserNotesNode],
    content: {
      type: 'doc',
      content: [
        {
          type: 'userNotes',
          attrs: { id: 'note-1', userNotes },
        },
      ],
    },
  });

describe('UserNotesNode serialization', () => {
  it('serializes user notes as markup, not escaped text', () => {
    const editor = createEditor();
    const html = editor.getHTML();

    expect(html).toContain(
      '<span style="font-family: var(--chakra-fonts-body); -webkit-text-size-adjust: 100%;">user content here</span>'
    );
    expect(html).toContain('<br>line two');
    expect(html).not.toContain('&lt;span');
    expect(html).not.toContain('&lt;br');
  });

  it('user notes html survives a getHTML -> setContent round trip', () => {
    const editor = createEditor();
    const html = editor.getHTML();

    const editor2 = new Editor({
      extensions: [StarterKit, UserNotesNode],
      content: html,
    });

    const node = editor2.state.doc.firstChild;
    expect(node.type.name).toBe('userNotes');
    expect(node.attrs.id).toBe('note-1');
    expect(node.attrs.userNotes).toBe(userNotes);
  });
});
