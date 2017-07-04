import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { getRecorded } from '../Mic/actions';
import { TEST_1 } from '../Tracks/constants';

import Panel from '../../components/Panel';

const enhance = compose (
  connect(state => {}, { getRecorded }),
  withState('investor', 'setInvestor', undefined),
  withHandlers({
    onButtonClick: props => () => {
      props.getRecorded(TEST_1);
    },
  }),
);

export default enhance(Panel);
