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

// Features page components
import FeaturesOne from "layouts/sections/page-sections/featuers/components/FeaturesOne";

// Features page components code
// import featuresOneCode from "layouts/sections/page-sections/featuers/components/FeaturesOne/code";

function Features() {
  return (
    <BaseLayout
      title="Plant health monitoring"
      breadcrumb={[
        { label: "Plant Health Monitoring", route: "/sections/page-sections/features" },
        { label: "Upload Pictures" },
      ]}
    >
      <View title="Upload photo and chat with Mega">
        <FeaturesOne />
      </View>
    </BaseLayout>
  );
}

export default Features;
