import "./QuizicalScore.css";
// import jsPDF from 'jspdf';
import propTypes from "prop-types";
function QuizicalScore(props) {
  
  return (
    <div className="score-container">
      <div className="purple-bg">
        <div className="record-circle">
          <p className="record-circle_text">Your Score</p>
          <h1 className="record-circle_text text">{Math.round((props.totalScore / props.quizData.length)* 100)}%</h1>
        </div>
        <div className="scores">
          <div className="scores-container">
            <div className="scores--box">
              <h3 className="score--text">
                <div className="score--dot completion"></div>{" "}
                <span className="score--text_span completion--color">{Math.round(props.totalProgress)}%</span>
              </h3>
              <p className="score--text_p">Completion</p>
            </div>
            <div className="scores--box">
              <h3 className="score--text">
                <div className="score--dot completion"></div>
                <span className="score--text_span completion--color">{props.quizData.length}</span>
              </h3>
              <p className="score--text_p">Total Question</p>
            </div>
            <div className="scores--box">
              <h3 className="score--text">
                <div className="score--dot correct"></div>
                <span className="score--text_span correct--color">{props.correctAnswer}</span>
              </h3>
              <p className="score--text_p">Correct</p>
            </div>
            <div className="scores--box">
              <h3 className="score--text">
                <div className="score--dot wrong"></div>
                <span className="score--text_span wrong--color">{props.wrongAnswer}</span>
              </h3>
              <p className="score--text_p">Wrong</p>
            </div>
          </div>
        </div>
      </div>

      <div className="social">
        <div className="social-box">
          <div className="social--box">
            <button className="social-btn replay" onClick={props.handleReplay}>
              <img
                className="eye-image"
                src="/src/assets/Quizical-img/Vector.png"
                alt="play again logo"
              />
            </button>
            <span className="social-text">Play Again✨</span>
          </div>
          <div className="social--box">
            <button className="social-btn review" onClick={props.handleReviewMode}>
              <img
                className="eye-image"
                src="/src/assets/Quizical-img/eye.png"
                alt="eye image"
              />
            </button>
            <span className="social-text"> Review Answer</span>
          </div>
          <div className="social--box">
            <button className="social-btn share" onClick={props.handleShare}>
              <img
                className="eye-image"
                src="/src/assets/Quizical-img/share-icon.png"
                alt="share-icon"
              />
            </button>
            <span className="social-text">Share Score</span>
          </div>
          <div className="social--box">
            <button className="social-btn pdf" onClick={props.generatePdf}>
              <img
                className="eye-image"
                src="/src/assets/Quizical-img/pdf.png"
                alt="pdf-icon"
              />
            </button>
            <span className="social-text">Generate PDF</span>
          </div>
          <div className="social--box">
            <button className="social-btn home" onClick={props.homePage}>
              <img
                className="eye-image"
                src="/src/assets/Quizical-img/home.png"
                alt="home-icon"
              />
            </button>
            <span className="social-text">Home</span>
          </div>
          <div className="social--box">
            <button className="social-btn board1" onClick={props.handleLeaderBoard}>
              <img
                className="eye-image"
                src="/src/assets/Quizical-img/cog.png"
                alt="cog-icon"
              />
            </button>
            <span className="social-text">leaderBoard</span>
          </div>
        </div>
      </div>
    </div>
  );
}

QuizicalScore.propTypes = {
  totalScore: propTypes.any,
  totalProgress: propTypes.any,
  quizData: propTypes.any,
  correctAnswer: propTypes.any,
  wrongAnswer: propTypes.any,
  handleReplay: propTypes.any,
  handleLeaderBoard: propTypes.any,
  handleReviewMode: propTypes.any,
  handleShare: propTypes.any,
  homePage: propTypes.any,
  generatePdf: propTypes.any,
}

export default QuizicalScore;
