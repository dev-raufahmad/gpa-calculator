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


  // return (
  //   <div className="flex flex-col gap-y-5 min-h-min min-w-min border-4 border-red-600 " >
  //     <div className="flex flex-row" >
  //       <h1>{prop.title} </h1>
  //       <h1>{prop.creditHours}</h1>
  //     </div>
  //     <div className="flex flex-row justify-evenly text-white font-semibold p-5 bg-blue-700" >
  //       {/* This div for the labeling of the Subject */}
  //       <div className="flex flex-col gap-y-1" >
  //           <label htmlFor="labeling">Subject Name</label>
  //           <input id="labeling" type="text" value={prop.title} onChange={(e) =>updateTitle(prop.id , e.target.value)} placeholder="Name of Subject here"/>
  //       </div>
  //       {/* This div is for the Credit hours of the course */}
  //       <div className="flex flex-col gap-y-1" >
  //         <label htmlFor="creditHours">Credit Hours</label>
  //         <input className="border border-black" type="number" value={prop.creditHours} onChange={(e) => updateCreditHours(prop.id , e.target.value)} id="creditHours" />
  //       </div>
  //         {/* This div is for the Has-Lab property */}
  //         <div className="flex flex-row gap-x-3" >
  //           <label htmlFor="hasLab">Has Lab</label>
  //         <input className="border border-black" type="checkbox" id="hasLab" checked={hasLab} onChange={(e) => setHasLab(e.target.checked)} />
  //         </div>
  //     </div>
  //     {/* Here is the start of the quizes Marks */}
  //     <div>
  //       <h1>Quiz Marks</h1>
  //       <button onClick={() => clicking(quizMarks, setQuizMarks , true)}>Add Quiz</button>
  //       {
  //         quizMarks.map((e) => (
  //           <MyContext.Provider key={e.id} value={{ updateQuiz }}>
  //             <AddMore props={e} />
  //             <button onClick={() => deleting(e.id, quizMarks, setQuizMarks)}>Delete This Quiz</button>
  //           </MyContext.Provider>
  //         )
  //         )
  //       }
  //     </div>
  //     {/* Here is the start of the Assignent Marks */}
  //     <div>
  //       <h1>Assignment Marks</h1>
  //       <button onClick={() => clicking(assignment, setAssignment , false)}>Add Assignment</button>
  //       {
  //         assignment.map((e) => (
  //           <MyContext.Provider key={e.id} value={{ updateAssignment }}>
  //             <AddMore props={e} />
  //             <button onClick={() => deleting(e.id, assignment, setAssignment)}>Delete This Assignment</button>
  //           </MyContext.Provider>
  //         )
  //         )
  //       }

  //     </div>
  //     {/* Here is the start of the Midterm Marks */}
  //     <div>
  //       <h3>MidTermMarks Here</h3>
  //       <input type="number" value={midTermTotal} onChange={(e) => setMidTermTotal(e.target.value)} placeholder="Total Marks" />
  //       <input type="number" value={midterm} onChange={(e) => setMidterm(e.target.value)} placeholder="Obtained Marks" />
  //     </div>
  //     {/* Here is the start of the Finalterm Marks */}
  //     <div>
  //       <h3>FinalTermMarks Here</h3>
  //       <input type="number" value={finalTermTotal} onChange={(e) => setFinalTermTotal(e.target.value)} placeholder="Total Marks" />
  //       <input type="number" value={finalterm} onChange={(e) => setFinalterm(e.target.value)} placeholder="Obtained Marks" />
  //     </div>
      
  //     <div>
  //       {/* Your Marks till now is : {calculating()} */}
  //     </div>

  //     <div>
  //       THe value of the quiz marks is : {CalculateMarks(quizMarks, 15)}
  //     </div>
  //     <div>
  //       THe value of the assignemt marks is : {CalculateMarks(assignment, 10)}
  //     </div>
  //     {/* Thi section is for the Lab */}
  //     <div>
  //       <MyContext.Provider value={{setLabMarks}}>
  //         {hasLab && <Lab/>}
  //       </MyContext.Provider>
  //     </div>
  //     <div>
  //       Here is the print of the lab marks on the bases of the app component : {labMarks}
  //     </div>
  //     <div>
  //       OverAll GPA is : {prop.GPA}
  //     </div>
  //   </div>
  // )


  return (
  <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200 space-y-6">

    {/* Header */}
    <div className="flex justify-between items-center border-b pb-3">
      <h1 className="text-xl font-bold text-gray-800">{prop.title}</h1>
      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        {prop.creditHours} CH
      </span>
    </div>

    {/* Subject Info */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm text-gray-600">Subject Name</label>
        <input
          type="text"
          value={prop.title}
          onChange={(e) => updateTitle(prop.id, e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Credit Hours</label>
        <input
          type="number"
          value={prop.creditHours}
          onChange={(e) => updateCreditHours(prop.id, e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          checked={hasLab}
          onChange={(e) => setHasLab(e.target.checked)}
          className="w-4 h-4"
        />
        <label className="text-gray-700">Has Lab</label>
      </div>
    </div>

    {/* Quiz Section */}
    <div className="bg-gray-50 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-700">Quiz Marks</h2>
        <button
          onClick={() => clicking(quizMarks, setQuizMarks, true)}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      {quizMarks.map((e) => (
        <div key={e.id} className="flex justify-between items-center mb-2">
          <MyContext.Provider value={{ updateQuiz }}>
            <AddMore props={e} />
          </MyContext.Provider>
          <button
            onClick={() => deleting(e.id, quizMarks, setQuizMarks)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>

    {/* Assignment Section */}
    <div className="bg-gray-50 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-700">Assignments</h2>
        <button
          onClick={() => clicking(assignment, setAssignment, false)}
          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
        >
          + Add
        </button>
      </div>

      {assignment.map((e) => (
        <div key={e.id} className="flex justify-between items-center mb-2">
          <MyContext.Provider value={{ updateAssignment }}>
            <AddMore props={e} />
          </MyContext.Provider>
          <button
            onClick={() => deleting(e.id, assignment, setAssignment)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>

    {/* Mid + Final */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-yellow-50 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Mid Term</h3>
        <input
          type="number"
          placeholder="Total"
          value={midTermTotal}
          onChange={(e) => setMidTermTotal(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Obtained"
          value={midterm}
          onChange={(e) => setMidterm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="bg-purple-50 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Final Term</h3>
        <input
          type="number"
          placeholder="Total"
          value={finalTermTotal}
          onChange={(e) => setFinalTermTotal(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Obtained"
          value={finalterm}
          onChange={(e) => setFinalterm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>

    {/* Lab */}
    {hasLab && (
      <div className="bg-indigo-50 p-4 rounded-xl">
        <MyContext.Provider value={{ setLabMarks }}>
          <Lab />
        </MyContext.Provider>
      </div>
    )}

    {/* Results */}
    <div className="bg-gray-900 text-white p-4 rounded-xl space-y-2">
      <p>Quiz Weightage: {CalculateMarks(quizMarks, 15)}</p>
      <p>Assignment Weightage: {CalculateMarks(assignment, 10)}</p>
      <p>Lab Marks: {labMarks}</p>
      <p className="text-lg font-bold">GPA: {prop.GPA}</p>
    </div>
  </div>
);
}

export default App
