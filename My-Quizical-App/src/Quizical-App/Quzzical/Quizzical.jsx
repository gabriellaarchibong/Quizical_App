import { useMemo, useState } from "react";
import DOMpurify from "dompurify";
import QuizeIntro from "./QuizeIntro";
import QuizeUI from "./QuizeUI";
import QuizicalScore from "./QuizicalScore.jsx";
import "./Quize-App.css";
import data from "./QuizicalData.js";
import LeaderBoard from "./LeaderBoard.jsx";
import Review from "./Review.jsx";
import Cv from "./GenPdf.jsx";
function Quizzical() {
  const [isGameStarted, setIsGameStarted] = useState(true);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isPdfMode, setIsPdfMode] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState(null);
  const [isformSubmitted, setIsformSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestion, setUsedQuestion] = useState(new Set());
  const [questionDisplay, setQuestionDisplay] = useState(0);
  const [shuffedOption, setShuffedOption] = useState([]);
  const [_selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOPtionSelected] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [correctAnswer, setCorrectAnser] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isQuizeComplete, setIsQuizeComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [onceSelectedOption, setOnceSelectedOption] = useState(null);
  const [userSelectedOption, setUserSelectedOption] = useState("")
  const [showleaderboard, setShowleaderBoard] = useState(false);
  const [storedQuestion, setStoredQuestion] = useState([]);

  useMemo(() => {
    const fetchData = () => {
      try {
        const res = data;
        setQuizData(res.results);
        setCurrentQuestion(res.results[0]);
        setShuffedOption(
          shuffuledOptions([
            ...res.results[0].incorrect_answers,
            res.results[0].correct_answer,
          ])
        );
        setUsedQuestion(new Set([0]));
        setQuestionHistory([0]);
      } catch (e) {
        console.log(e);
      } finally {
        console.log("finally");
      }
    };

    fetchData();
  }, []);

  const sanitizedProps = (data) => ({ __html: DOMpurify.sanitize(data) });

  function calculateTimeTaken(start, end) {
    const duration = end - start;
    const totalSeconds = Math.round(duration / 1000);
    const hours = Math.round(totalSeconds / 3600);
    const minutes = Math.round((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h: ${minutes}m: ${seconds}s`;
  }


  function handleGameCompletion(score) {
    const userName = localStorage.getItem("userName");
    const userGender = localStorage.getItem("userGender");
    const startTime = new Date(localStorage.getItem("gameStartTime"))
    const endTime =  new Date();
    const timeTaken = calculateTimeTaken(startTime, endTime);
    const currentDate = new Date();
    const formatedTime = currentDate.toLocaleDateString()

    saveToLeaderBoard({
      userName,
      userGender,
      endTime,
      timeTaken,
      score,
      formatedTime,
    });
  }

  function saveToLeaderBoard({
    userName,
    userGender,
    endTime,
    timeTaken,
    score,
    formatedTime,
  }) {
    const currentLeaderBoard =
      JSON.parse(localStorage.getItem("leaderBoard")) || [];
    const rank = calculateRank(score, currentLeaderBoard);
    const newEntry = {
      userName,
      userGender,
      endTime,
      timeTaken,
      score,
      rank,
      formatedTime,
    };
    const updatedleaderBoard = [...currentLeaderBoard, newEntry].sort(
      (a, b) => b.score - a.score
    );
    localStorage.setItem("leaderBoard", JSON.stringify(updatedleaderBoard));
  }

  function calculateRank(newScore, leaderBoard) {
    const sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score);
    let rank = 1;
    for (let i = 0; i < sortedLeaderBoard.length; i++) {
      const entry = sortedLeaderBoard[i];
      if (newScore < entry.score) {
        rank++;
      } else {
        break;
      }
    }
    return rank;
  }

  function handleStartGame(userData) {
    setUser(userData);
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userGender", userData.gender);
  }

  function handleClick() {
    setIsGameStarted(false); 
    const startTime = new Date();
    const formatedTime = startTime.toLocaleDateString()
    localStorage.setItem("currentDate", formatedTime)
    localStorage.setItem("gameStartTime", startTime)
    console.log(startTime)
    console.log(formatedTime)
  }

  function shuffuledOptions(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function getRandomQuestion() {
    let randomIndex;
    while (true) {
      randomIndex = Math.floor(Math.random() * quizData.length);
      if (!usedQuestion.has(randomIndex)) {
        break;
      }
    }

    const selectedOptions = quizData[randomIndex];
    const allOptions = [
      ...selectedOptions.incorrect_answers,
      selectedOptions.correct_answer,
    ];

    setShuffedOption(shuffuledOptions(allOptions));

    setCurrentQuestion(quizData[randomIndex]);
    setQuestionDisplay(questionDisplay + 1);

    // add the new question to history
    setQuestionHistory([...questionHistory, randomIndex]);
    setUsedQuestion(new Set([...usedQuestion, randomIndex]));

    setSelectedOption(null);
    setIsOPtionSelected(false);
    setCurrentQuestionIndex(questionHistory.length);
    setProgress(usedQuestion.size);
  }

  function handleOptionSelected(option) {
    setUserSelectedOption(option)
    setOnceSelectedOption(option);
      
    console.log(userSelectedOption)
    console.log(onceSelectedOption)
     setSelectedOption(option);
      storedAnsweredQuestion(option);
      setIsOPtionSelected(true);

      setAnsweredQuestions(answeredQuestions + 1);
   
   
    if (option === currentQuestion.correct_answer) {
      setCorrectAnser(correctAnswer + 1);
      setTotalScore(totalScore + 1);
      setIsCorrectAnswer(true);
    } else {
      setWrongAnswer(wrongAnswer + 1);
      setIsCorrectAnswer(false);
    }
    
    handleEndGame();
    
  }

  function storedAnsweredQuestion(option) {
    const isCorrect = option === currentQuestion.correct_answer;
    const questionData = {
      question: currentQuestion.question,
      option,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect,
    };

    setStoredQuestion([...storedQuestion, questionData]);
  }

  function handleEndGame() {
    if (usedQuestion.size === quizData.length - 1 && !isOptionSelected) {
      setIsQuizeComplete(true);
      handleGameCompletion((totalScore / quizData.length) * 100);
    }
  }

  function handleNextQuestion() {
    setOnceSelectedOption(null)
    handleNextQuestion2();
    if (currentQuestionIndex < questionHistory.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestionIndex = questionHistory[nextIndex];
      const nextQuestion = quizData[nextQuestionIndex];
      const nextOption = shuffuledOptions([
        ...nextQuestion.incorrect_answers,
        nextQuestion.correct_answer,
      ]);

      setCurrentQuestion(nextQuestion);
      setShuffedOption(nextOption);
      setCurrentQuestionIndex(nextIndex);
      setProgress(nextIndex);
    } else if (
      questionHistory.length === quizData.length - 1 &&
      !isOptionSelected
    ) {
      // setIsQuizeComplete(true);
      handleGameCompletion((totalScore / quizData.length) * 100);
    } else {
      getRandomQuestion();
    }
  }

  function handlePrevQuestion() {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      const prevQuestionIndex = questionHistory[prevIndex];
      const prevQuestion = quizData[prevQuestionIndex];
      const prevOption = shuffuledOptions([
        ...prevQuestion.incorrect_answers,
        prevQuestion.correct_answer,
      ]);

      setCurrentQuestion(prevQuestion);
      setShuffedOption(prevOption);
      setCurrentQuestionIndex(prevIndex);
    }
  }

  function handleNextQuestion2() {
    if (isOptionSelected) {
      // Increment the count of answered questions only if an option is selected
      setAnsweredQuestions(answeredQuestions + 1);
    } else {
      alert("Please select an option before moving to the next question.");
    }
  }

  function handleReplay() {
    setIsQuizeComplete(false);
    setCorrectAnser(0);
    setTotalScore(0);
    setWrongAnswer(0);
    setUsedQuestion(new Set([0]))
    setProgress(0);
    setOnceSelectedOption(null);
    setIsOPtionSelected(false);
    setStoredQuestion([])
  }


  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Quize Score",
          text: `I Scored ${totalScore} out of ${totalProgress} questions`,
          URL: window.location.href,
        });
        console.log("shared successfully");
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert("You're browser does not support the Web Share Api");
    }
  }

  // function generatePdf() {
  //   const doc = new jsPDF();
  //   let offSet = 40;
  //   doc.setFontSize(22);
  //   doc.text("CERTIFICATE OF ACHIEVEMENT", 20, 20);

  //   doc.setFontSize(10);
  //   doc.text("This certificate is presented to", 20, 40);

  //   doc.setFontSize(50);
  //   doc.text(`${user.name}`, 20, offSet + 30);

  //   doc.setFontSize(12);

  //   doc.text(
  //     "Person above has completed 'the general knowledge Quiz'",
  //     20,
  //     offSet + 20
  //   );

  //   doc.setFontSize(40);
  //   doc.text(
  //     `scored ${Math.round(totalScore / quizData) * 100}% out of ${
  //       quizData.length
  //     } `,
  //     20,
  //     offSet + 50
  //   );

  //   doc.save("Quize-Results.pdf");
  // }
  function generatePdf() {
    setIsPdfMode(true)
  }
  function pdfBackbtn () {
    setIsPdfMode(false)
  }

  function homePage() {
    setIsGameStarted(true);
    setIsformSubmitted(false);
    handleReplay()
  }
  function handleNameChange(e) {
    setName(e.target.value);
    // localStorage.setItem("userName", name)
  }
  function handleGenderChange(e) {
    setGender(e.target.value);
    // localStorage.setItem("userGender", gender)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name && gender) {
      handleStartGame({ name, gender });
      setIsformSubmitted(true);
      console.log(user);
    } else {
      alert("please enter both name and gender");
    }
  }

  function handleLeaderBoard() {
    setShowleaderBoard(true);
  }
  function handlebackButton() {
    setShowleaderBoard(false);
    console.log("back btn clicked");
  }

  function handleReviewMode() {
    setIsReviewMode(true);
    console.log("review-mode");
    console.log(isReviewMode);
  }
  function handlebackButton2 (){
    setIsReviewMode(false)
  }

  if (isReviewMode) {
    return (
      <Review storedQuestion={storedQuestion} sanitizedProps={sanitizedProps} handlebackButton = {handlebackButton2}/>
    );
  }
  if(isPdfMode){
    return <Cv name = {name} totalScore = {totalScore} quizData = {quizData} pdfBackbtn = {pdfBackbtn} />
  }

  const totalProgress = (progress / quizData.length) * 100;
  const wrongProgress = (wrongAnswer / quizData.length) * 100;
  const correctProgress = (correctAnswer / quizData.length) * 100;

  return (
    <div className="container">
      {isGameStarted ? (
        <QuizeIntro
          handleClick={() => handleClick()}
          handleNameChange={handleNameChange}
          handleGenderChange={handleGenderChange}
          handleStartGame={handleStartGame}
          isformSubmitted={isformSubmitted}
          handleSubmit={handleSubmit}
          name={name}
          gender={gender}
        />
      ) : !isQuizeComplete ? (
        <QuizeUI
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
          getRandomQuestion={getRandomQuestion}
          currentQuestion={currentQuestion}
          shuffedOption={shuffedOption}
          isOptionSelected={isOptionSelected}
          handleOptionSelected={handleOptionSelected}
          _selectedOption={_selectedOption}
          quizData={quizData}
          totalProgress={totalProgress}
          currentQuestionIndex={currentQuestionIndex}
          answeredQuestions={answeredQuestions}
          correctProgress={correctProgress}
          wrongProgress={wrongProgress}
          correctAnswer={correctAnswer}
          isQuizeComplete={isQuizeComplete}
          sanitizedProps={sanitizedProps}
          onceSelectedOption = {onceSelectedOption}
          userSelectedOption = {userSelectedOption}
          
          
        />
      ) : !showleaderboard ? (
        <QuizicalScore
          totalScore={totalScore}
          totalProgress={totalProgress}
          quizData={quizData}
          correctProgress={correctProgress}
          wrongProgress={wrongProgress}
          wrongAnswer={wrongAnswer}
          correctAnswer={correctAnswer}
          handleReplay={handleReplay}
          handleShare={handleShare}
          isCorrectAnswer={isCorrectAnswer}
          userSelectedOption={userSelectedOption}
          currentQuestion={currentQuestion}
          generatePdf={generatePdf}
          homePage={homePage}
          handleLeaderBoard={handleLeaderBoard}
          handleReviewMode={handleReviewMode}
        />
      ) : (
        <LeaderBoard
          totalScore={totalScore}
          handlebackButton={handlebackButton}
        />
      )}
    </div>
  );
}

export default Quizzical;
