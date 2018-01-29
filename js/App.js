import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { Provider } from "react-redux";

import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";

import { changeAppRoot } from "./actions";
import { registerScreens } from "./screens";

import rootSaga from "sagas";

import configureStore from "./store";
const store = configureStore();
store.runSaga(rootSaga);

registerScreens(store, Provider); // this is where you register all of your app's screens

const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

// Our custom component we want as a button in the nav bar
const CustomButton = ({ text }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: "tomato" }]}
    onPress={() => console.log("pressed me!")}
  >
    <View style={styles.button}>
      <Text style={{ color: "white" }}>{text}</Text>
    </View>
  </TouchableOpacity>
);

// Register the component
Navigation.registerComponent("CustomButton", () => CustomButton);

export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(changeAppRoot("login"));
  }

  onStoreUpdate() {
    let { root } = store.getState().app;
    // handle a root change
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case "login":
        Navigation.startSingleScreenApp({
          screen: {
            screen: "example.Login", // unique ID registered with Navigation.registerScreen
            title: "Welcome", // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
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
        return;
      case "home":
        Navigation.startSingleScreenApp({
          screen: {
            screen: "example.SaleScreen", // unique ID registered with Navigation.registerScreen
            title: "Sales", // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
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
        return;
      // case "after-sale":
      //   Navigation.startSingleScreenApp({
      //     screen: {
      //       screen: "example.Receival", // unique ID registered with Navigation.registerScreen
      //       title: "Auction Activities", // title of the screen as appears in the nav bar (optional)
      //       navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      //       topTabs: [
      //         {
      //           screenId: "example.Receival",
      //           title: "Receival"
      //         },
      //         {
      //           screenId: "example.Auction",
      //           title: "Auction"
      //         },
      //         {
      //           screenId: "example.Delivery",
      //           title: "Delivery"
      //         }
      //       ]
      //     },
      //     animationType: "slide-down"
      //   });
      case "after-sale":
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: "Receival",
              screen: "example.Receival",
              icon: require("img/one.png"),
              selectedIcon: require("img/one_selected.png"),
              title: "Receival",
              overrideBackPress: true,
              navigatorStyle: {}
            },
            {
              label: "Auction",
              screen: "example.Auction",
              icon: require("img/two.png"),
              selectedIcon: require("img/two_selected.png"),
              title: "Auction",
              navigatorStyle: {}
            },
            {
              label: "Delivery",
              screen: "example.Delivery",
              icon: require("img/three.png"),
              selectedIcon: require("img/three_selected.png"),
              title: "Delivery",
              navigatorStyle: {}
            }
          ]
        });
    }
  }
}
