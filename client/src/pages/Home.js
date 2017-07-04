import React from 'react';
import Panel from '../containers/Panel';
import Chart from '../containers/Chart';

const Home = () =>
  <div className="container-fluid">
    <div className="col-lg-12">
      <Panel/>
      <Chart/>
    </div>
  </div>;

export default Home;
