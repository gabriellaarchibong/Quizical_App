import "./Quizzical.css";
import female from "/src/assets/Quizical-img/female.svg"
import maleAvater from "/src/assets/Quizical-img/male_avater.svg"
import propTypes from "prop-types"

function QuizeIntro(props) {
  return (
    <div className="quize-container">
      <div className="img-bg">
        <img className="quiz-img" src="/src/assets/Quizical-img/quiz 1.png" alt="Quiz-img" />
      </div>
      <img
        src="/src/assets/Quizical-img/completed 1.png"
        alt="Quize-img"
        className="bg-img"
      />

      {!props.isformSubmitted ? (
        <form onSubmit={props.handleSubmit}>
          <div className="intro--form">
            <div className="intro-form">
              <label className="name-label" htmlFor="name">
                Enter your name
              </label>
              <input
                className="input-name"
                type="text"
                id="name"
                placeholder="your name..."
                onChange={props.handleNameChange}
              />
              <label className="name-label" htmlFor="gender">
                Select your gender
              </label>
              <div className="custom-select">
              <select
                className="select-gender"
                name="gender"
                id="gender"
                onChange={props.handleGenderChange}
              >
				       <option className="option-text" value= " ">
					     select gender
				       </option>
                <option className="option-text" value="male">
                  Male
                </option>
                <option className="option-text" value="Female">
                  Female
                </option>
              </select>
              </div>
            </div>
            <div className="btn-div">
              <input className="btn-2" type="submit" value="submit" />
            </div>
          </div>
        </form>
      ) : (
        <div className="intro-msg">
          <div className="intro-msg">
            <div className="welcome-info">
              <div className="info--box">
                {props.gender === "male" ? 
                  <div className="avater">
                    <img
                      className="avater-image"
                      src= {maleAvater}
                      alt="male-avater"
                    />
                  </div>
                   : 
                  <div className="avater">
                    <img
                      className="avater-image"
                      src={female}
                      alt="female-avater"
                    />
                  </div>
                }
              </div>
              <div className="avater-info">
                <h1 className="avater-name">Welcome:🤝 <span>{props.name}</span></h1>
                <h3 className="gender">Gender: {props.gender}</h3>
              </div>
            </div>
          </div>
          <div>
            <button className="btn" onClick={props.handleClick}>
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
QuizeIntro.propTypes = {
  isformSubmitted: propTypes.any,
  handleSubmit: propTypes.any,
  handleNameChange: propTypes.any,
  handleGenderChange:propTypes.any,
  name: propTypes.any,
  gender: propTypes.any,
  handleClick: propTypes.any,
}
export default QuizeIntro;
