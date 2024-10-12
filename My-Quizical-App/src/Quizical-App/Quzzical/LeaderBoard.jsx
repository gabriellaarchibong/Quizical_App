import { useEffect, useState } from "react";
import "./LeaderBoard.css";
import profile from "/src/assets/Quizical-img/female.svg";
// import maleProfile from "/src/assets/Quizical/male_avater.svg";
import maleProfile from "/src/assets/Quizical-img/female.svg"
import arrowImage from "/src/assets/Quizical-img/back-arrow.png"
import propTypes from "prop-types"
function LeaderBoard(props) {
 const [leaderBoard, setLeaderBoard] = useState([]);
 useEffect(() => {
  const savedLeaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];
  setLeaderBoard(savedLeaderBoard)
  
 }, []);

  return (
    <div className="leaderboard">
      <div className="leaderboard-bg">
        <div className="back-arrow">
          <button className="back--btn" onClick={props.handlebackButton}>
            <img
              className="arrow-img"
              src= {arrowImage}
              alt="back-arrow"
            />
          </button>
        </div>
        <div className="profile--pic">
          <img className="line--img" src={profile} alt="" />
        </div>
        <div className="line-container">
          <div className="lines line-1">
            <div className="lines-img--box">
              <div className="line-image">
                <img className="line--img" src={profile} alt="" />
              </div>
            </div>
            <div className="lines-position">
              <p>3</p>
            </div>
          </div>
          <div className="lines line-2">
            
            <div className="lines-img--box">
              <div className="line-image">
                <img className="line--img" src={profile} alt="" />
              </div>
            </div>
            <div className="lines-position">
              <p>1</p>
            </div>
          </div>
          <div className="lines line-3">
            
            <div className="lines-img--box">
              <div className="line-image">
                <img className="line--img" src={profile} alt="" />
              </div>
            </div>
            <div className="lines-position">
              <p>2</p>
            </div>
          </div>
        </div>
      </div>
      <div className="leaderboard-text">
        <div className="board">
          <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>profile</th>
                    <th>name</th>
                    <th>score</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
              {leaderBoard.map((entry, index) => (
                <tr key={index}>
                <td data-title = "Rank">{entry.rank}</td>
                <td data-title = "profile">{entry.userGender === "male" ?<img className="profile--img_tag" src= {maleProfile} alt="male_avater"/> : <img className="profile--img_tag" src= {profile} alt="female_avater" />}</td>
                <td data-title = "name">{entry.userName.toUpperCase()}</td>
                <td data-title = "score">{Math.floor(entry.score)}%</td>
                <td data-title = "Time" style={{color: "green", fontWeight: "bold"}}>{entry.timeTaken}</td>
                <td data-title = "Date">{entry.formatedTime}</td>
              </tr> 
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

LeaderBoard.propTypes = {
  handlebackButton: propTypes.any
}
export default LeaderBoard;
