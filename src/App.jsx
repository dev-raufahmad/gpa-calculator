import React, { useEffect, useState } from "react"
import AddMore from "./Component/AddMore"
import { MyContext } from "./StateManagement/MyContext";
import { Lab } from "./Component/Lab";
import { OverAllGPACalculator } from "./Utils/OverAllGPACalculator";
import { useContext } from "react";
import { CalculateMarks } from "./Utils/CalculateMarks";

const clicking = (quizMarks, setQuizMarks,isQuiz) => {
  if (quizMarks.length == 4) {
    console.log("We have already reahed the limit!");
    return;
  }

  setQuizMarks([...quizMarks, { id: Date.now(), totalMarks: 0, obtainedMarks: 0 , isQuiz: isQuiz}
  ]);

  console.log(quizMarks);

}

function App({prop}) {



  const updateQuiz = (id, obtainedMarks, totalMarks) => {
    setQuizMarks(quizMarks.map((e) => {
      return e.id === id ? { ...e, obtainedMarks: obtainedMarks, totalMarks: totalMarks } : e;
    }))
  }

  const deleting = (id, quizMarksInput, setQuizMarksInput) => {
    setQuizMarksInput(quizMarksInput.filter((e) => e.id != id)
    );
  }

  const {updateGPA , updateCreditHours ,updateTitle} = useContext(MyContext);


  const [quizMarks, setQuizMarks] = React.useState([]);
  const [assignment, setAssignment] = useState([]);

  const [midterm, setMidterm] = useState(0);
  const [midTermTotal, setMidTermTotal] = useState(0);
  const [finalterm, setFinalterm] = useState(0);
  const [finalTermTotal, setFinalTermTotal] = useState(0);
  const [hasLab, setHasLab] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);

  const [labMarks , setLabMarks] = useState(0);



  const updateAssignment = (id, obtainedMarks, totalMarks) => {
    setAssignment(assignment.map((e) => {
      return e.id === id ? { ...e, obtainedMarks: obtainedMarks, totalMarks: totalMarks } : e;
    }))
  }


    useEffect(() => {
    const mid = midTermTotal > 0 ? (midterm / midTermTotal) * 25 : 0;
    const fin = finalTermTotal > 0 ? (finalterm / finalTermTotal) * 50 : 0;

    const total =
      mid +
      fin +
      CalculateMarks(quizMarks, 15) +
      CalculateMarks(assignment, 10);

    setTotalMarks(total);

    updateGPA(
      prop.id,
      OverAllGPACalculator(
        total,
        prop.creditHours,
        hasLab ? labMarks : -1
      )
    );
  }, [
    midterm,
    midTermTotal,
    finalterm,
    finalTermTotal,
    quizMarks,
    assignment,
    labMarks,
    hasLab,
    prop.creditHours
  ]);


  return (
    <>
      <div>
        <h1>{prop.title} {prop.creditHours}</h1>
      </div>
      <div>
        {/* This div for the labeling of the Subject */}
        <div>
            <label htmlFor="labeling">Subject Name</label>
            <input id="labeling" type="text" value={prop.title} onChange={(e) =>updateTitle(prop.id , e.target.value)} placeholder="Name of Subject here"/>
        </div>
        {/* This div is for the Credit hours of the course */}
        <div>
          <label htmlFor="creditHours">Credit Hours</label>
          <input type="number" value={prop.creditHours} onChange={(e) => updateCreditHours(prop.id , e.target.value)} id="creditHours" />
        </div>
          {/* This div is for the Has-Lab property */}
          <label htmlFor="hasLab">Has Lab</label>
          <input type="checkbox" checked={hasLab} onChange={(e) => setHasLab(e.target.checked)} />
      </div>
      {/* Here is the start of the quizes Marks */}
      <div>
        <h1>Quiz Marks</h1>
        <button onClick={() => clicking(quizMarks, setQuizMarks , true)}>Add Quiz</button>
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
        <button onClick={() => clicking(assignment, setAssignment , false)}>Add Assignment</button>
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
        <h3>MidTermMarks Here</h3>
        <input type="number" value={midTermTotal} onChange={(e) => setMidTermTotal(e.target.value)} placeholder="Total Marks" />
        <input type="number" value={midterm} onChange={(e) => setMidterm(e.target.value)} placeholder="Obtained Marks" />
      </div>
      {/* Here is the start of the Finalterm Marks */}
      <div>
        <h3>FinalTermMarks Here</h3>
        <input type="number" value={finalTermTotal} onChange={(e) => setFinalTermTotal(e.target.value)} placeholder="Total Marks" />
        <input type="number" value={finalterm} onChange={(e) => setFinalterm(e.target.value)} placeholder="Obtained Marks" />
      </div>
      
      <div>
        {/* Your Marks till now is : {calculating()} */}
      </div>

      <div>
        THe value of the quiz marks is : {CalculateMarks(quizMarks, 15)}
      </div>
      <div>
        THe value of the assignemt marks is : {CalculateMarks(assignment, 10)}
      </div>
      {/* Thi section is for the Lab */}
      <div>
        <MyContext.Provider value={{setLabMarks}}>
          {hasLab && <Lab/>}
        </MyContext.Provider>
      </div>
      <div>
        Here is the print of the lab marks on the bases of the app component : {labMarks}
      </div>
      <div>
        OverAll GPA is : {prop.GPA}
      </div>
    </>
  )
}

export default App
