// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import { useState } from "react";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
// Removed axios as it is not currently used

function FeaturesOne() {
  const [image, setImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Commenting real API request for now and using dummy data
    // Uncomment and use the real backend URL when ready

    // Dummy data to display while the real backend is not ready
    const dummyData = {
      healthStatus: "Diseased",
      healthDetails: "The plant shows symptoms of leaf blight.",
      diseaseName: "Leaf Blight",
      diseaseDetails:
        "Leaf blight is a common disease in rice, characterized by brown spots and wilting leaves.",
      preventiveMeasures: "Use fungicides such as Mancozeb. Ensure proper drainage in the field.",
    };
    setPlantInfo(dummyData); // Displaying dummy data for now
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
              <MKButton color="info" onClick={handleUpload}>
                Upload Image
              </MKButton>
            </MKBox>
          </Grid>

          {/* Display plant health information after upload */}
          <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            {plantInfo && (
              <Stack spacing={3}>
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
                  >
                    <Icon fontSize="small">spa</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Plant Health: {plantInfo.healthStatus}
                    <br />
                    {plantInfo.healthDetails}
                  </MKTypography>
                </MKBox>

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
                  >
                    <Icon fontSize="small">bug_report</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Disease Detected: {plantInfo.diseaseName}
                    <br />
                    {plantInfo.diseaseDetails}
                  </MKTypography>
                </MKBox>

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
                  >
                    <Icon fontSize="small">healing</Icon>
                  </MKBox>
                  <MKTypography variant="body2" color="text" pl={2}>
                    Preventive Measures:
                    <br />
                    {plantInfo.preventiveMeasures}
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
