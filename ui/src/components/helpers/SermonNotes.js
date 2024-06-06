export const getBiblePassage = async (passage, currentText) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/images/bible/ESV.json`);
    const bible = await response.json();

    const trimmedPassage = passage.includes('v.')
      ? currentText.trim()
      : passage.trim();
    let book = '';
    let chapterAndVerse = '';
    if (/^[0-9]/.test(trimmedPassage)) {
      let temp = trimmedPassage.split(' ');
      book = temp[0] + ' ' + temp[1];
      chapterAndVerse = temp[2];
    } else {
      [book, chapterAndVerse] = trimmedPassage.split(' ');
    }
    const [chapter, verse] = chapterAndVerse.split(':');

    // handle the verses in the middle of the sn i.e. vv.
    if (passage.includes('v.')) {
      const textVerses = passage.split('v.').reverse()[0].trim();
      if (textVerses.includes('-')) {
        let verses = textVerses.split('-');
        let passageBlock = '';
        for (let i = verses[0]; i <= verses[1]; i++) {
          passageBlock += `${i} ${bible[book][chapter][i]} `;
        }
        return passageBlock;
      }
      return `${textVerses} ${
        bible[book][chapter][
          /[a-z]/.test(textVerses) ? textVerses.slice(0, -1) : textVerses
        ]
      }`;
    }

    if (bible && bible[book] && bible[book][chapter]) {
      // TO-DO: handle if its different chapter

      if (verse.includes('-')) {
        let verses = verse.split('-');
        let passageBlock = '';
        for (let i = verses[0]; i <= verses[1]; i++) {
          passageBlock += `${i} ${bible[book][chapter][i]} `;
        }
        return passageBlock;
      }
      return `${verse} ${
        bible[book][chapter][/[a-z]/.test(verse) ? verse.slice(0, -1) : verse]
      }`;
    } else {
      return 'Passage not found';
    }
  } catch (err) {
    return 'Passage not found';
  }
};
