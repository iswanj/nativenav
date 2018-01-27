import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";

import styles from "styles/common";
export default class SaleScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.titleText}>SaleScreen</Text>
        <TouchableNativeFeedback
          onPress={this._onPressButton}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.saleTile}>
            <Text
              style={{
                margin: 30,
                textAlign: "center",
                color: "#FFF",
                fontSize: 22
              }}
            >
              Sale one
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  _onPressButton = () => {
    console.log("clicked sale tile");
  };
}
