export const getBiblePassage = async (passage) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/assets/ESV.json`);
    const bible = await response.json();

    const processPassage = passage.trim();
    let book = '';
    let chapterAndVerse = '';
    if (/^[0-9]/.test(passage)) {
      let temp = processPassage.split(' ');
      book = temp[0] + ' ' + temp[1];
      chapterAndVerse = temp[2];
    } else {
      [book, chapterAndVerse] = processPassage.split(' ');
    }
    const [chapter, verse] = chapterAndVerse.split(':');

    if (
      bible &&
      bible[book] &&
      bible[book][chapter] &&
      bible[book][chapter][verse]
    ) {
      return bible[book][chapter][verse];
    } else {
      return 'Passage not found';
    }
  } catch (err) {
    console.log(err, ' error');
    return 'Passage not found';
  }
};

export const isBibleVerse = async (passage) => {};
