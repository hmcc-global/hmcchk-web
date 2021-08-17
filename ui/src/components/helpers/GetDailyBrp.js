import React, {useState, useEffect} from 'react';
import {DateTime} from 'luxon';

const GetDailyBrp = () => {
  let leapYear = false;
  let brpList = [];
  let evenYear = "";
  let intYear = 0;
  let today = DateTime.local().setZone("Asia/Hong_Kong");
  const [data , setData] = useState([]);
  const [dailyBrp, setDailyBrp] = useState("");

  const GetJsonData = (year) => {
  //even (year one) : true, odd (year two) : false
      fetch(`./assets/brp_year_${year}.json`).then(
        function(res){
        return res.json()
      }).then(function(data){
        setData(data)
      }).catch(
        function(err){
          console.log(err, ' error')
        }
      );
  }

  const GetDaysPassed = () => {
    let now = today.startOf('day').toSeconds();
    let yearStart = today.startOf('year').toSeconds();
    let secondsDiff = now - yearStart ;
    let daysPassed = Number((secondsDiff/(60*60*24)).toFixed(0));
    return daysPassed;
  }
  
  //alternate between two years
  let year = today.toFormat('yyyy');
  if(year % 2 == 0) evenYear = "one";
  else evenYear = "two";

  GetJsonData(evenYear);

  //putting the passage to an array
  data.map((res)=>{brpList.push(res.passage)})
  
  //check if its a leapyear
  intYear = today.toFormat('yyyy');
  if ( intYear % 4 == 0) {
    if (intYear % 100 == 0) {
        if (intYear % 400 == 0) {
            leapYear = true;
        }
    } 
    else {
        leapYear = true;
    }
  } 

  //if its a leap year
  let daysPassed = GetDaysPassed();
  if (leapYear) {
    if (daysPassed >= 58 && daysPassed <= 59) {
        if (intYear % 2 == 0) {
          if (daysPassed == 58) {
            return ("Exodus 23");
          } else if (daysPassed == 59) {
            return ("Exodus 24");
          }
        } 
        else if (intYear % 2 == 1) {
          if (daysPassed == 58) {
            return ("Psalms 63-64");
          } else if (daysPassed == 59) {
            return ("Psalm 65");
          }
        }
    }
    else if (daysPassed >= 60) {
        return (brpList[daysPassed-1]);
    }
    else {
        return (brpList[daysPassed]);
    }
}
else {
    return (brpList[daysPassed]);
}

return (brpList[daysPassed]);
}

export default GetDailyBrp;