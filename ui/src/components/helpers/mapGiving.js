const levenshtein = require("fast-levenshtein");

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

// function groupBy(arr, criteria) {
//   return arr.reduce(function (obj, item) {
//     // Check if the criteria is a function to run on the item or a property of it
//     let key = typeof criteria === "function" ? criteria(item) : item[criteria];

//     // If the key doesn't exist yet, create it
//     if (!Object.prototype.hasOwnProperty.call(obj, key)) {
//       obj[key] = [];
//     }

//     // Push the value to the object
//     obj[key].push(item);

//     // Return the object to the next item in the loop
//     return obj;
//   }, {});
// }

function levenshteinFilter(source, maximum = 5) {
  let _source, matches, x, y;

  let names = source.map(function (value, index) {
    return value[0];
  });
  let numbers = source.map(function (value, index) {
    return value[1];
  });

  _source = source.map((element) => element[0]).slice();
  matches = [];
  for (x = _source.length - 1; x >= 0; x--) {
    let output = _source.splice(x, 1);
    for (y = _source.length - 1; y >= 0; y--) {
      if (levenshtein.get(output[0], _source[y]) <= maximum) {
        output.push(_source[y]);
        _source.splice(y, 1);
        x--;
      }
    }
    matches.push(output);
  }
  return matches;
}

const mapGiving = (array) => {
  console.log("this is mapGiving");

  //find out which column are their first and last names
  let firstNameIndex, lastNameIndex, userIDIndex;

  for (let i in array[0].data) {
    if (array[0].data[i] == "First Name") {
      firstNameIndex = i;
    } else if (array[0].data[i] == "Last Name") {
      lastNameIndex = i;
    } else if (array[0].data[i] == "User ID") {
      userIDIndex = i;
    }
  }

  //clean up the name data
  // let nameObj = new Array();
  let nameArray = new Array();

  for (let j in array) {
    if (j == 0) {
      continue; //skip heading column
    }
    let temp = new Object();
    temp["firstName"] = array[j].data[firstNameIndex];
    temp["lastName"] = array[j].data[lastNameIndex];
    temp["userId"] = array[j].data[userIDIndex];
    // temp["fullName"] = temp["firstName"] + " " + temp["lastName"];
    // nameObj.push(temp);

    const fullName = temp["firstName"] + " " + temp["lastName"];
    let result = [fullName, temp["userId"]];
    nameArray.push(result);
  }

  console.log("nameArray", nameArray);

  let output = levenshteinFilter(nameArray, 4);
  console.log("output", output);

  // console.log("test", similarity("Tamara Yustian", "Yustian Tamara"));

  // for (let a in nameArray) {
  //   for (let b in nameArray) {
  //     let output = similarity(nameArray[a], nameArray[b]);
  //     console.log(nameArray[a], "/", nameArray[b], ":", output);
  //   }
  // }

  // console.log("nameObj", nameObj);

  return array;
};

export { mapGiving };
