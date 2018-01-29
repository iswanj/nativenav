import React, { Component } from "react";

export function withNavStyles(Screen) {
  return class extends Component {
    static navigatorStyle = {
      navBarTextColor: "#FFF",
      statusBarColor: "#0004D1",
      navBarBackgroundColor: "#3336DA",
      topTabTextColor: "#FFF",
      selectedTopTabTextColor: "#999",
      navBarButtonColor: "#FFF"
    };

    render() {
      return <Screen {...this.props} />;
    }
  };
}
