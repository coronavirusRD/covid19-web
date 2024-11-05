import "./style.scss";
import React, { memo } from "react";
import { AppBar, Grid, Typography, Toolbar } from "@material-ui/core";
import { getReportNumber } from "../../../utils";

const Header = () => {
  return (
    <AppBar className="header" position="static">
      <Toolbar className="header-toolbar">
        <Grid
          className="header-content-container"
          container
          direction="row"
          align="center"
        >
          <Grid className="header-left-column" item md={7}>
            <Typography variant="h3" align="left">
              An&aacute;lisis del crecimiento del COVID-19 en la
              Rep&uacute;blica Dominicana
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
