import React from "react";
import moment from "moment";

const Break = ({
    breakLength,
    handleBreakDecrease,
    handleBreakIncrease
}) => {
        
    const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();

    return (
        <div  className="time-container">
            <h1 id="break-label"> Break Length </h1>
            <h1 id='break-length' className="flex">
            {breakLengthInMinutes} </h1>
                
                <button id='break-decrement'
                onClick={handleBreakDecrease} value="-">-</button>
                                             
                 <button id='break-increment'
                onClick={handleBreakIncrease} value="+">+</button> 
                               
                

            
            
        </div>
    )
}


export default Break;