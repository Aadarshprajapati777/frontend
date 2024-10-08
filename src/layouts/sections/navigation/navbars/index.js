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

// AgroMaster React components
import MKBox from "components/MKBox";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Stats page components
import NavbarDark from "layouts/sections/navigation/navbars/components/NavbarDark";

// Stats page components code
import navbarDarkCode from "layouts/sections/navigation/navbars/components/NavbarDark/code";

function Navbars() {
  return (
    <BaseLayout
      title="Farming Assistant - Plan Report"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/navigation/navbars" },
        { label: "Plan" },
      ]}
    >
      <View title="Plan Report" code={navbarDarkCode}>
        <MKBox py={6}>
          <NavbarDark />
        </MKBox>
      </View>
    </BaseLayout>
  );
}

export default Navbars;
