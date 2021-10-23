// String conversion tools
const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

const sentencize = (str) => {
  return str
    .split(/([A-Z]|\d)/)
    .map((v, i, arr) => {
      // If first block then capitalise 1st letter regardless
      if (!i) return v.charAt(0).toUpperCase() + v.slice(1);
      // Skip empty blocks
      if (!v) return v;
      // Underscore substitution
      if (v === "_") return " ";
      // We have a capital or number
      if (v.length === 1 && v === v.toUpperCase()) {
        const previousCapital = !arr[i - 1] || arr[i - 1] === "_";
        const nextWord = i + 1 < arr.length && arr[i + 1] && arr[i + 1] !== "_";
        const nextTwoCapitalsOrEndOfString =
          i + 3 > arr.length || (!arr[i + 1] && !arr[i + 3]);
        // Insert space
        if (!previousCapital || nextWord) v = " " + v;
        // Start of word or single letter word
        if (nextWord || (!previousCapital && !nextTwoCapitalsOrEndOfString))
          v = v.toLowerCase();
      }
      return v;
    })
    .join("");
}

export { camelize, sentencize };
