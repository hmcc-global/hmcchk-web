import { DateTime } from "luxon";
import { useState } from "react";

const DailyBrp = () => {
  let brpList = [];
  let whichYear = "";
  let intYear = 0;
  let today = DateTime.local().setZone("Asia/Hong_Kong");

  let now = today.startOf("day").toSeconds();
  let yearStart = today.startOf("year").toSeconds();
  let secondsDiff = now - yearStart;
  let daysPassed = Number((secondsDiff / (60 * 60 * 24)).toFixed(0));

  const [brpString, setBrpString] = useState("");

  const determinePassage = (data) => {
    let leapYear = false;
    //putting the passage to an array
    data.map((res) => {
      brpList.push(res.passage);
    });

    //check if its a leapyear
    intYear = today.toFormat("yyyy");
    if (intYear % 4 === 0) {
      if (intYear % 100 === 0) {
        if (intYear % 400 === 0) {
          leapYear = true;
        }
      } else {
        leapYear = true;
      }
    }

    //if its a leap year
    if (leapYear) {
      if (daysPassed >= 58 && daysPassed <= 59) {
        if (intYear % 2 === 0) {
          if (daysPassed === 58) {
            return "Exodus 23";
          } else if (daysPassed === 59) {
            return "Exodus 24";
          }
        } else if (intYear % 2 === 1) {
          if (daysPassed === 58) {
            return "Psalms 63-64";
          } else if (daysPassed === 59) {
            return "Psalm 65";
          }
        }
      } else if (daysPassed >= 60) {
        return brpList[daysPassed - 1];
      } else {
        return brpList[daysPassed];
      }
    } else {
      return brpList[daysPassed];
    }

    return brpList[daysPassed];
  };

  // alternate between two years
  let year = today.toFormat("yyyy");
  if (year % 2 === 0) whichYear = "one";
  else whichYear = "two";

  // even (year one) : true, odd (year two) : false
  // fetch the asset, unpack it, and then determine the correct brp string

  fetch(`${process.env.PUBLIC_URL}/assets/brp_year_${whichYear}.json`)
    .then((res) => res.json())
    .then((data) => {
      setBrpString(determinePassage(data));
    })
    .catch(function (err) {
      console.log(err, " error");
    });

  return brpString;
};

export default DailyBrp;
