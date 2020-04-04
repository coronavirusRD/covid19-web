import "./style.scss";
import React, { memo } from "react";
import { AppBar, Grid, Typography, Toolbar } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar className="header">
      <Toolbar className="header-toolbar">
        <Grid container direction="row" align="center">
          <Grid className="header-left-column" item xs={7}>
            <Typography variant="h3" align="left">
              An&aacute;lisis del crecimiento del COVID-19 en la
              Rep&uacute;blica Dominicana
            </Typography>
          </Grid>
          <Grid className="header-right-column" item xs={5}>
            <Typography variant="h5" align="right">
              INFORME #13
            </Typography>
            <Typography variant="h6" align="right">
              Preparado por: Ing. Juan C. Salad&iacute;n Bonilla
            </Typography>
            <Typography variant="h6" align="right">
              Director de Calidad en Guzm&aacute;n Ariza | Vice-chair ASQ SDQ
            </Typography>
            <Typography variant="h6" align="right">
              juancsaladin@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
