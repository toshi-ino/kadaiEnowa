import React from "react";

const Resources = ({ resources }) => {
  return (
    <React.Fragment>
      {resources.map((resource) => (
        <p key={resource.timestamp}>
          温度: {resource.temp} 湿度: {resource.humi}
        </p>
      ))}
    </React.Fragment>
  );
};

export default Resources;
