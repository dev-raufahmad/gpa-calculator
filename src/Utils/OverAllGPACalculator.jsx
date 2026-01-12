import React from "react";
export const OverAllGPACalculator = (theoryMarks,creditHours,labMarks = -1) => {
    let totalMarks = 0;
    if(labMarks === -1){
        totalMarks = theoryMarks * (creditHours / creditHours);
    }else{
        totalMarks = ((theoryMarks) * ((creditHours - 1)/creditHours))  + (labMarks * (1/creditHours));
    }

    if(totalMarks >= 85){
        return 4.0;
    }else if(totalMarks >= 80){
        return 3.7;
    }else if(totalMarks >= 75){
        return 3.3;
    }else if(totalMarks >= 70){
        return 3.0;
    }
    else if(totalMarks >= 65){
        return 2.7;
    }
    else if(totalMarks >= 60){
        return 2.3;
    }
    else if(totalMarks >= 55){
        return 2.0;
    }
    else if(totalMarks >= 50){
        return 1.7;
    }
    else if(totalMarks >= 45){
        return 1.3;
    }
    else if(totalMarks >= 40){
        return 1.0;
    }else{
        return 0.0;
    }
}




