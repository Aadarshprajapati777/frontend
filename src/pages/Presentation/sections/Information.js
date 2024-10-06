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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// AgroMaster React components
import MKBox from "components/MKBox";

// AgroMaster React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    AgroMaster
                    <br />
                    Agriculture Solution
                  </>
                }
                description="We will help you to find the ground water level, soil moisture, temperature, humidity, and many more of your farm"
              />
              <RotatingCardBack
                image={bgBack}
                title="Discover More"
                description="You will save a lot of time with us. AgroMaster is a complete solution for your farm."
                action={{
                  type: "internal",
                  route: "src/App.js",
                  label: "go to top",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Crop suggestion & Prediction"
                  description="We will help you to find the best crop for your farm and also predict the future of your farm."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Plant health monitoring"
                  description="We will help you to monitor the health of your plant and also suggest the best solution for your plant."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Water level monitoring"
                  description="We will help you to monitor different water levels of your farm and also suggest the best solution for your farm."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Mega- Your Personal Farming Assistant"
                  description="Talk to Mega, your personal farming assistant. Mega will help you to tackle all the problems of your farm."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
