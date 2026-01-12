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
    return(
        <>
        <h1>Overall GPA of the Semester is : {resultGPA.toFixed(2)}</h1>
        <button onClick={addSubject}>Add Another Subject</button>
        {
            subjects.map((e) => {
                return(
                    <MyContext.Provider value={{updateTitle, updateCreditHours , updateGPA}} key={e.id}>
                        <App prop={e}/>
                        <button onClick={() => clicking(e.id)}>Delte Subject</button>
                    </MyContext.Provider>
                )
            })
        }
        </>
    )
}
