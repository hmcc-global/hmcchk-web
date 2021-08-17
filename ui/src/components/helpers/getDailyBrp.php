<?php
    date_default_timezone_set("Asia/Hong_Kong");
    // Alternate between the two years
    $year = date('Y');
    $intYear = intval($year);
    if($intYear % 2 == 0) {
        $jsonVersion = "brp_year_one.json";
    }
    else {
        $jsonVersion = "brp_year_two.json";
    }

    // Grab contents of json and dump to array
    $brpJson = trim(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/wp-content/assets/".$jsonVersion), "\xEF\xBB\xBF");
    $array = json_decode($brpJson);

    // Calculate todays date
    $now = date('Y-m-d', time());
    $current = strtotime($now);
    $yearStart = strtotime($year."-01-01");
    $dateDiff = $current - $yearStart;
    $daysPassed = round($dateDiff / (60 * 60 * 24));
    $leapYear = FALSE;

    if ( $intYear % 4 == 0) {
        if ($intYear % 100 == 0) {
            if ($intYear % 400 == 0) {
                $leapYear = TRUE;
            }
        } 
        else {
            $leapYear = TRUE;
        }
    } 
    
    if ($leapYear) {
        if ($daysPassed >= 58 && $daysPassed <= 59) {
            if ($intYear % 2 == 0) {
              if ($daysPassed == 58) {
                echo("Exodus 23");
              } else if ($daysPassed == 59) {
                echo("Exodus 24");
              }
            } 
            else if ($intYear % 2 == 1) {
              if ($daysPassed == 58) {
                echo("Psalms 63-64");
              } else if ($daysPassed == 59) {
                echo("Psalm 65");
              }
            }
        }
        elseif ($daysPassed >= 60) {
            echo($array[$daysPassed-1]->passage);
        }
        else {
            echo($array[$daysPassed]->passage);
        }
    }
    else {
        echo($array[$daysPassed]->passage);
    }
?>