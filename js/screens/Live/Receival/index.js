import React, { Component } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setState } from "actions";

import styles from "styles/receival";

import { homeButton, fab } from "util/Buttons";
export default class Receival extends Component {
  static defaultProps = {
    selectedItem: []
  };
  componentWillUnmount() {
    console.log("unmount receival---");
  }
  render() {
    const getItemStyle = id => {
      if (this.props.selectedItem === null) return {};
      return [
        styles.item,
        this.props.selectedItem.indexOf(id) > -1 && styles.selected
      ];
    };
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.pageTitle}>Receiving</Text>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={getItemStyle(1)}
            onPress={() => this.selectItem(1)}
          >
            <Text style={styles.itemText}>Receival Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getItemStyle(2)}
            onPress={() => this.selectItem(2)}
          >
            <Text style={styles.itemText}>Receival Item</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  selectItem(id) {
    console.log("props---", this.props);
    const { selectedItem, navigator, setState } = this.props;
    let items = [];
    if (!selectedItem.includes(id)) {
      items = [...selectedItem, id];
    } else {
      items = [
        ...selectedItem.slice(0, selectedItem.indexOf(id)),
        ...selectedItem.slice(selectedItem.indexOf(id) + 1)
      ];
    }
    setState({
      selectedItem: items
    });
    this.showSelectMenu(items);
  }

  showSelectMenu = selectedItem => {
    const { navigator } = this.props;
    if (selectedItem.length > 0) {
      navigator.showContextualMenu({
        rightButtons: [
          {
            title: "Delete",
            icon: require("img/delete.png")
          },
          { title: "Penning" },
          { title: "Draft" },
          { title: "Scan" },
        ],
        onButtonPressed: index => console.log(`Button ${index} tapped`)
      });
    } else {
      navigator.dismissContextualMenu();
    }
  };
}

function mapStateToProps(state, ownProps) {
  return {
    selectedItem: state.app.selectedItem
  };
}

export const ReceivalContainer = connect(mapStateToProps, {
  setState
})(Receival);
