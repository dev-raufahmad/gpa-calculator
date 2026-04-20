import React from "react";
import { useState } from "react";
import App from "./App";
import { MyContext } from "./StateManagement/MyContext";
import { CalculateGpaOfTheSmester } from "./Utils/CalculateGpaOfTheSmester";


export const MainApp = () => {

    const [subjects , setSubjects] = useState([]);

    console.log("Here is the print of the subjects from the main app component : " , subjects);
    
    const addSubject = () => {
        setSubjects([...subjects , {id : Date.now() , creditHours : 0 , GPA :0 , title : ""}])
    }

    const clicking = (id) => {
        setSubjects(subjects.filter((e) => e.id != id));
    }

    const updateCreditHours = (id , creditHours) => {
        setSubjects(subjects.map((e) => {
            return e.id === id ? {...e , creditHours : Number(creditHours)} : e;
        }))
    }

    const updateGPA = (id , GPA) => {
        setSubjects(subjects.map((e) => {
            return e.id === id ? {...e , GPA : GPA} : e;
        }))
    }

    const updateTitle = (id , title) => {
        setSubjects(subjects.map((e) => {
            return e.id === id ? {...e , title : title} : e;
        }))
    }

    const resultGPA = CalculateGpaOfTheSmester(subjects);
    // return(
    //     <>
    //     <h1>Overall GPA of the Semester is : {resultGPA.toFixed(2)}</h1>
    //     <button onClick={addSubject}>Add Another Subject</button>
    //     {
    //         subjects.map((e) => {
    //             return(
    //                 <MyContext.Provider value={{updateTitle, updateCreditHours , updateGPA}} key={e.id}>
    //                     <App prop={e}/>
    //                     <button onClick={() => clicking(e.id)}>Delte Subject</button>
    //                 </MyContext.Provider>
    //             )
    //         })
    //     }
    //     </>
    // )


    return (
  <div className="max-w-5xl mx-auto p-6 space-y-6">

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold">
        Overall GPA of the Semester
      </h1>
      <p className="text-lg mt-2">
        {resultGPA.toFixed(2)}
      </p>
    </div>

    {/* Add Subject Button */}
    <div>
      <button
        onClick={addSubject}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
      >
        + Add Another Subject
      </button>
    </div>

    {/* Subjects List */}
    <div className="space-y-6">
      {subjects.map((e) => (
        <div
          key={e.id}
          className="bg-white border border-gray-200 shadow-md rounded-2xl p-4 space-y-3"
        >

          {/* App Component */}
          <MyContext.Provider
            value={{ updateTitle, updateCreditHours, updateGPA }}
          >
            <App prop={e} />
          </MyContext.Provider>

          {/* Footer Actions */}
          <div className="flex justify-end">
            <button
              onClick={() => clicking(e.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete Subject
            </button>
          </div>

        </div>
      ))}
    </div>
  </div>
);
}
