import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ center, MapStyle }) => {
  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCegGRU_oaCeAmcVcH9ZSvjyuBCUzo_Uf8">
        <GoogleMap mapContainerStyle={MapStyle} center={center} zoom={17}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default Map;
