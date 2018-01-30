import React, { Component } from "react";
import { homeButton } from "util/Buttons";
import { changeAppRoot, setState } from "actions";

export function withHomeIcon(Screen, store, addBtn = {}) {
  return class extends Component {
    static navigatorButtons = {
      leftButtons: [
        {
          icon: require("img/home.png"),
          id: "home"
        }
      ],
      fab: addBtn
    };
    constructor(props) {
      super(props);
      // if you want to listen on navigator events, set this up
      this.props.navigator.setOnNavigatorEvent(
        this.onNavigatorEvent.bind(this)
      );
    }

    onNavigatorEvent(event) {
      // this is the onPress handler for the two buttons together
      if (event.type === "NavBarButtonPress") {
        // this is the event type for button presses
        if (event.id == "home") {
          store.dispatch(changeAppRoot("home"));
        }
      }
      if (event.id === "addReceiving") {
        // this is the same id field from the static navigatorButtons definition
        this.gotoCreateReciving();
      }

      if (event.id === "contextualMenuDismissed") {
        store.dispatch(
          setState({
            selectedItem: []
          })
        );
      }
    }

    render() {
      return <Screen {...this.props} />;
    }

    gotoCreateReciving = () => {
      console.log("got to create receiving");
      this.props.navigator.push({
        screen: "example.CreateReceival",
        title: "Create Receiving",
        animated: true
      });
    };
  };
}
