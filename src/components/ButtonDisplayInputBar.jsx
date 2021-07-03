import React from "react";
import "../styles/Style.css";

const ButtonDisplayInputBar = ({ displayInputBar }) => {
  return (
    <div className="btn">
        <div className="ui center aligned grid">
            <div className="ui centered mini buttons" >
            <button onClick={displayInputBar} class="ui button">詳細条件指定</button>
            </div>
        </div>
    </div>
  );
};
export default ButtonDisplayInputBar;
