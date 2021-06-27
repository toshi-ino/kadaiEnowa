import React from "react";
import Map from "./components/Map";
import logo from "./logo_v04.png"


const MapStyle = {
    width: "500px",
    height: "300px",
  };

  const center = {
    lat: 36.9570268,
    lng: 137.5520313
  };

  const App = () => {

  return (
    <React.Fragment>
        <body>
            <header>
                <div class="headerElement">
                    <div class="deviceBtn"><a href="DeviceInfo.jsx">デバイス</a></div>
                    <div class="logo"><img src={logo} alt="logo" className="logo" /></div>
                </div>
            </header>

            <div className="map">
                <Map center={center} MapStyle={MapStyle} />
            </div>
        </body>
    </React.Fragment>
  );
};

export default App;