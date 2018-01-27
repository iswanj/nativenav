import { PixelRatio, Dimensions } from "react-native";

const devicesDensity = PixelRatio.get();

export function normalize(size) {
  if (devicesDensity === 1) {
    return size * 1.25;
  } else if (devicesDensity === 2 || devicesDensity === 2.5) {
    return size * 1.1;
  } else if (devicesDensity > 1 && devicesDensity < 2) {
    return size * 1;
  } else {
    return Number(size * devicesDensity);
  }
}

const { width, height } = Dimensions.get("window");
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
