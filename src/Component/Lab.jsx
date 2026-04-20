import React, { useContext ,useEffect , useState } from "react";
import { MyContext } from "../StateManagement/MyContext";
import AddMore from "./AddMore";
import { CalculateMarks } from "../Utils/CalculateMarks";
import { CalculateLabMarks } from "../Utils/CalculateLabMarks";
export const Lab =() => {

    const {setLabMarks} = useContext(MyContext);


    const [midMarks,setMidMarks] = useState(0);
    const [finalMarks,setFInalMarks] = useState(0);
    const [midTotalMarks,setMidTotalMarks] = useState(0);
    const [finalTotalMarks,setFInalTotalMarks] = useState(0);
    const [assignemnts , setAssignment] = useState([]);



const result = CalculateLabMarks(
  assignemnts,
  25,
  midMarks,
  midTotalMarks,
  finalMarks,
  finalTotalMarks
);


useEffect(() => {
  setLabMarks(result);
}, [result]);


const updateLabAssignment = (id, obtainedMarks, totalMarks) => {
  setAssignment(assignemnts.map((e) =>
    e.id === id
      ? { ...e, obtainedMarks, totalMarks }
      : e
  ));
};


    const clicking = () => {
        setAssignment([...assignemnts , {id : Date.now() , obtainedMarks : 0 , totalMarks : 0 , isQuiz : 3}])
        
        
    }

    const clickingHere = (id) => {
        setAssignment(assignemnts.filter((e) => e.id != id));
    }

    // return(
    //     <>
    //         <h2>Lab Marks</h2>
    //         {/* This div id for adding the new assignment */}
    //         <div>
    //             <button onClick={() => clicking()}>Add Another Assignment</button>
    //         </div>
    //         {/* This div is to manage the assignemnts of the Lab */}
    //         <div>
    //             {
    //                 assignemnts.map((e) => (
    //                     <React.Fragment key={e.id}>
    //                         <MyContext.Provider value={{updateLabAssignment}} >
    //                             <AddMore props={e} />
    //                             <button onClick={() => clickingHere(e.id)}>Delte Assignment</button>
    //                     </MyContext.Provider>
    //                     </React.Fragment>
    //                 ))
    //             }
    //         </div>
    //         {/* This div is to take the midTerm marks */}
    //         <div>
    //             <h3>Enter Mid Term Marks</h3>
    //             <input type="number"placeholder="Enter total mid Term marks" value={midTotalMarks} onChange={(e) => setMidTotalMarks(e.target.value)}/>
    //             <input type="number"placeholder="Enter midTerm marks" value={midMarks} onChange={(e) => setMidMarks(e.target.value)}/>
                
    //         </div>
    //         {/* This div is for the final Term Marks */}
    //         <div>
    //             <h3>Enter Final Term Marks</h3>
    //             <input type="number" placeholder="Enter Total Marks" value={finalTotalMarks} onChange={(e) => setFInalTotalMarks(e.target.value)}/>
    //             <input type="number" placeholder="Enter obtained Marks" value={finalMarks} onChange={(e) => setFInalMarks(e.target.value)}/>
                
    //         </div>
    //         <div>
    //             The marks from the Assignments of the Lab are : {CalculateMarks(assignemnts , 25)}
    //         </div>
    //         <div>
    //             {/* The total Lab Marks are : {CalculateLabMarks(assignemnts , 25 , midMarks , midTotalMarks , finalMarks , finalTotalMarks)} */}
    //             The total Marks of the are : {result}
    //         </div>
    //     </>
    // )

    return (
  <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">

    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
      Lab Marks
    </h2>

    {/* Add Assignment Button */}
    <div>
      <button
        onClick={clicking}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        + Add Another Assignment
      </button>
    </div>

    {/* Assignments List */}
    <div className="space-y-3">
      {assignemnts.map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
        >
          <MyContext.Provider value={{ updateLabAssignment }}>
            <AddMore props={e} />
          </MyContext.Provider>

          <button
            onClick={() => clickingHere(e.id)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </div>

    {/* Mid Term Section */}
    <div className="bg-yellow-50 p-4 rounded-xl space-y-2">
      <h3 className="font-semibold text-gray-700">Mid Term Marks</h3>

      <input
        type="number"
        placeholder="Enter total mid term marks"
        value={midTotalMarks}
        onChange={(e) => setMidTotalMarks(Number(e.target.value))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      <input
        type="number"
        placeholder="Enter obtained marks"
        value={midMarks}
        onChange={(e) => setMidMarks(Number(e.target.value))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
      />
    </div>

    {/* Final Term Section */}
    <div className="bg-purple-50 p-4 rounded-xl space-y-2">
      <h3 className="font-semibold text-gray-700">Final Term Marks</h3>

      <input
        type="number"
        placeholder="Enter total marks"
        value={finalTotalMarks}
        onChange={(e) => setFInalTotalMarks(Number(e.target.value))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
      />

      <input
        type="number"
        placeholder="Enter obtained marks"
        value={finalMarks}
        onChange={(e) => setFInalMarks(Number(e.target.value))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
      />
    </div>

    {/* Summary */}
    <div className="bg-gray-100 p-4 rounded-xl space-y-2 text-gray-700">
      <p>
        Assignments Marks:{" "}
        <span className="font-semibold">
          {CalculateMarks(assignemnts, 25)}
        </span>
      </p>

      <p>
        Total Lab Marks:{" "}
        <span className="font-bold text-blue-700">{result}</span>
      </p>
    </div>
  </div>
);
} 