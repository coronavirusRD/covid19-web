import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import orderBy from "lodash/orderBy";
import { formatToShortDate } from "../../../../../utils";
import { Grid } from "@material-ui/core";
import { Chart, Title } from "../../../../../components";
import Explaination from "./Explaination";

const ProvincesEvolutionFISectionSection = ({
  currentData,
  results,
}) => {
  const getProvinceData = (name) => {
    let item = [];

    results.forEach((result) => {
      result.provinces.forEach((province) => {
        if (province.name === name) {
          item.push({
            name: formatToShortDate(new Date(result.date)),
            "f.i.": province.infectionFactor.toFixed(2),
          });
        }
      });
    });

    return item;
  };

  return (
    <div className="covid19-provinces-evolution-fi-section section">
      <Title text="Evoluci&oacute;n del factor de infecci&oacute;n (f.i.) por provincia" />
      <Explaination />
      <Grid
        className="covid19-provinces-evolution-fi-charts-container"
        container
      >
        {orderBy(currentData.provinces, ["name"], ["asc"]).map((province) => {
          return (
            <Grid item md={6}>
              <Chart
                className="covid19-provinces-evolution-fi-chart"
                type="line"
                height={250}
                title={province.name}
                colors={["#d0021b"]}
                data={getProvinceData(province.name)}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

ProvincesEvolutionFISectionSection.defaultProps = {
  currentData: undefined,
  results: [],
};

ProvincesEvolutionFISectionSection.propTypes = {
  currentData: PropTypes.object,
  results: PropTypes.array,
};

export default memo(ProvincesEvolutionFISectionSection);
