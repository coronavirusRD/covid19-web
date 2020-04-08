import "./style.scss";
import React, { memo } from "react";
import PropTypes from 'prop-types';
import {CircularProgress, Fade} from '@material-ui/core';

const CircularLoader = ({loading}) => {
  return (
    <Fade
    in={loading}
    style={{
      transitionDelay: loading ? '800ms' : '0ms',
    }}
  >
    <CircularProgress className="covid19-circular-loader" />
  </Fade>
  )
}

CircularLoader.defaultProps = {
  loading: true,
}

CircularProgress.propTypes = {
  loading: PropTypes.bool,
}

export default memo(CircularLoader);
