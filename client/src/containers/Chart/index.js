import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded } from '../Mic/actions';
import { TEST_1 } from '../Tracks/constants';

import Chart from '../../components/Chart';

const enhance = compose (
  connect(state => {
    const data = state.tracks[TEST_1] || [];
    const newData =[];
    const index = parseInt(20002 / 100);
    const labels = []
    for(let i = 0; i< 100; i++) {
      newData.push(data[i * index ]);
      labels.push(i)
    }
    console.log('newData->', newData)
    console.log('length', data.length)
    return {
      data:{
        datasets: [
          {
            data: newData,
            fillColor: "rgba(220,220,220,0.2)",
            label: "My First dataset",
            pointColor: "rgba(220,220,220,1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            strokeColor: "rgba(220,220,220,1)",
          }
        ],
        labels:labels
      },
    }
  }, { getRecorded }),
  // lifecycle({
  //   componentDidMount() {
  //
  //   },
  //   componentWillReceiveProps(newProps) {
  //     const { investors, setInvestor, investor } = newProps;
  //     if (!investor) {
  //       const investorUID = this.props.match.params.investorUID;
  //       const investorId = _.findKey(investors.values, {'uid': investorUID});
  //       const investor = investors.values[investorId];
  //       investor && setInvestor(investor);
  //     }
  //   },
  // })
);

export default enhance(Chart);
