/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import cropPrediction from "assets/images/hand.jpg";
import plantHealth from "assets/images/planthealt.jpg";
import drought from "assets/images/drought.jpg";
import mega from "assets/images/mega.jpg";
import plan from "assets/images/plan.jpg";

export default [
  {
    title: "Features",
    description:
      "AgroMaster is a farming solution that provides a wide range of features to help you manage your farm",
    items: [
      {
        image: cropPrediction,
        name: "Crop Suggestion and Prediction",
        count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: plantHealth,
        name: "Plant health monitoring",
        count: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: drought,
        name: "Water level monitoring",
        count: 2,
        route: "/sections/attention-catchers/tooltips-popovers",
      },
      {
        image: mega,
        name: "Mega- Your Personal Farming Assistant",
        count: 4,
        route: "/sections/attention-catchers/alerts",
      },
      {
        image: plan,
        name: "Download Farming Plan in Your Area",
        count: 6,
        route: "/sections/navigation/navbars",
      },
    ],
  },
];
