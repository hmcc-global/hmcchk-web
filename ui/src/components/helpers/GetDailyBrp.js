import React, {useState} from 'react';
import {DateTime} from 'luxon';

let leapYear = false;
let test = 'success';

const GetJsonData = (year) => {
//even (year one) : true, odd (year two) : false
  const [data , setData] = useState(null)
  {year ?
    fetch("./assets/brp_year_one.json").then(
      function(res){
      return res.json()
    }).then(function(data){
      setData(data)
    }).catch(
      function(err){
        console.log(err, ' error')
      }
    ) :
    fetch("./assets/brp_year_two.json").then(
      function(res){
      return res.json()
    }).then(function(data){
      setData(data)
    }).catch(
      function(err){
        console.log(err, ' error')
      }
    )
  }
  return data;
}

const getTodayDate = () => {
  let today = DateTime.local().setZone("Asia/Hong_Kong");
  return
}

const GetDailyBrp = () => {
  const [dailyBrp, setDailyBrp] = useState("");

  let brpList = GetJsonData(true).map();
  
  return brpList;
}

export default GetDailyBrp;