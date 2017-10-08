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
    //minValue: 1, //dec 1, 2014 00:00:00
    //step: 1,
  //  format:"%v Hz",
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
    frequencie1: state.frequencies[_.keys(state.frequencies)[0]] || [],
    frequencie2: state.frequencies[_.keys(state.frequencies)[1]] || [],
    //frequencie: state.frequencies[RECORDED] || [],
    wave1: state.waves[_.keys(state.waves)[0]] || [],
    wave2: state.waves[_.keys(state.waves)[1]] || [],
    nerveEnergy: state.energys['nerve'],
    muscleEnergy: state.energys['muscle'],
  }), { getRecorded, updateTrack }),
  lifecycle({
    componentDidMount() {
       const { frequencie1,  frequencie2, wave1, wave2 } = this.props;
      //
      // socket.on('record-data', data => {
      //   console.log('data ->', data)
      //   const values = data.map(value => _.isNumber(value.magnitude) ? value.magnitude : value.magnitude).filter(value => value > 1);
      //   console.log('values ->', values)
      //   zingchart.exec('chart', 'appendseriesvalues', {
      //     plotindex : 0,
      //     values,
      //   });
      // });

      zingchart.render({
        id : 'chart2',
        data : getConfig([frequencie1, frequencie1]),
        height: 600,
        width: "100%"
      });

      zingchart.render({
        id : 'chart1',
        data : getConfig([wave1, wave1]),
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
      const { frequencie1, wave1, frequencie2, wave2 } = newProps;
      if (frequencie1.length !== this.props.frequencie1.length) {
        console.log('frequencie ->', frequencie1);
        const values = frequencie1.map(fr => ([fr.frequency, fr.amplitude]));
        console.log('values ->', values);
        zingchart.exec('chart2', 'appendseriesvalues', {
          plotindex : 1,
          values,
        });
      }

      if (wave1.length !== this.props.wave1.length) {
        console.log('wave ->', wave1)
        zingchart.exec('chart1', 'appendseriesvalues', {
          plotindex : 1,
          values: wave1,
        });
      }
      if (frequencie2.length !== this.props.frequencie2.length) {
        console.log('frequencie ->', frequencie2);
        const values = frequencie2.map(fr => ([fr.frequency, fr.amplitude]));
        console.log('values ->', values);
        zingchart.exec('chart2', 'appendseriesvalues', {
          plotindex : 0,
          values,
        });
      }

      if (wave2.length !== this.props.wave2.length) {
        console.log('wave ->', wave2)
        zingchart.exec('chart1', 'appendseriesvalues', {
          plotindex : 0,
          values: wave2,
        });
      }
    },
  })
);

export default enhance(Chart);
