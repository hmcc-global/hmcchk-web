import { customAxios as axios } from "./customAxios";

const levenshtein = require("fast-levenshtein");
const stringSimilarity = require("string-similarity");

function levenshteinFilter(source, index, maximum = 4) {
  let _source, matches, x, y;

  _source = source.slice();
  matches = [];
  for (x = _source.length - 1; x >= 0; x--) {
    // find similarities through levenshtein algorithm
    let output = _source.splice(x, 1);
    for (y = _source.length - 1; y >= 0; y--) {
      let score = levenshtein.get(output[0][index], _source[y][index]);
      if (score <= maximum) {
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

function similarityFilter(source, index, minimum = 0.85) {
  let _source, matches, x, y;

  _source = source.slice();
  matches = [];
  for (x = _source.length - 1; x >= 0; x--) {
    // find similarities through levenshtein algorithm
    let output = _source.splice(x, 1);
    for (y = _source.length - 1; y >= 0; y--) {
      let score = stringSimilarity.compareTwoStrings(
        output[0][index],
        _source[y][index]
      );
      if (score >= minimum) {
        output.push(_source[y]);
        _source.splice(y, 1);
        x--;
      }
    }
    matches.push(output);
  }
  return matches;
}

function removeDuplicatesInside(source) {
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

async function getUserDict() {
  const { data } = await axios.get("/api/users/get-dict");
  return data;
}

const mapGiving = async (array) => {
  let index, headers;

  //find column to match names
  for (let i in array[0].data) {
    if (array[0].data[i] == "Name") {
      index = i;
    }
  }

  //initialize array to be processed
  let allNameArray = [];

  for (let i = 0; i < array.length; i++) {
    array[i].data.pop(); //delete GivingType
    if (i == 0) {
      headers = array[i].data; //set headers for later
    } else {
      allNameArray.push(array[i].data);
    }
  }

  //process and clean the data
  // let clean = levenshteinFilter(allNameArray, index);
  let clean = similarityFilter(allNameArray, index);

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

  //remove duplicates inside the arrays
  clean = removeDuplicatesInside(clean);

  console.log("clean length", clean.length);

  //remove duplicates outside the arrays
  let unique = [];
  clean.forEach((element) => {
    if (!unique.includes(element[0])) {
      unique.push(element[0]);
    }
  });

  console.log("unique length", unique.length);

  //get user data from db
  const userData = await getUserDict();

  //get array of fullnames
  // let userFullNames = [];
  // for (let i = 0; i < userData.length; i++) {
  //   userFullNames.push(userData[i].fullName);
  // }
  let userFullNames = userData.map((obj) => obj.fullName);

  //find matches in db
  for (let i = 0; i < unique.length; i++) {
    let match = stringSimilarity.findBestMatch(unique[i][index], userFullNames);
    let info = userData[match.bestMatchIndex];

    //if possible, find exact matches
    // let info = userData.find((obj) => {
    //   return obj.fullName == unique[i][index];
    // });

    // //else, find similarities
    // if (info != undefined) {
    //   for (let x = 0; x < userData.length; x++) {
    //     // let score = levenshtein.get(unique[i][index], userData[x].fullName);
    //     // if (score <= 4) {
    //     //   info = userData[x];
    //     // }
    //     let score = stringSimilarity.compareTwoStrings(
    //       unique[i][index],
    //       userData[x].fullName
    //     );

    //     if (score >= 0.6 && score < 1) {
    //       console.log(
    //         unique[i][index] + " -- " + userData[x].fullName + " : " + score
    //       );
    //       info = userData[x];
    //     } else if (unique[i][index].includes(userData[x].fullName)) {
    //       console.log(
    //         unique[i][index] + " -- " + userData[x].fullName + " : " + score
    //       );
    //       info = userData[x];
    //     }
    //   }
    // }

    // if info is found, then push it to array
    if (info != undefined) {
      unique[i].push(
        info["campus"],
        info["lifestage"],
        info["lifeGroup"],
        info["ministryTeam"],
        info["isMember"]
      );
    }
  }

  //add heading
  headers.push("campus", "lifestage", "lifeGroup", "ministryTeam", "isMember");
  unique.unshift(headers);

  //turn array into a readable object for export
  let collection = [];
  for (let i = 0; i < unique.length; i++) {
    if (i == 0) {
      continue;
    }
    // let elem = clean[x];
    let obj = {};
    for (let j = 0; j < unique.length; j++) {
      obj[headers[j]] = unique[i][j];
    }
    collection.push(obj);
  }

  return collection;
};

export { mapGiving };
