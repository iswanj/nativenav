import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import styles from "styles/login";

export default class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.loginText}>Login</Text>
        <Button
          style={styles.loginButton}
          onPress={this.gotoHome}
          title="Login"
          color="#0004D1"
        />
      </View>
    );
  }

  gotoHome = () => {
    this.props.navigator.push({
      screen: "example.SaleScreen",
      animated: true,
      backButtonHidden: true
    });
  };
}
