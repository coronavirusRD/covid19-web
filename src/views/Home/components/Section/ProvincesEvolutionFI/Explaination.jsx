import React, { memo } from "react";
import { Typography } from "@material-ui/core";

const Explaination = () => {
  return (
    <div className="covid19-provinces-evolution-fi-explaination">
      <Typography variant="body1" paragraph={true}>
        Para controlar y mitigar el COVID-19 es necesario contar con
        m&eacute;tricas y datos por provincias, que permitan aplicar medidas
        localizadas y aumentar la capacidad de respuesta en las provincias que
        tienen un mayor foco de infecci&oacute;n y crecimiento del virus.
      </Typography>
      <Typography variant="h5">
        ¿Qu&eacute; es el factor de infecci&oacute;n?
      </Typography>
      <Typography variant="body1" paragraph={true}>
        El factor de infecci&oacute;n (f.i.), tambi&eacute;n conocido como
        factor de crecimiento o tasa de reproducci&oacute;n, es el dato
        estad&iacute;stico que indica la cantidad de personas que puede
        contagiar un paciente confirmado con COVID-19. Si el f.i. est&aacute;
        por encima de 1.00 (f.i. > 1.00) el virus se propagar&oacute; de forma
        acelerada. Cuando el f.i. es menor de 1.00 (f.i. ＜ 1.00) el virus
        dejar&aacute; de propagarse.
      </Typography>
      <Typography variant="h5">
        ¿C&oacute;mo se calcula el factor de infecci&oacute;n?
      </Typography>
      <Typography variant="body1" paragraph={true}>
        El factor de infecci&oacute;n se calcula dividiendo el total de casos
        confirmados de <i>hoy</i> (In) entre el total de casos confirmados de{" "}
        <i>ayer</i> (In-1). Es decir, la cifra m&aacute;s reciente del total de
        casos confirmados entre la cifra del d&iacute;a anterior.
      </Typography>
      <Typography className="covid19-fi-formula" variant="h4" align="center">
        f.i. = In / In-1
      </Typography>
      <Typography variant="h5">
        Sobre las gr&aacute;ficas de la evoluci&oacute;n del f.i.
      </Typography>
      <Typography variant="body1" paragraph={true}>
        En las siguientes gr&aacute;ficas se muestra la evoluci&oacute;n del
        f.i. calculado para cada provincia de R.D. Esta data nos permite estimar
        cu&aacute;ntas infecciones secundarias es probable que ocurran a partir
        de una sola infecci&oacute; en cada una de las provincias. Valores
        superiores a 1.00 significan que deber&iacute;amos esperar m&aacute;s
        casos en esa &aacute;rea, valores inferiores a 1.00 significan que
        deber&iacute;amos esperar menos.
      </Typography>
      <Typography variant="h5">
        ¿de d&oacute;nde se obtienen estos datos?
      </Typography>
      <Typography variant="body1" paragraph={true}>
        Estas gr&aacute;ficas del f.i. se realizan utilizando como base los
        datos ofrecidos por el Sistema Nacional de Vigilancia
        Epidemiol&oacute;gica sobre la cantidad de casos confirmados de forma
        diaria por cada provincia, publicados en los Boletines Especiales que
        emite el Ministerio de Salud P&uacute;blica.
      </Typography>
      <Typography variant="body1" paragraph={true}>
        Estas cifras deben tomarse solo como punto de referencia y no como
        conclusiones determinantes, teniendo presente las variables que afectan
        el f.i. Asimismo, cuantos m&aacute;s datos se obtengan y m&aacute;s
        consistentes sean los datos, m&aacute;s representativas y apegadas a la
        realidad ser&aacute;n estas gr&aacute;ficas.
      </Typography>
    </div>
  );
};

export default memo(Explaination);
