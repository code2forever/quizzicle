import React from "react"

const Quiz=(props)=>{
    
    //All states
    
    // questions --> Holds list of all questions with options as a list which to be render on the screen. It got updated inside useEffect every time playAgain state changes when clicking on the play again button
    
    //playAgain --> Handles the status of play again to fetch new set of questions.
    
    //checkButton --> Handles the status of check button which helps to know when to display the result.
    
    //answers --> Holds all the correct answers in form of property(question) and value(correct answer) which got changed every time we fetch new set of questions.
    
    //quizData --> Holds object of questions (property) and their corresponding option selected by the player (value)
    
    //scoreAchieved --> Holds the count of the questions which are answered correctly by the player.
    
    //dataIsBeingLoaded --> Holds the status if fetching throught API is going on then show some other screens otherwise show questions.
    
    //How objects are made --> property-> question"question no." value-> answerselected/correct answer
    
    const [questions,setQuestions]=React.useState([])
    const [playAgain,setPlayAgain]=React.useState(false)
    const [checkButton,setCheckButton]=React.useState(false)
    const [answers,setAnswers]=React.useState({})
    const [quizData,setQuizData]=React.useState({})
    const [scoreAchieved,setScoreAchieved]=React.useState(0)
    const [dataIsBeingLoaded,setDataIsBeingLoaded]=React.useState(true)
    const comment=["Oops you didn't make any point","Try Harder","Subpar","Not Bad","Great","Excellent"]
    
    
    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=9").then(res=>res.json()).then(result=>{setDataIsBeingLoaded(false);storeData(result.results)})
    },[playAgain])
    
    
    const storeData=(questions)=>{
        setAnswers((prev)=>{
            const ans={};
            for (let i=0;i<questions.length;i++){
                ans[`question${i+1}`]=questions[i].correct_answer;
            }
                return Object.assign({},ans);
        })
        setQuestions(questions);
    }
    
    const handleChange=(event)=>{
        const {name,value}=event.target;
            setQuizData((prev)=> Object.assign({},prev,{[name]:value}))
    }
    
    const checkAnswer=()=>{
        for(let i=0;i<questions.length;i++){
            if(answers[`question${i+1}`]===quizData[`question${i+1}`]){
                setScoreAchieved(prev=>++prev);
            }
        }   
    }
    
    //To reset all the values for a new game.
    const resetAll=()=>{
        setQuestions([]);
        setQuizData({});
        setAnswers({});
        setScoreAchieved(0);
        setDataIsBeingLoaded(true);
    }
    
    //Different styling for correct/incorrect/notselected options which got selected on the basis of checkStatus function
    const styleForCorrect=props.darkMode?{backgroundColor:"#94D7A2",border:"none",color:"inherit",filter:"brightness(120%)"}:{backgroundColor:"#94D7A2",border:"none",filter:"brightness(110%)"}
    const styleForIncorrect={backgroundColor:"#F8BCBC",border:"none",filter:"opacity(0.6)",borderColor:"grey",color:"grey"}
    const styleForUnselect={backgroundColor:"transparent",filter:"opacity(0.6)",borderColor:"grey",color:"grey"}
    
    const checkStatus=(questionIndex,option)=>{
            if (answers[`question${questionIndex+1}`]===option)
                return styleForCorrect
            if (quizData[`question${questionIndex+1}`]===option)
                return styleForIncorrect
            else return styleForUnselect
    }
    
    return (
        <section  className="quiz--container">
        
        {dataIsBeingLoaded? <span className="loading--text">&#10024; Keep it real &#10024;</span>:null}
        
        {questions.map((question,questionIndex)=>
        <section className="question--container" key={questionIndex}>
        
        <h1 className="question"> {question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g,"&")}</h1>
            <div className="option--container">
            {question.incorrect_answers.concat(question.correct_answer).sort().map((option,optionIndex)=>
                    <div key={optionIndex} className="option--subcontainer">
                    <input 
                    disabled={checkButton}
                    type="radio" 
                    name={`question${questionIndex+1}`} 
                    id={`question${questionIndex+1}option${optionIndex+1}`} 
                    value={option} 
                    checked={quizData[`question${questionIndex+1}`]===option}
                    onChange={handleChange}/>
                    
                    <label className="option" style={checkButton?checkStatus(questionIndex,option):{}}
                    htmlFor={`question${questionIndex+1}option${optionIndex+1}`}>{option.replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'")
                    .replace(/&amp;/g,"&")
                    }
                    
                    </label>
                </div>)}
            </div>
        </section>
        )}
    
        {/* General formula is used to find the right comments on the scale of 5 even if no. of questions got increased in the future */}
        {checkButton? <span className="score--text">Your Score {scoreAchieved} / {questions.length} ~ {comment[Math.abs(scoreAchieved/(questions.length/5))]}</span>: null}
        
        {!checkButton?
        <button className="button--check--answer" style={{visibility:dataIsBeingLoaded?"hidden":null}}
        onClick={()=>{setCheckButton(prev=>!prev);checkAnswer()}}>
        Check Answer</button>
        : <button className="button--play--again" onClick={()=>{resetAll();setPlayAgain(prev=>!prev);setCheckButton(prev=>!prev);}}>
        Play Again</button>}
        
        </section>
    )
}

export default Quiz;