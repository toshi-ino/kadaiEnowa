import React from "react";
import {Puff} from '@agney/react-loading';

const Loading = () => {
    return (
        <React.Fragment>
            <div className="loading">
                <div className="loadingFig">
                    <Puff  width="80" color="#778899"/>
                </div>
                <p>Laoding...</p>
            </div>

        </React.Fragment>
    );
  };
  export default Loading;