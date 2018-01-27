import React, { Component } from "react";
import { View, Text } from "react-native";

import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";

import { registerScreens } from "./Screens";

registerScreens(); // this is where you register all of your app's screens

// screen related book keeping
Navigation.startSingleScreenApp({
  screen: {
    screen: "example.Login", // unique ID registered with Navigation.registerScreen
    title: "Welcome", // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    // topTabs: [
    //   {
    //     screenId: "example.Receival",
    //     title: "Receival"
    //   },
    //   {
    //     screenId: "example.Auction",
    //     title: "Auction"
    //   },
    //   {
    //     screenId: "example.Delivery",
    //     title: "Delivery"
    //   }
    // ]
  },
  animationType: "slide-down"
});
