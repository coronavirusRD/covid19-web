import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { getReportNumber } from "../../../../../utils";

const RecommendationsSection = ({
  infectionFactor,
  oldInfectionFactor,
  increased,
  currentData,
}) => {
  return (
    <div className="covid19-recommendations-section section">
      <Typography className="covid19-recommedations-title" variant="h4">
        Notas complementarias
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            Este <b>informe, #{getReportNumber()},</b> incluye los resultados
            del{" "}
            <b>Bolet&iacute;n Especial del MSP no. {getReportNumber() + 4}.</b>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            El factor de infecci&oacute;n diario{" "}
            <b>
              {!increased && (
                <span>
                  disminuy&oacute; a {infectionFactor} de {oldInfectionFactor}
                </span>
              )}{" "}
              {increased && (
                <span>
                  increment&oacute; de {oldInfectionFactor} a {infectionFactor}
                </span>
              )}{" "}
              {!increased && <span>(una disminuci&oacute;n</span>}
              {increased && <span>(un increment&oacute;</span>} de{" "}
              {Math.abs(infectionFactor - oldInfectionFactor).toFixed(2)}).
            </b>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <b>El factor de infecci&oacute;n lo podemos controlar nosotros,</b>{" "}
            cumpliendo las medidas del MSP y dem&aacute;s autoridades
            gubernamentales.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            La <b>tasa de letalidad</b> del coronavirus en la poblaci&oacute;n
            dominicana es de un{" "}
            <b>
              {((currentData.deaths / currentData.confirmed) * 100).toFixed()}%
            </b>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            La <b>tasa de recuperaci&oacute;n</b> del coronavirus en la
            poblaci&oacute;n dominicana es de un{" "}
            <b>
              {(
                (currentData.recovered / currentData.confirmed) *
                100
              ).toFixed()}
              %
            </b>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Las estimaciones presentadas en este informe se basan en un{" "}
            <b>modelo de crecimiento exponencial</b> tomando en cuenta la{" "}
            <b>cantidad de casos confirmados hasta la fecha</b> y el{" "}
            <b>factor de infecci&oacute;n</b>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Este informe fue creado con la finalidad de ofrecer informaci&oacute;n actualizada y basada en fuentes oficiales sobre el an&aacute;lisis estad&iacute;stico del COVID-19 en la Rep&uacute;blica Dominicana. Los que deseen hacer uso de este informe y compartirlo
          </Typography>
        </li>
      </ul>
    </div>
  );
};

RecommendationsSection.defaultProps = {
  infectionFactor: 0,
  oldInfectionFactor: 0,
  increased: false,
  currentData: null,
};

RecommendationsSection.propTypes = {
  infectionFactor: PropTypes.number,
  oldInfectionFactor: PropTypes.number,
  increased: PropTypes.bool,
  currentData: PropTypes.object,
};

export default memo(RecommendationsSection);
