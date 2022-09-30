import React from "react"

const Intro=(props)=>{
    return(
        <section className="intro--container">
        <h1 className="intro--heading">Quizzical</h1>
        <h6 className="intro--description">Tricky questions lies ahead</h6>
        <button onClick={props.quizStart} className="intro--start--button">Start quiz</button>
        </section>
    )
}

export default Intro;