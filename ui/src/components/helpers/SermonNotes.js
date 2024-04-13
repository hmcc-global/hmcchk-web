export const getBiblePassage = async (passage) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/assets/ESV.json`);
    const bible = await response.json();

    const [book, chapterAndVerse] = passage.split(' '); // change this to take care of books with spaces
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

export const isBibleVerse = async (passage) => {
  
}