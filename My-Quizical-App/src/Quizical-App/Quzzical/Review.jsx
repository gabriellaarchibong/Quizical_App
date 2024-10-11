import "./Review.css";
import propTypes from "prop-types"
function Review(props) {
    
  return (
    <div className="review-table">
      <button className="back--btn2" onClick={props.handlebackButton}>
            <img
              className="arrow-img2"
              src="/src/assets/Quizical-img/back-arrow.png"
              alt="back-arrow"
            />
          </button>
      <table>
        <thead className="head">
          <tr>
            <th>index</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.storedQuestion.map((item, index) => (
            <tr key={index}>
                <td data-title = "index">{index}</td>
              <td data-title = "Question" dangerouslySetInnerHTML={props.sanitizedProps(item.question)}></td>
              <td data-title = "Your Answer" dangerouslySetInnerHTML={props.sanitizedProps(item.option)}></td>
              <td data-title = "Status">
                {item.isCorrect ? (
                  <span style={{ backgroundColor: "green" }}>Correct</span>
                ) : (
                  <>
                    {" "}
                    <span style={{ backgroundColor: "red" }}>
                      incorrect
                    </span>{" "}
                    <br /> <span>correct Answer: {item.correctAnswer}</span>{" "}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
Review.propTypes = {
  handlebackButton: propTypes.any,
  storedQuestion: propTypes.any,
  sanitizedProps: propTypes.any,
}

export default Review;
