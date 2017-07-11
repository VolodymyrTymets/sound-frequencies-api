import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded } from '../Mic/actions';
import { TEST_1, TEST_2, RECORDED } from '../Tracks/constants';

import Chart from '../../components/Chart';
const zingchart = require('zingchart');

var getConfig = datas => ({
  "type": "line",
  tooltip:{
    visible: false
  },
  scaleX:{
    minValue: 1, //dec 1, 2014 00:00:00
    step: 1,
    zooming: true,
    _zoomTo: [0,20],
    lineColor:'#2196f3',
  },
  "series": [
    {
      "values": datas[0]
    },
    {
      "values": datas[1]
    },
  ]
});

const enhance = compose (
  connect(state => ({
    data1: state.tracks[TEST_1] || [],
    data2: state.tracks[RECORDED] || [],
  }), { getRecorded }),
  lifecycle({
    componentDidMount() {

    },
    componentWillReceiveProps(newProps) {
      const { data1,  data2 } = newProps;
      if (data1.length !== this.props.data1.length || data2.length !== this.props.data2.length ) {
        console.log('reload');
        zingchart.render({
          id : 'chart',
          data : getConfig([data1, data2]),
          height: 600,
          width: "100%"
        });
      }
    },
  })
);

export default enhance(Chart);
