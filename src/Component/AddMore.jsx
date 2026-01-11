import React from "react";

export const AddMore = ({props}) => {
    const [totalMarks, setTotalMarks] = React.useState(0);
    const [obtainedMarks, setObtainedMarks] = React.useState(0);

    return (
        <div>
            <input type="number" placeholder="Enter total marks " value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)}/>
            <input type="number" placeholder="Enter obtained marks " value={obtainedMarks} onChange={(e) => setObtainedMarks(e.target.value)}/>
        </div>
    );
};

export default AddMore;
