const levenshtein = require("fast-levenshtein");

function levenshteinFilter(source, maximum = 5) {
  let _source, matches, x, y, index;

  //find column to match names
  for (let i in source[0]) {
    if (source[0][i] == "Name") {
      index = i;
    }
  }

  _source = source.slice();
  matches = [];
  for (x = _source.length - 1; x >= 0; x--) {
    let output = _source.splice(x, 1);
    for (y = _source.length - 1; y >= 0; y--) {
      if (levenshtein.get(output[0][index], _source[y][index]) <= maximum) {
        output.push(_source[y]);
        _source.splice(y, 1);
        x--;
      }
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
  console.log("this is mapGiving");

  console.log("raw", array[0].data);

  let allNameArray = [];

  for (let i = 0; i < array.length; i++) {
    allNameArray.push(array[i].data);
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

  console.log("all", allNameArray);

  //process and clean the data
  let output = levenshteinFilter(allNameArray, 4);

  console.log("output", output);
  let clean = removeDuplicates(output);

  for (let x = 0; x < clean.length; x++) {
    if (clean[x].length > 1) {
      for (let y = 0; y < clean[x].length; y++) {
        for (let z = y + 1; z < clean[x].length; z++) {
          //check for duplicates inside
          if (clean[x][y][0] != clean[x][z][0]) {
            clean.push(clean[x]);
            clean[x].splice(y, 1);
          }
        }
      }
    }
  }

  // //add heading
  // let headers = ["fullName", "userId"];
  // clean.unshift(headers);

  // let cleaner = removeDuplicates(clean);

  // console.log("clean", cleaner);

  // let collection = clean.slice(); // make a copy
  // let keys = collection.shift();

  // collection = collection.map(function (elem) {
  //   let obj = {};
  //   keys.forEach(function (key, i) {
  //     obj[key] = elem[i];
  //   });
  //   return obj;
  // });

  // console.log("test", collection);

  return;
};

export { mapGiving };
