import React from "react";
import "../styles/Style.css";

const Button = ({ onClick }) => {
  return (
    <div className="btn">
        <div className="ui center aligned grid">
            <div className="ui centered mini buttons" >
            <button onClick={onClick} class="ui button">3時間</button>
            <button onClick={onClick} class="ui button">12時間</button>
            <button onClick={onClick} class="ui button">24時間</button>
            <button onClick={onClick} class="ui button">3日</button>
            </div>
        </div>
    </div>
  );
};
export default Button;
