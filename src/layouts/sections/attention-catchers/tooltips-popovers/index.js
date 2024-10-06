/*
=========================================================
* AgroMaster React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
// import axios from "axios"; // Commented out for now, use when backend is ready

function WaterLevelMap() {
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default to London
  const [waterLevelData, setWaterLevelData] = useState([]);

  // Fetch user's location and water level data from the backend (dummy data for now)
  useEffect(() => {
    // Get user location (use geolocation API or mock for now)
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });

    // Commenting the real API call and using dummy data
    // Uncomment this when backend is ready
    /*
    axios
      .get("https://your-backend-url/api/water-levels")
      .then((response) => {
        setWaterLevelData(response.data); // Set the data from backend
      })
      .catch((error) => {
        console.error("Error fetching water level data:", error);
      });
    */

    // Dummy data to simulate backend response
    const dummyData = [
      {
        latitude: 51.505,
        longitude: -0.09,
        waterLevel: 80,
        locationName: "London",
      },
      {
        latitude: 51.51,
        longitude: -0.1,
        waterLevel: 45,
        locationName: "Westminster",
      },
      {
        latitude: 51.52,
        longitude: -0.12,
        waterLevel: 30,
        locationName: "Camden",
      },
      {
        latitude: 51.495,
        longitude: -0.13,
        waterLevel: 60,
        locationName: "Kensington",
      },
    ];

    setWaterLevelData(dummyData); // Using dummy data for now
  }, []);

  // Function to determine circle color based on water level
  const getWaterLevelColor = (level) => {
    if (level > 75) return "red";
    if (level > 50) return "orange";
    if (level > 25) return "yellow";
    return "green";
  };

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {waterLevelData.map((data, index) => (
        <CircleMarker
          key={index}
          center={[data.latitude, data.longitude]}
          radius={20}
          color={getWaterLevelColor(data.waterLevel)}
        >
          <Popup>
            <strong>Water Level:</strong> {data.waterLevel}%
            <br />
            <strong>Location:</strong> {data.locationName}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

function TooltipsPopovers() {
  return (
    <BaseLayout
      title="Ground Water Levels"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/water-levels" },
        { label: "Ground Water Levels" },
      ]}
    >
      <View title="User Location and Water Levels">
        <WaterLevelMap />
      </View>
    </BaseLayout>
  );
}

export default TooltipsPopovers;
