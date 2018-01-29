import { Navigation } from "react-native-navigation";

import { withNavStyles, withHomeIcon } from "util/Wrappers";

import { LoginContainer } from "screens/Login";
import { SaleScreenContainer } from "screens/Sales";
import Receival from "screens/Live/Receival";
import CreateReceival from "screens/Live/Receival/Create";
import Auction from "screens/Live/Auction";
import Delivery from "screens/Live/Delivery";
// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    "example.Login",
    () => LoginContainer,
    store,
    Provider
  );
  Navigation.registerComponent(
    "example.SaleScreen",
    () => withNavStyles(SaleScreenContainer),
    store,
    Provider
  );
  const addBtn = {
    collapsedId: "addReceiving",
    collapsedIcon: require("img/navicon_add.png"),
    collapsedIconColor: "#FFF", // optional
    backgroundColor: "#0004D1"
  };
  Navigation.registerComponent(
    "example.Receival",
    () => withHomeIcon(Receival, store, addBtn),
    store,
    Provider
  );
  Navigation.registerComponent(
    "example.Auction",
    () => withHomeIcon(Auction, store),
    store,
    Provider
  );
  Navigation.registerComponent(
    "example.Delivery",
    () => withHomeIcon(Delivery, store),
    store,
    Provider
  );
  Navigation.registerComponent(
    "example.CreateReceival",
    () => withNavStyles(CreateReceival),
    store,
    Provider
  );
}
