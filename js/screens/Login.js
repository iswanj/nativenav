import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

import styles from "styles/login";
import { changeAppRoot } from "actions";

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
    this.props.changeAppRoot("home");
  };
}

function mapStateToProps(state, ownProps) {
  return {};
}

export const LoginContainer = connect(mapStateToProps, {
  changeAppRoot
})(Login);
