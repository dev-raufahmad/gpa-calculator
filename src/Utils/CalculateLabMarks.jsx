import React from "react";
import { CalculateMarks } from "./CalculateMarks";

export const CalculateLabMarks = (inputAssignentMarks, inputAssignentTotalMarks, midTermMarks , totalMidTermMarks , finalMarks , totalFinalMarks  ) => {

    let number = CalculateMarks(inputAssignentMarks, inputAssignentTotalMarks);

    let midTermNumber = (Number(midTermMarks) / Number(totalMidTermMarks)) * 25;

    let finalTermNumber = (Number(finalMarks) / Number(totalFinalMarks)) * 50;

    console.log("Midterm Number is : " + midTermNumber + " , Final Term Number is : " + finalTermNumber + " , Assignment Number is : " + number + " Total is : " + (number + midTermNumber + finalTermNumber) );
    
    return number + midTermNumber + finalTermNumber;
}
