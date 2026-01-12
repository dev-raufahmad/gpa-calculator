import React, { useState } from "react"
import AddMore from "./Component/AddMore"
import { MyContext } from "./StateManagement/MyContext";
import { Lab } from "./Component/Lab";

const clicking = (quizMarks, setQuizMarks,isQuiz) => {
  if (quizMarks.length == 4) {
    console.log("We have already reahed the limit!");
    return;
  }

  setQuizMarks([...quizMarks, { id: Date.now(), totalMarks: 0, obtainedMarks: 0 , isQuiz: isQuiz}
  ]);

  console.log(quizMarks);

}


// Here is the start of the main APP function
function App() {



  const updateQuiz = (id, obtainedMarks, totalMarks) => {
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

  const [title , setTitle] = useState("");
  const [creditHours , setCreditHours] = useState();
  const [hasLab, setHasLab] = useState(false);


  const [labMarks , setLabMarks] = useState(0);


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
      <div>
        <h1>{title} {creditHours}</h1>
      </div>
      <div>
        {/* This div for the labeling of the Subject */}
        <div>
            <label htmlFor="labeling">Subject Name</label>
            <input id="labeling" type="text" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Name of Subject here"/>
        </div>
        {/* This div is for the Credit hours of the course */}
        <div>
          <label htmlFor="creditHours">Credit Hours</label>
          <input type="number" value={creditHours} onChange={(e) => setCreditHours(e.target.value)} id="creditHours" />
        </div>
        {/* This div is for the Has-Lab property */}
        <label htmlFor="hasLab">Has Lab</label>
        <input type="checkbox" value={hasLab} onChange={() => setHasLab(!hasLab)} />
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
        Your Marks till now is : {calculating()}
      </div>

      <div>
        THe value of the quiz marks is : {marksCalculator(quizMarks, 15)}
      </div>
      <div>
        THe value of the assignemt marks is : {marksCalculator(assignment, 10)}
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
    </>
  )
}

export default App
