import React from "react";
import "../styles/Style.css";

const Button = ({ getDatasThreeHour, getDatasTwelveHour, getDatasOneDay, getDatasThreeDay }) => {
  return (
    <div className="btn">
        <div className="ui center aligned grid">
            <div className="ui centered mini buttons" >
            <button onClick={getDatasThreeHour} class="ui button">3時間</button>
            <button onClick={getDatasTwelveHour} class="ui button">12時間</button>
            <button onClick={getDatasOneDay} class="ui button">1日</button>
            <button onClick={getDatasThreeDay} class="ui button">3日</button>
            </div>
        </div>
    </div>
  );
};
export default Button;
