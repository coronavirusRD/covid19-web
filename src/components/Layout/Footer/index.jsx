import "./style.scss";
import React, { memo } from "react";
import { Grid, Toolbar } from "@material-ui/core";

const Footer = () => {
  return (
    <footer className="footer" position="static">
      <Toolbar className="footer-toolbar">
        <Grid container direction="row" align="center" justify="center">
          © Codemera, 2013-2020.
        </Grid>
      </Toolbar>
    </footer>
  );
};

export default memo(Footer);
