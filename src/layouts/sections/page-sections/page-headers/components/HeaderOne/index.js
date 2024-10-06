// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link"; // Import the Link component
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

// AgroMaster React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Avatar from "@mui/material/Avatar";

// Images
import bgImage from "assets/images/farm-bg.jpg"; // New background image for a fresh theme

// Date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// React and State management
import React, { useState } from "react";
import axios from "axios"; // For making backend requests
import ReactMarkdown from "react-markdown"; // For rendering markdown

function HeaderOne() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState("");
  const [cropType, setCropType] = useState([]); // Updated to allow multiple selections
  const [cropSuggestions, setCropSuggestions] = useState(null);

  // const cityOptions = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Pune"]; // Replace with dynamic options if needed

  // Function to handle crop suggestions
  const handleSuggest = () => {
    // Prepare the request data
    const requestData = {
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      city,
      cropType, // Send the array of selected crop types
    };

    // Example request to backend
    axios
      .post("https://nasa-space-app-backend.onrender.com/crop-suggestion", requestData)
      .then((response) => {
        setCropSuggestions(response.data.cropSuggestions || response.data); // Handle the response as plain text
      })
      .catch((error) => {
        console.error("Error fetching crop suggestions:", error);
      });
  };

  // Function to toggle crop selection
  const handleCropChange = (crop) => {
    setCropType((prev) =>
      prev.includes(crop) ? prev.filter((item) => item !== crop) : [...prev, crop]
    );
  };

  return (
    <MKBox component="header" position="relative" height="100%" sx={{ backgroundColor: "#f4f4f9" }}>
      {/* Navigation */}
      <MKBox component="nav" position="absolute" top="1rem" width="100%" sx={{ padding: "0 2rem" }}>
        <Container>
          <Grid container flexDirection="row" alignItems="center" justifyContent="space-between">
            <MKTypography component={Link} href="#" variant="h5" color="primary" fontWeight="bold">
              AgroMaster
            </MKTypography>
            <MKButton variant="outlined" color="primary">
              <MKBox component="i" className="fas fa-bars" />
            </MKButton>
          </Grid>
        </Container>
      </MKBox>

      {/* Main Content - Side by Side Layout */}
      <MKBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(10px)",
          paddingTop: "100px",
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {/* Left Side: Crop Suggestion Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#ffffffcc",
                  borderRadius: "16px",
                  padding: "2rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <MKTypography variant="h4" color="primary" mb={2}>
                  Get Your Crop Suggestions
                </MKTypography>
                <MKTypography variant="body1" color="textSecondary" mb={4}>
                  Enter the details to get the best crop suggestions based on your location.
                </MKTypography>

                {/* Date Pickers for Start and End Date */}
                <MKTypography variant="body2" color="textPrimary" mb={1}>
                  Select start and end dates:
                </MKTypography>
                <Stack direction="row" spacing={2} mb={3}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Start Date"
                    className="date-picker"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="End Date"
                    className="date-picker"
                  />
                </Stack>

                {/* City Name with Autocomplete */}
                <MKTypography variant="body2" color="textPrimary" mb={1}>
                  Enter city name:
                </MKTypography>
                <Autocomplete
                  freeSolo // Allow free text input
                  options={[]} // No predefined options, empty array
                  value={city} // The selected/typed city
                  onInputChange={(event, newValue) => setCity(newValue)} // Update the state as user types
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Enter your city name" fullWidth />
                  )}
                  sx={{ backgroundColor: "#f4f4f4", borderRadius: 1, marginBottom: "1.5rem" }}
                />

                {/* Crop Type Selection */}
                <MKTypography variant="body2" color="textPrimary" mb={1}>
                  Select crop type(s):
                </MKTypography>
                <FormLabel component="legend" sx={{ color: "textPrimary", mb: 2 }}>
                  Crop Type
                </FormLabel>
                <Stack direction="row" spacing={2} mb={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cropType.includes("vegetable")}
                        onChange={() => handleCropChange("vegetable")}
                      />
                    }
                    label="Vegetable"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cropType.includes("fruit")}
                        onChange={() => handleCropChange("fruit")}
                      />
                    }
                    label="Fruit"
                  />
                </Stack>

                {/* Suggest Me Button */}
                <MKButton
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSuggest}
                  sx={{
                    backgroundColor: "#2e7d32",
                    "&:hover": { backgroundColor: "#1b5e20" },
                  }}
                >
                  Suggest Me
                </MKButton>
              </Box>
            </Grid>

            {/* Right Side: Crop Suggestions Output */}
            <Grid item xs={12} md={6}>
              {cropSuggestions && (
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "2rem",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  <MKTypography variant="h5" color="primary" mb={2}>
                    Crop Suggestions
                  </MKTypography>

                  {/* Display chat bubbles for each crop suggestion */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start", // Align chat bubble to the left
                        gap: "0.75rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#2e7d32" }}>A</Avatar>
                      <Box
                        sx={{
                          backgroundColor: "#e8f5e9",
                          borderRadius: "12px",
                          padding: "10px 15px",
                          maxWidth: "100%",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                          textAlign: "left",
                        }}
                      >
                        <ReactMarkdown>{cropSuggestions}</ReactMarkdown>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default HeaderOne;
