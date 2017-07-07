import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ onButtonClick, onButton2Click }) =>
  <div className="row">
    <div className="col-lg-12">
      <button className="btn btn-primary" onClick={onButtonClick}> Get test</button>
      <button className="btn btn-primary" onClick={onButton2Click}> Get test2</button>
    </div>
  </div>;

Panel.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  onButton2Click: PropTypes.func.isRequired,
};

export default Panel;