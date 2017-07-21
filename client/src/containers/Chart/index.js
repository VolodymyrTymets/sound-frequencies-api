import _ from 'lodash';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded } from '../Mic/actions';
import { updateTrack } from '../Tracks/actions';
import { RECORDED } from '../Tracks/constants';
import socket from '../../socket'
import Chart from '../../components/Chart';
const zingchart = require('zingchart');

var getConfig = datas => ({
  "type": "line",
  tooltip:{
    visible: false
  },
  scaleX:{

    minValue: 1000, //dec 1, 2014 00:00:00
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
    {
      "values": datas[3]
    },
  ]
});

const enhance = compose (
  connect(state => ({
    data1: state.tracks[_.keys(state.tracks)[0]] || [],
    data2: state.tracks[_.keys(state.tracks)[1]] || [],
    data3: state.tracks[RECORDED] || [],
  }), { getRecorded, updateTrack }),
  lifecycle({
    componentDidMount() {
      const { data1,  data2 } = this.props;
      socket.on('record-data', data => {
        zingchart.exec('chart', 'appendseriesvalues', {
          plotindex : 0,
          values : data || [],
        });
      });

      zingchart.render({
        id : 'chart',
        data : getConfig([data1, data2]),
        height: 600,
        width: "100%"
      });

      // setTimeout(() => {
      //   zingchart.exec('chart', 'appendseriesvalues', {
      //     plotindex : 0,
      //     values : [0, 1]
      //   });
      // }, 2000)
    },
    componentWillReceiveProps(newProps) {
      const { data1,  data2 } = newProps;
      console.log(data1)
      if (data1.length !== this.props.data1.length) {
        const values = data1.map(value => _.isNumber(value.magnitude) ? value.magnitude : value.magnitude.im).filter(value => value > 1);
        console.log(values)
        zingchart.exec('chart', 'appendseriesvalues', {
          plotindex : 1,
          values,
        });
      }
      if (data2.length !== this.props.data2.length ) {
        const values = data2.map(value => _.isNumber(value.magnitude) ? value.magnitude : value.magnitude.im).filter(value => value > 1);
        console.log('2 ->', values)
        zingchart.exec('chart', 'appendseriesvalues', {
          plotindex : 0,
          values,
        });
      }
    },
  })
);

export default enhance(Chart);
