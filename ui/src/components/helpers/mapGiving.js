import { customAxios as axios } from "./customAxios";
const stringSimilarity = require("string-similarity");

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
    // array[i].data.pop(); //delete GivingType
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

  //remove duplicates inside the grouped arrays
  clean = removeDuplicatesInside(clean);

  //remove duplicates once again outside the arrays
  let unique = [];
  clean.forEach((element) => {
    if (!unique.includes(element[0])) {
      unique.push(element[0]);
    }
  });

  //get user data from db and split it to arrays
  const userData = await getUserDict();

  let userFullNames = userData.map((obj) => {
    return obj.fullName;
  });

  let userGivingInfos = userData.map((obj) => {
    return obj.givingInfo;
  });

  //find matches in db
  for (let i = 0; i < unique.length; i++) {
    let info = [];
    let temp = unique[i][index];

    if (userGivingInfos[i].length > 0) {
      //if there are any giving info, then match with aliases or tithely
      if (userGivingInfos[i][0].aliases.indexOf(temp) > 0) {
        info = userData[i];
      } else if (userGivingInfos[i][0].tithely.indexOf(unique[i][0]) > 0) {
        info = userData[i];
      } else {
        //if there is no matching giving info, then find best match
        let match = stringSimilarity.findBestMatch(temp, userFullNames);
        if (match.bestMatch.rating > 0.5) {
          info = userData[match.bestMatchIndex];
        }
      }
    } else {
      // if there is no giving info, find best match
      let match = stringSimilarity.findBestMatch(temp, userFullNames);
      console.log(match);
      if (match.bestMatch.rating > 0.5) {
        info = userData[match.bestMatchIndex];
      }
    }

    // if info is found, then push it to array
    if (info != undefined) {
      unique[i].push(
        info["fullName"],
        info["campus"],
        info["lifestage"],
        info["lifeGroup"],
        info["ministryTeam"],
        info["isMember"]
      );
    }
  }

  //add heading row for csv
  headers.push(
    "fullName",
    "campus",
    "lifestage",
    "lifeGroup",
    "ministryTeam",
    "isMember"
  );
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
