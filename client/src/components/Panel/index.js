import React from 'react';
import PropTypes from 'prop-types';
import { RECORDED } from '../../containers/Mic/constants';

const Panel = ({ onSubmit, onRecord, mic }) =>
  <div className="row">
    <div className="col-lg-12">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Track name</label>
          <input type="text" className="form-control" name="name" placeholder="name"/>
        </div>

        <button className="btn btn-primary" type="submit">Get</button>
        <button className="btn btn-primary"  type="button" onClick={onRecord}> {mic.status !==  RECORDED ? 'Record' : 'Stop'}</button>
      </form>
    </div>
  </div>;

Panel.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  mic: PropTypes.object.isRequired,
};

export default Panel;