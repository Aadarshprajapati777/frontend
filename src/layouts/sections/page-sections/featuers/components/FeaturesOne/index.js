// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import axios from "axios"; // For making API requests
import ReactMarkdown from "react-markdown"; // For rendering markdown

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

function FeaturesOne() {
  const [image, setImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [loading, setLoading] = useState(false); // For showing loading state

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("plantImage", image); // 'plantImage' is the key expected by the backend

    try {
      setLoading(true); // Start loading

      const response = await axios.post("http://localhost:4000/plant-health", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseText = response.data.plantHealthSuggestions;

      // Split the response into sections based on headers like "Diagnosis", "Preventive Measures", etc.
      const plantInfoParsed = parsePlantInfo(responseText);
      setPlantInfo(plantInfoParsed);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error fetching plant health data. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to parse the Gemini response and extract the details
  const parsePlantInfo = (text) => {
    const diagnosisStart = text.indexOf("**Diagnosis:**");
    const measuresStart = text.indexOf("**Preventive Measures:**");
    const treatmentStart = text.indexOf("**Treatment:**");

    const healthDetails = text.substring(0, diagnosisStart).trim();
    const diagnosis = text.substring(diagnosisStart + 14, measuresStart).trim(); // 14 is length of "**Diagnosis:**"
    const preventiveMeasures = text.substring(measuresStart + 22, treatmentStart).trim(); // 22 is length of "**Preventive Measures:**"
    const treatment = text.substring(treatmentStart + 13).trim(); // 13 is length of "**Treatment:**"

    return {
      healthDetails,
      diagnosis,
      preventiveMeasures,
      treatment,
    };
  };

  return (
    <MKBox component="section" py={{ xs: 3, md: 12 }}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={5}>
            <MKTypography variant="h3" my={1}>
              Upload Plant Image
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={2}>
              Farmers can upload images of their plants, and we will provide detailed information
              about the plant&#39;s health, disease conditions, and preventive measures.
            </MKTypography>
            <MKBox component="form" sx={{ mt: 2 }}>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ marginBottom: "1rem" }}
              />
              <MKButton color="info" onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload Image"}
              </MKButton>
            </MKBox>
          </Grid>

          {/* Display plant health information after upload */}
          <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            {plantInfo && (
              <Stack spacing={3}>
                {/* Plant Health Details */}
                <MKBox display="flex" alignItems="center" p={2}>
                  <MKBox
                    width="3rem"
                    height="3rem"
                    variant="gradient"
                    bgColor="info"
                    color="white"
                    coloredShadow="info"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="xl"
                    sx={{ marginRight: "10px" }} // Add margin to align with text
                  >
                    <Icon fontSize="small">spa</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Plant Health Details:
                    <br />
                    <ReactMarkdown>{plantInfo.healthDetails}</ReactMarkdown>
                  </MKTypography>
                </MKBox>

                {/* Diagnosis */}
                <MKBox display="flex" alignItems="center" p={2}>
                  <MKBox
                    width="3rem"
                    height="3rem"
                    variant="gradient"
                    bgColor="info"
                    color="white"
                    coloredShadow="info"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="xl"
                    sx={{ marginRight: "10px" }} // Add margin to align with text
                  >
                    <Icon fontSize="small">bug_report</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Diagnosis:
                    <br />
                    <ReactMarkdown>{plantInfo.diagnosis}</ReactMarkdown>
                  </MKTypography>
                </MKBox>

                {/* Preventive Measures */}
                <MKBox display="flex" alignItems="center" p={2}>
                  <MKBox
                    width="3rem"
                    height="3rem"
                    variant="gradient"
                    bgColor="info"
                    color="white"
                    coloredShadow="info"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="xl"
                    sx={{ marginRight: "10px" }} // Add margin to align with text
                  >
                    <Icon fontSize="small">healing</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Preventive Measures:
                    <br />
                    <ReactMarkdown>{plantInfo.preventiveMeasures}</ReactMarkdown>
                  </MKTypography>
                </MKBox>

                {/* Treatment */}
                <MKBox display="flex" alignItems="center" p={2}>
                  <MKBox
                    width="3rem"
                    height="3rem"
                    variant="gradient"
                    bgColor="info"
                    color="white"
                    coloredShadow="info"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="xl"
                    sx={{ marginRight: "10px" }} // Add margin to align with text
                  >
                    <Icon fontSize="small">local_hospital</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Treatment:
                    <br />
                    <ReactMarkdown>{plantInfo.treatment}</ReactMarkdown>
                  </MKTypography>
                </MKBox>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FeaturesOne;
