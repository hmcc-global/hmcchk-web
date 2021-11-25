const levenshtein = require("fast-levenshtein");

function levenshteinFilter(source, index, maximum = 5) {
  let _source, matches, x, y;

  _source = source.slice();
  matches = [];
  for (x = _source.length - 1; x >= 0; x--) {
    // find similarities through levenshtein algorithm
    let output = _source.splice(x, 1);
    for (y = _source.length - 1; y >= 0; y--) {
      if (levenshtein.get(output[0][index], _source[y][index]) <= maximum) {
        output.push(_source[y]);
        _source.splice(y, 1);
        x--;
      }
      // else {
      //   //take into account flipped names
      //   let lastIndex = index - 1;
      //   let firstIndex = index - 2;
      //   if (
      //     _source[y][lastIndex] == output[0][firstIndex] &&
      //     _source[y][firstIndex] == output[0][lastIndex]
      //   ) {
      //     console.log("source[y]", _source[y]);
      //     console.log("output[0]", output[0]);
      //     output.push(_source[y]);
      //     _source.splice(y, 1);
      //     x--;
      //   }
      // }
    }
    matches.push(output);
  }
  return matches;
}

function removeDuplicates(source) {
  let clean = [];

  for (let x = 0; x < source.length; x++) {
    let temp = [];
    let remove = source[x].filter(function (element) {
      if (temp.indexOf(element.toString()) < 0) {
        temp.push(element.toString());
        return element;
      }
    });
    clean.push(remove);
  }

  return clean;
}

const mapGiving = (array) => {
  //find column to match names
  let index, headers;
  for (let i in array[0].data) {
    if (array[0].data[i] == "Name") {
      index = i;
    }
  }

  //initialize array to be processed
  let allNameArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i == 0) {
      headers = array[i].data;
    } else {
      allNameArray.push(array[i].data);
    }
  }

  // //find out which column are their first and last names
  // let firstNameIndex, lastNameIndex, userIDIndex;

  // for (let i in array[0].data) {
  //   if (array[0].data[i] == "First Name") {
  //     firstNameIndex = i;
  //   } else if (array[0].data[i] == "Last Name") {
  //     lastNameIndex = i;
  //   } else if (array[0].data[i] == "User ID") {
  //     userIDIndex = i;
  //   }
  // }

  // //add full name column
  // allNameArray[0].push("fullName");

  // for (let i in allNameArray) {
  //   if (i == 0) {
  //     continue; //skip heading column
  //   }
  //   firstName = array[i].data[firstNameIndex];
  //   lastName = array[i].data[lastNameIndex];
  //   const fullName = firstName + " " + lastName;
  //   allNameArray[i].push(fullName)
  // }

  //process and clean the data
  let clean = levenshteinFilter(allNameArray, index, 4);

  console.log("clean", clean);

  //check for wrong matched up names inside
  for (let x = 0; x < clean.length; x++) {
    if (clean[x].length > 1) {
      for (let y = 0; y < clean[x].length; y++) {
        for (let z = y + 1; z < clean[x].length; z++) {
          if (clean[x][y][index] != clean[x][z][index]) {
            clean.push(clean[x]);
            clean[x].splice(y, 1);
          }
        }
      }
    }
  }

  //add heading
  clean.unshift(headers);

  console.log("cleaner", clean);

  //turn array into a readable object for export
  let collection = [];
  for (let x = 0; x < clean.length; x++) {
    if (x == 0) {
      continue;
    }
    let elem = clean[x];
    for (let i = 0; i < elem.length; i++) {
      let obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = elem[i][j];
      }
      collection.push(obj);
    }
  }

  console.log("length of clean", clean.length);
  console.log("length of collection", collection.length);

  return collection;
};

export { mapGiving };
