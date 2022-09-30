import React from "react"

const Question=(props)=>{
    return(
        <section className="question--container" key={index}>
        
        <h1 className="question"> {props.question.question}</h1>
        <div className="option--container">
        {props.question.incorrect_answers.map((option,index)=> <><input type="radio" name="option" id="radio1"/><label htmlFor="radio">{option}</label></>)}
        </div>
        </section>
        
    )
}

export default Question