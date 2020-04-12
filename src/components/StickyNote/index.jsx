import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import classnames from "classnames";
import { Grid, Typography } from "@material-ui/core";
import Paper from "../Paper";
import { numberWithCommas } from "../../utils";

const NOTE = "note";

const StickyNote = ({ className, type, value, title, description }) => {
  return (
    <Paper
      className={classnames(className, "covid19-sticky-notes")}
      type={type}
    >
      {type !== NOTE && (
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={5}>
            <Typography className="covid19-sticky-notes-value" variant="h2">
              {numberWithCommas(value)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className="covid19-sticky-notes-title" variant="h6">
              {title}
            </Typography>
            {!isEmpty(description) && (
              <Typography className="covid19-sticky-notes-description">
                {description}
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
      {type === NOTE && (
        <Grid container alignItems="center">
          <Typography variant="h6">NOTA</Typography>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
      )}
    </Paper>
  );
};

StickyNote.defaultProps = {
  className: null,
  type: "info",
  value: 0,
};

StickyNote.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["info", "success", "warning", "danger", "dark", "note"]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default memo(StickyNote);
