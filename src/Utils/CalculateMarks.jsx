import React from "react";


export const CalculateMarks = (inputData, totalMarks) => {
    let totalObtained = Number(0);
    let totalMarksInput = Number(0);
    inputData.forEach((e) => {
        totalObtained += Number(e.obtainedMarks);
        totalMarksInput += Number(e.totalMarks);
    })
    if (totalMarksInput === 0) return 0;
    console.log("The marks from the quizes are : " + ((totalObtained / totalMarksInput) * totalMarks));
    return (totalObtained / totalMarksInput) * totalMarks;
};