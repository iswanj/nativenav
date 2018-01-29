import PropTypes from "prop-types";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Icon = props => (
  <Ionicons name={props.name} size={props.size} color={props.color} />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string
};

Icon.defaultProps = {
  size: 20,
  color: "#FFF"
};

export default Icon;
