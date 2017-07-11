import { compose,  withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded, startRecorded, stopRecorded } from '../Mic/actions';
import { TEST_1, TEST_2 } from '../Tracks/constants';
import { RECORDED } from '../Mic/constants';

import Panel from '../../components/Panel';

const enhance = compose (
  connect(state => ({
    mic: state.mic,
  }), { getRecorded, startRecorded, stopRecorded }),
  withHandlers({
    onButtonClick: props => () => {
      props.getRecorded(TEST_1);
    },
    onButton2Click: props => () => {
      props.getRecorded(TEST_2);
    },
    onRecord: props => () => {
      console.log('on record')
      if(props.mic.status !== RECORDED) {
        props.startRecorded();
      } else {
        props.stopRecorded();
      }
    }
  }),
);

export default enhance(Panel);
