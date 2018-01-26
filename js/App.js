import React, { Component } from "react";
import { View, Text } from "react-native";

import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";

import { registerScreens } from "./Screens";

registerScreens(); // this is where you register all of your app's screens

// screen related book keeping
Navigation.startTabBasedApp({
  tabs: [
    {
      label: "One",
      screen: "example.FirstTabScreen", // this is a registered name for a screen
      icon: require("../img/list.png"),
      title: "Screen One"
    },
    {
      label: "Two",
      screen: "example.SecondTabScreen",
      icon: require("../img/one.png"),
      title: "Screen Two"
    }
  ]
});
