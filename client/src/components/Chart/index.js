import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({data, nerveEnergy, muscleEnergy }) => {
  return <div className="row">
    <div className="col-lg-12">
      <div className="col-lg-6">
        {nerveEnergy &&
            <p> Nerve Energy: <span className="badge badge-primary">{nerveEnergy}</span> </p>
        }
      </div>
      <div className="col-lg-6">
      {muscleEnergy &&
          <p> Muscle Energy: <span className="badge badge-danger">{muscleEnergy}</span></p>
      }
      </div>
    </div>
    <div className="col-lg-12">
      <div id="chart1"></div>
    </div>
    <div className="col-lg-12">
      <div id="chart2"></div>
    </div>
  </div>;
}

// Chart.propTypes = {
//   onButtonClick: PropTypes.func.isRequired,
// };

export default Chart;
