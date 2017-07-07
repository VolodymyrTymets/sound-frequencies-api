import { compose,  withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded } from '../Mic/actions';
import { TEST_1, TEST_2 } from '../Tracks/constants';

import Panel from '../../components/Panel';

const enhance = compose (
  connect(state => {}, { getRecorded }),
  withHandlers({
    onButtonClick: props => () => {
      props.getRecorded(TEST_1);
    },
    onButton2Click: props => () => {
      props.getRecorded(TEST_2);
    },
  }),
);

export default enhance(Panel);
