import { compose,  withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded, startRecorded, stopRecorded } from'../Mic/actions';
 import { RECORDED } from '../Mic/constants';

import Panel from '../../components/Panel';

const enhance = compose (
  connect(state =>
    ({ mic: state.mic, }), { getRecorded, startRecorded, stopRecorded }),
 withHandlers({ onSubmit: props => e => {
    e.preventDefault();
    props.getRecorded(e.target.name.value);
  },
onRecord: props => () => {
  if(props.mic.status !== RECORDED) {
    props.startRecorded();
   } else {
      props.stopRecorded();
   }
}
}), );

export default enhance(Panel);
