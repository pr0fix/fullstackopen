import React from "react";
import PropTypes from "prop-types";

export default function Logout({ handleLogout }) {
  return <button onClick={handleLogout}>logout</button>;
}

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
