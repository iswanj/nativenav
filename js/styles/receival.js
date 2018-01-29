import { StyleSheet } from "react-native";
import { scale, moderateScale, verticalScale } from "util/sizes"; // eslint-disable-line

import th from "./theme";

const styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    borderRadius: 4,
    flex: 1,
    backgroundColor: "#EEE"
  }
});

export default styles;
