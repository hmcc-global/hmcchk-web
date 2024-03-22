// import Link from '@tiptap/extension-link'

import { Extension } from '@tiptap/core';

const BibleVerseExtension = Extension.create({
  name: 'bibleVerseExtension',
  priority: 9000,
  addCommands() {
    return {
      setBibleVerse:
        (bibleVerse) =>
        ({ commands }) => {
          return commands.insertContent(bibleVerse);
        },
    };
  },
});

export default BibleVerseExtension;
