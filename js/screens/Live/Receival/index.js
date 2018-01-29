import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import styles from "styles/receival";

import { homeButton, fab } from "util/Buttons";
export default class Receival extends Component {
  componentWillUnmount() {
    console.log("unmount receival---");
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text>Receival</Text>
      </View>
    );
  }
}
