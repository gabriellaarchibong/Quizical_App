import "./Cv.css";
import propTypes from "prop-types"
import pdfImgage from "/src/assets/Quizical-img/Group 4821.png"
import completionImg from "/src/assets/Quizical-img/completion.svg"
function Cv(props) {
  function print () {
    window.print()
  }
  
  return (
    <div>
      <div className="certificate">
        <div>
          <div className="certificate-container">
            <div className="inside">
              <img
                className="pdf-img"
                src= {pdfImgage}
                alt=""
              />{" "}
              <h1 className="cv-header"> Certificate of Completion </h1>
              <p>This is to certify that</p>
              <h2 id="userName" className="cv-header2">{props.name}</h2>
              <p className="cv-text">has successfully completed the KnowledgeHub quiz.</p>
              <p className="cv-text2">
                <strong>On this day:</strong>{" "}
                <span id="completionDate">{localStorage.getItem("currentDate")}</span>
              </p>
              <p>
                <strong>score</strong> <span id="score">{Math.round((props.totalScore / props.quizData.length)* 100)}%</span>
              </p>
            </div>
            <div className="pdf-img--container">
                <img className="pdf-img" src={completionImg} alt="completion-image" />
            </div>
          </div>
        </div>
      </div>
      <div className="pdf-btns">
       <button className="print" onClick={print}>print pdf</button>
       <button className="print" onClick={props.pdfBackbtn}>back</button>
      </div>
      
    </div>
  );
}
Cv.propTypes = {
 name: propTypes.any,
 totalScore: propTypes.any,
 quizData: propTypes.any,
 pdfBackbtn: propTypes.any,
}

export default Cv;
