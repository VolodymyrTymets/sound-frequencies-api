import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ onButtonClick }) =>
  <div className="row">
    <div className="col-lg-12">
      <button className="btn btn-primary" onClick={onButtonClick}> Get test</button>
    </div>
  </div>;

Panel.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default Panel;