import React from 'react';
import PropTypes from 'prop-types';
import { RECORDED } from '../../containers/Mic/constants';

const Panel = ({ onButtonClick, onButton2Click, onRecord, mic }) =>
  <div className="row">
    <div className="col-lg-12">
      <button className="btn btn-primary" onClick={onButtonClick}> Get test</button>
      {/*<button className="btn btn-primary" onClick={onButton2Click}> Get test2</button>*/}
      <button className="btn btn-primary" onClick={onRecord}> {mic.status !==  RECORDED ? 'Record' : 'Stop'}</button>
    </div>
  </div>;

Panel.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  onButton2Click: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  mic: PropTypes.object.isRequired,
};

export default Panel;