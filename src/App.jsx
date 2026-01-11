import React, { useCallback, useState } from "react"
import AddMore from "./Component/AddMore"
import { MyContext } from "./StateManagement/MyContext";

const clicking = (quizMarks, setQuizMarks,isQuiz) => {
  if (quizMarks.length == 4) {
    console.log("We have already reahed the limit!");
    return;
  }

  setQuizMarks([...quizMarks, { id: Date.now(), totalMarks: 0, obtainedMarks: 0 , isQuiz: isQuiz}
  ]);

  console.log(quizMarks);

}
function App() {


  const updateQuiz = (id, obtainedMarks, totalMarks) => {
    // if(obtainedMarks < totalMarks){
    //   console.log("Invalid Marks");
    //   return;
    // }

    setQuizMarks(quizMarks.map((e) => {
      return e.id === id ? { ...e, obtainedMarks: obtainedMarks, totalMarks: totalMarks } : e;
    }))
  }

  const deleting = (id, quizMarksInput, setQuizMarksInput) => {
    setQuizMarksInput(quizMarksInput.filter((e) => e.id != id)
    );
  }
  const [quizMarks, setQuizMarks] = React.useState([]);
  const [assignment, setAssignment] = useState([]);

  const [midterm, setMidterm] = useState();
  const [midTermTotal, setMidTermTotal] = useState();
  const [finalterm, setFinalterm] = useState();
  const [finalTermTotal, setFinalTermTotal] = useState();

  const marksCalculator = (input, number) => {
    let totalObtained = Number(0);
    let totalMarks = Number(0);
    input.forEach((e) => {
      totalObtained += Number(e.obtainedMarks);
      totalMarks += Number(e.totalMarks);
    })
    if (totalMarks === 0) return 0;
    console.log("The marks from the quizes are : " + ((totalObtained / totalMarks) * number));
    return (totalObtained / totalMarks) * number;
  };

  const updateAssignment = (id, obtainedMarks, totalMarks) => {
    setAssignment(assignment.map((e) => {
      return e.id === id ? { ...e, obtainedMarks: obtainedMarks, totalMarks: totalMarks } : e;
    }))
  }
  const calculating = () => {
    const midObt = Number(midterm);
    const midTot = Number(midTermTotal);
    const finObt = Number(finalterm);
    const finTot = Number(finalTermTotal);

    const mid = midTot > 0 ? (midObt / midTot) * 25 : 0;
    const final = finTot > 0 ? (finObt / finTot) * 50 : 0;

    return mid + final + marksCalculator(assignment , 10) + marksCalculator(quizMarks , 15);
  }


  return (
    <>
      <h1>GPA Calculator</h1>
      {/* Here is the start of the quizes Marks */}
      <div>
        <h1>Quiz Marks</h1>
        <button onClick={() => clicking(quizMarks, setQuizMarks , true)}>Add More</button>
        {
          quizMarks.map((e) => (
            <MyContext.Provider key={e.id} value={{ updateQuiz }}>
              <AddMore props={e} />
              <button onClick={() => deleting(e.id, quizMarks, setQuizMarks)}>Delete This Quiz</button>
            </MyContext.Provider>
          )
          )
        }
      </div>
      {/* Here is the start of the Assignent Marks */}
      <div>
        <h1>Assignment Marks</h1>
        <button onClick={() => clicking(assignment, setAssignment , false)}>Add Another Assignment</button>
        {
          assignment.map((e) => (
            <MyContext.Provider key={e.id} value={{ updateAssignment }}>
              <AddMore props={e} />
              <button onClick={() => deleting(e.id, assignment, setAssignment)}>Delete This Assignment</button>
            </MyContext.Provider>
          )
          )
        }

      </div>
      {/* Here is the start of the Midterm Marks */}
      <div>
        <h1>Enter your MidTermMarks Here</h1>
        <input type="number" value={midTermTotal} onChange={(e) => setMidTermTotal(e.target.value)} placeholder="Total Marks" />
        <input type="number" value={midterm} onChange={(e) => setMidterm(e.target.value)} placeholder="Obtained Marks" />
      </div>
      {/* Here is the start of the Finalterm Marks */}
      <div>
        <h1>Enter your FinalTermMarks Here</h1>
        <input type="number" value={finalTermTotal} onChange={(e) => setFinalTermTotal(e.target.value)} placeholder="Total Marks" />
        <input type="number" value={finalterm} onChange={(e) => setFinalterm(e.target.value)} placeholder="Obtained Marks" />
      </div>

      <div>
        Your Marks till now is : {calculating()}
      </div>

      <div>
        THe value of the quiz marks is : {marksCalculator(quizMarks, 15)}
      </div>
      <div>
        THe value of the assignemt marks is : {marksCalculator(assignment, 10)}
      </div>
    </>
  )
}

export default App
