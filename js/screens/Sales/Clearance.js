import React, { Component } from "react";
import { View, Text } from "react-native";

import styles from "styles/common";
export default class Clearance extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.titleText}>Clearance Sale</Text>
      </View>
    );
  }
}
