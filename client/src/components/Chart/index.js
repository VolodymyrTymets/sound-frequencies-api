import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({data}) => {
  return <div className="row">
    <div className="col-lg-12">
      <div id="chart"></div>
    </div>
  </div>;
}

// Chart.propTypes = {
//   onButtonClick: PropTypes.func.isRequired,
// };

export default Chart;