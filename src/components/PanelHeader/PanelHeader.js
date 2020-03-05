import React, { memo } from "react";
import PropTypes from 'prop-types';
const PanelHeader = memo(({ size, content }) => {
  return (
    <div
      className={
        "panel-header " +
        (size !== undefined
          ? "panel-header-" + size
          : "")
      }
    >
      {content}
    </div>
  );

}
)
PanelHeader.propTypes = {
  size: PropTypes.string
}
export default PanelHeader;
