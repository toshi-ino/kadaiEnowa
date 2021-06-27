import React from "react";
import "../styles/Style.css";

const Button = ({ onClick }) => {
  return (
    <div className="btn">
        <div className="ui center aligned grid">
            <div className="ui centered tiny buttons" >
            <button onClick={onClick} class="ui button">表示</button>
            </div>
        </div>
    </div>
  );
};
export default Button;
