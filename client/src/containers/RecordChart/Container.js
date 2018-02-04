import _ from 'lodash';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';


import socket from '../../socket'

import Component from './Component';


const dps = [];
const count = 8192;
const maxCount = count * 5;
const waves = [];


const initChatData = () =>  _.range(maxCount).forEach(() => waves.push(0));
const appendWave = (arr, wave, length) => {
    arr.splice(0, length);
    wave.forEach(v => arr.push(v))
};


const enhance = compose (
    connect(state => ({

    })),
    lifecycle({
        componentDidMount() {

            initChatData();

            const chart = new window.CanvasJS.Chart("record-chat", {
                title :{
                    text: 'Recorded'
                },
                axisY: {
                    includeZero: false
                },
                data: [{
                    type: "line",
                    dataPoints: dps
                }]
            });


            socket.on('record-data', wave => {
                console.log('wave ->', wave.length);
                appendWave(waves, wave, count);
                waves.forEach((value, index) => {dps[index] = { y: value, x:index }; });
                chart.render();
            });
            chart.render();
            console.log('first ->', dps[0])
        },
    })
);

export default enhance(Component);
