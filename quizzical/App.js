import React from "react"
import Intro from "./Components/Intro"
import Quiz from "./Components/Quiz"
import Footer from "./Components/Footer"

const App=()=>{
    const [startQuiz,setStartQuiz]=React.useState(false);
    const [darkMode,setDarkMode]=React.useState(false);
    
    const quizStart=()=>{
        setStartQuiz(prev=>!prev)
    }
    const toggleMode=()=>{
        setDarkMode(prev=>!prev)
    }
    
    return (
        <main className={darkMode?"dark":""}>
        
        {startQuiz?null:<div onClick={toggleMode} className="toggle--container">
        
            <div className="toggle--ball">
            </div>
        </div>}
        {startQuiz? <Quiz darkMode={darkMode}/> : <Intro quizStart={quizStart}/>}
        <Footer/>
        </main>
    )
}

export default App;