import React from 'react';
import PropTypes from 'prop-types';
var LineChart = require("react-chartjs");
console.log(LineChart)


const Chart = ({data}) => {
  console.log(data)
  return <div className="row">
    <div className="col-lg-12">
      <LineChart.Line data={data} width="2024" height="650"/>
    </div>
  </div>;
}

// Chart.propTypes = {
//   onButtonClick: PropTypes.func.isRequired,
// };

export default Chart;