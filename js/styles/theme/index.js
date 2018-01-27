import { normalize } from "util/sizes";

export default {
  brandColor: "#3336DA", //76ba54
  brandColorActive: "#3336DA", //528633
  brandSecond: "#F2F1F1",
  brandSecondActive: "#8C8C8C",
  statusBar: "#0004D1",
  headerHeight: 80,
  headerTextColor: "#FFF",
  titleColor: "#0004D1",
  textColor: "#666", //555
  subTextColor: "#5E5E5E", //76ba54
  topbarBackground: "#383bff",
  selectedBorder: "#1E88E5",
  contentPadding: 8,
  semiBackgroundColor: "#E3F2FD",
  semiBorderColor: "#5C6BC0",
  button: {
    backgroundColor: "#3336DA",
    dangerBGColor: "#d32f2f"
  },
  form: {
    inputFontSize: normalize(16),
    inputFontSizeSmall: normalize(13)
  },
  text: {
    xBigTitleSize: normalize(22),
    bigTitleSize: normalize(19),
    titleSize: normalize(17),
    buttonTextSize: normalize(16),
    subTitleSize: normalize(14),
    smallText: normalize(13),
    tooSmallText: normalize(12)
  },
  listItemFontSize: normalize(15)
};
