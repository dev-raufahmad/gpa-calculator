import React, { useCallback, useState } from "react"
import AddMore from "./Component/AddMore"

const clicking = (quizMarks,setQuizMarks) => {
  if(quizMarks.length == 4){ console.log("We have already reahed the limit!");
   return;}
  setQuizMarks([...quizMarks,{id : Date.now() , totalMarks : 0, obtainedMarks : 0}])
}




function App() {

  const deleting = (id,quizMarksInput,setQuizMarksInput) => {
    setQuizMarksInput(quizMarksInput.filter((e) => e.id!=id)
      );
  }


  




  const [quizMarks, setQuizMarks] = React.useState([]);
  const [assignment,setAssignment] = useState([]);

  const [midterm,setMidterm] = useState([]);
  const [midTermTotal,setMidTermTotal] = useState([]);
  const [finalterm,setFinalterm] = useState([]);
  const [finalTermTotal,setFinalTermTotal] = useState([]);

const calculating = useCallback(() => {
  const midObt = Number(midterm);
  const midTot = Number(midTermTotal);
  const finObt = Number(finalterm);
  const finTot = Number(finalTermTotal);

  const mid = midTot > 0 ? (midObt / midTot) * 25 : 0;
  const final = finTot > 0 ? (finObt / finTot) * 50 : 0;

  return mid + final;
}, [midterm, midTermTotal, finalterm, finalTermTotal]);


  return (
    <>
      <h1>Niazi's GPA Calculator</h1>
      {/* Here is the start of the quizes Marks */}
      <div>
        <h1>Quiz Marks</h1>
      <button onClick={() => clicking(quizMarks,setQuizMarks)}>Add More</button>
      {
        quizMarks.map((e) => {
          return(
            <div key={e.id}>
              <AddMore props={e}/> <button onClick={() => deleting(e.id,quizMarks , setQuizMarks)}>Delete Marks</button>
            </ div>
          )
        })
      }
      </div>
      <div>
        {/* Here is the start of the Assignent Marks */}
        <h1>Assignment Marks</h1>
        <button onClick={() => clicking(assignment,setAssignment)}>Add Another Assignment</button>
        {
          assignment.map((e) => {
            return(
              <div key={e.id}>
                <AddMore props={e}/>
                <button onClick={() => deleting(e.id , assignment ,setAssignment)}>Delete This Assignemnt</button>
              </div>
            )
          })
        }
      </div>

      <div>
        {/* Here is the start of the Midterm Marks */}
        <h1>Enter your MidTermMarks Here</h1>
        <input type="number" value={midTermTotal} onChange={(e) => setMidTermTotal(e.target.value)} placeholder="Total Marks" />
        <input type="number" value={midterm} onChange={(e) => setMidterm(e.target.value)} placeholder="Obtained Marks" />
      </div>

      <div>
        {/* Here is the start of the Finalterm Marks */}
        <h1>Enter your FinalTermMarks Here</h1>
        <input type="number" value={finalTermTotal} onChange={(e) => setFinalTermTotal(e.target.value)} placeholder="Total Marks" />
        <input type="number" value={finalterm} onChange={(e) => setFinalterm(e.target.value)} placeholder="Obtained Marks" />
      </div>

      <div>
        Your Marks till now is : {calculating()}
      </div>
    </>
  )
}

export default App
