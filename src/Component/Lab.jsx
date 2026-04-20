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

    return(
        <>
            <span></span>
            <h2>Lab Marks</h2>
            {/* This div id for adding the new assignment */}
            <div>
                <button onClick={() => clicking()}>Add Another Assignment</button>
            </div>
            {/* This div is to manage the assignemnts of the Lab */}
            <div>
                {
                    assignemnts.map((e) => (
                        <React.Fragment key={e.id}>
                            <MyContext.Provider value={{updateLabAssignment}} >
                                <AddMore props={e} />
                                <button onClick={() => clickingHere(e.id)}>Delte Assignment</button>
                        </MyContext.Provider>
                        </React.Fragment>
                    ))
                }
            </div>
            {/* This div is to take the midTerm marks */}
            <div>
                <h3>Enter Mid Term Marks</h3>
                <input type="number"placeholder="Enter total mid Term marks" value={midTotalMarks} onChange={(e) => setMidTotalMarks(e.target.value)}/>
                <input type="number"placeholder="Enter midTerm marks" value={midMarks} onChange={(e) => setMidMarks(e.target.value)}/>
                
            </div>
            {/* This div is for the final Term Marks */}
            <div>
                <h3>Enter Final Term Marks</h3>
                <input type="number" placeholder="Enter Total Marks" value={finalTotalMarks} onChange={(e) => setFInalTotalMarks(e.target.value)}/>
                <input type="number" placeholder="Enter obtained Marks" value={finalMarks} onChange={(e) => setFInalMarks(e.target.value)}/>
                
            </div>
            <div>
                The marks from the Assignments of the Lab are : {CalculateMarks(assignemnts , 25)}
            </div>
            <div>
                {/* The total Lab Marks are : {CalculateLabMarks(assignemnts , 25 , midMarks , midTotalMarks , finalMarks , finalTotalMarks)} */}
                The total Marks of the are : {result}
            </div>
        </>
    )
} 