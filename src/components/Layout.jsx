import React from "react";
import { useMath } from "../contexts/calculate";
import PropTypes from "prop-types";

function Layout({ children }) {
  const { state } = useMath();

  return (
    <div
      className={
        "layouts " +
        (state.isCorrect === true
          ? " green"
          : state.isCorrect === false
            ? " red"
            : " dark")
      }
    >
      <div className="container">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
