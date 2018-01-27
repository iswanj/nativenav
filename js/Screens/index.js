import { Navigation } from "react-native-navigation";

import { withNavStyles } from "util/Wrappers";

import Login from "Screens/Login";
import SaleScreen from "Screens/Sales";
import Receival from "Screens/Live/Receival";
import Auction from "Screens/Live/Auction";
import Delivery from "Screens/Live/Delivery";
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("example.Login", () => Login);
  Navigation.registerComponent("example.SaleScreen", () =>
    withNavStyles(SaleScreen)
  );
  Navigation.registerComponent("example.Receival", () =>
    withNavStyles(Receival)
  );
  Navigation.registerComponent("example.Auction", () => withNavStyles(Auction));
  Navigation.registerComponent("example.Delivery", () =>
    withNavStyles(Delivery)
  );
}
