

import "./QuizeUi.css";
import propTypes from "prop-types";
function QuizeUI(props) {

   // useEffect(()=> {
  //   const savedProgress = localStorage.getItem("QuizProgress");
  //   if(savedProgress){
  //     const {currentQuizQuestion, SelectedOption, score} = JSON.parse(savedProgress);
  //     setSavedQuestionIndex(currentQuizQuestion);
  //     setSavedSelectedAnswers(selectedOption);
  //     setQuizTotalScore(score);

  //   }
  // }, []);

   // useEffect(() => {
  //   const quizProgress = {
  //     currentQuestionIndex,
  //     userSelectedOption,
  //     totalScore,
  //   }
  //   localStorage.setItem("QuizProgress", JSON.stringify(quizProgress))
  // }, [currentQuestionIndex,userSelectedOption,totalScore])

  const styles = (option) => {
    if (!props.isOptionSelected) {
      return {};
    }
    if (option === props.currentQuestion.correct_answer) {
      return { backgroundColor: "#3aa832", color: "white" };
    }
    if (option === props.userSelectedOption && option !== props.currentQuestion.correct_answer) {
      // console.log(props._selectedOption)// checks if the user selected the wrong answer
      return { backgroundColor: "red", color: "white" };
    }

    return {};
  };

  return (
    <div className="UI-container">
      <div className="top">
        <div className="center">
          <div className="reading">
            <div className="success">
              <label htmlFor="success" className="progress-text">
                {Math.round(props.correctProgress)}%
              </label>
              <progress
                className="rate--progress-bar_success"
                id="success"
                value={props.correctProgress}
                max={100}
              ></progress>
            </div>
            <div className="failed">
              <label htmlFor="failed" className="progress-text">{Math.round(props.wrongProgress)}%</label>
              <progress
                className="rate--progress-bar_failed"
                id="failed"
                value={props.wrongProgress}
                max={100}
              ></progress>
            </div>
          </div>
          <div className="question">
            {props.isLoading ?
             <div className="Question-box">Loading...</div> 
             :
            <div
              className="question-box"
              dangerouslySetInnerHTML={props.sanitizedProps(
                props.currentQuestion?.question
              )}
            />}
          </div>
        </div>
        <div className=" middle-box">
            <div className="middle">
              <div className="middle-text">
                <p>{Math.round(props.totalProgress)}%</p>
              </div>

              <label htmlFor="progress--bar"></label>
              <progress
                value={props.totalProgress}
                max={100}
                id="progress-bar"
                className="progress--bar"
              ></progress>
            </div>
        </div>

      </div>

      <div className="options-box">
        {props.shuffedOption.map((questionOptions, index) => (
          <button
            onClick={() => props.handleOptionSelected(questionOptions)}
            style={styles(questionOptions)}
            className="option"
            key={index}
            dangerouslySetInnerHTML={props.sanitizedProps(questionOptions)}
            disabled = {props.onceSelectedOption !== null}
          ></button>
        ))}
      </div>

      <div className="btn-container">
        <button className="Q-btn" onClick={props.handlePrevQuestion}>
          prev
        </button>
        {/* {props.isQuizeComplete && */}
        <button
          className="Q-btn"
          onClick={props.handleNextQuestion}
          disabled={props.quizData.length === 0}
        >
          next
        </button>
        
      </div>
    </div>
  );
}
QuizeUI.propTypes = {
  isOptionSelected: propTypes.any,
  userSelectedOption: propTypes.any,
  correctProgress: propTypes.any,
  wrongProgress: propTypes.any,
  currentQuestion: propTypes.any,
  sanitizedProps: propTypes.any,
  totalProgress: propTypes.any,
  shuffedOption: propTypes.any,
  handleOptionSelected: propTypes.any,
  onceSelectedOption: propTypes.any,
  handleNextQuestion: propTypes.any,
  handlePrevQuestion: propTypes.any,
  quizData:propTypes.any,
  isLoading: propTypes.any,

}

export default QuizeUI;
