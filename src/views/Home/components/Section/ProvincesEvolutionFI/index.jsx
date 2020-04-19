import './style.scss';
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Title } from "../../../../../components";
import Explaination from "./Explaination";

const ProvincesEvolutionFISectionSection = () => {
  return (
    <div className="covid19-provinces-evolution-fi-section section">
      <Title text="Evoluci&oacute;n del factor de infecci&oacute;n (f.i.) por provincia" />
      <Explaination />
    </div>
  );
};

ProvincesEvolutionFISectionSection.defaultProps = {};

ProvincesEvolutionFISectionSection.propTypes = {};

export default memo(ProvincesEvolutionFISectionSection);
