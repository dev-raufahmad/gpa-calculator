import React from "react";


export const CalculateGpaOfTheSmester = (subjects) => {
    let totalCreditHours = 0;
    let totalWeightedGPA = 0;
    subjects.forEach((subject) => {
        totalCreditHours += subject.creditHours;
        totalWeightedGPA += subject.GPA * subject.creditHours;
    });

    if(totalCreditHours === 0) return 0.0;  
    return totalWeightedGPA / totalCreditHours;
}