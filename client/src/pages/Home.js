import React from 'react';
import Panel from '../containers/Panel';
import RecordChart from '../containers/RecordChart';

const Home = () =>
  <div className="container-fluid">
    <div className="col-lg-12">
      <Panel/>
      <RecordChart />
    </div>
  </div>;

export default Home;
