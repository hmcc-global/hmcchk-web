export const getBiblePassage = async (passage, currentText) => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/images/bible/ESV.json`
    );
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

    // handle if its different chapter
    const isDifferentChapter = chapterAndVerse.split(':').length > 2;
    if (bible && bible[book] && isDifferentChapter) {
      const [firstChapterVerse, lastChapterVerse] = chapterAndVerse.split('-');
      const [firstChapter, firstVerse] = firstChapterVerse.split(':');
      const [lastChapter, lastVerse] = lastChapterVerse.split(':');
      let passageBlock = '';
      for (let chapterLoop = Number(firstChapter); chapterLoop <= lastChapter; chapterLoop++) {
        if (chapterLoop === Number(firstChapter)) {
          for (let verseLoop = firstVerse; bible[book][chapterLoop][verseLoop] !== undefined; verseLoop++) {
            passageBlock += `${verseLoop} ${bible[book][chapterLoop][verseLoop]} `;
          }
          passageBlock += '<br />';
        } else if (chapterLoop === Number(lastChapter)) {
          passageBlock += '<br />';
          for (let verseLoop = 1; verseLoop <= lastVerse; verseLoop++) {
            passageBlock += `${verseLoop} ${bible[book][chapterLoop][verseLoop]} `;
          }
        } else {
          passageBlock += '<br />';
          for (let verseLoop = 1; bible[book][chapterLoop][verseLoop] !== undefined; verseLoop++) {
            passageBlock += `${verseLoop} ${bible[book][chapterLoop][verseLoop]} `;
          }
          passageBlock += '<br />';
        }
      }
      return passageBlock;
    }

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

    // handle returning the verse
    if (bible && bible[book] && bible[book][chapter]) {
      if (verse.includes('-')) {
        let verses = verse.split('-');
        let passageBlock = '';

        for (let i = Number(verses[0]); i <= Number(verses[1]); i++) {
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
