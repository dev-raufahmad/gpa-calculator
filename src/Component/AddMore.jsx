import React from "react";
import { useContext } from "react";
import { MyContext } from "../StateManagement/MyContext";
export const AddMore = ({props}) => {

    const MyFunction = (obtainedMarks,totalMarks) => {
        if(props.isQuiz==1){
            updateQuiz(props.id,obtainedMarks,totalMarks);
        }else if(props.isQuiz ==3){
            updateLabAssignment(props.id,obtainedMarks,totalMarks);
        }
        else{
            updateAssignment(props.id,obtainedMarks,totalMarks);
        }
    }

    const {updateQuiz,updateAssignment,updateLabAssignment} = useContext(MyContext);
    return (
        <div className="flex flex-row w-full h-20 justify-evenly" >
            <input type="number" placeholder="Enter total marks " value={props.totalMarks} onChange={(e) => MyFunction(props.obtainedMarks,e.target.value)}/>
            <input type="number" placeholder="Enter obtained marks " value={props.obtainedMarks} onChange={(e) => MyFunction(e.target.value,props.totalMarks)}/>
        </div>
    );
};
export default AddMore;
