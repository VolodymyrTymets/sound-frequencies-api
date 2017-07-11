import _ from 'lodash';
import { get, query, APIAddresses } from '../../utils/api';
import { initTrack } from '../Tracks/actions';
import { GET_RECORDED, START_RECORD, STOP_RECORD,  } from './constants.js';
import { RECORDED } from '../Tracks/constants.js';

const getRecorded = (name) =>  async dispatch => {
  const response = await
    get(`${APIAddresses.RECORDED}/${query({ name })}`, dispatch, GET_RECORDED);

  const frequencies = _.get(response, 'data.frequencies');
  if (frequencies) {
    dispatch(initTrack(name, frequencies));
  }
};

const startRecorded = () =>  async dispatch => {
  const response = await  get(APIAddresses.START_RECORD, dispatch, GET_RECORDED);

  const success = _.get(response, 'data.success');
  if (success) {
    dispatch({
      type: START_RECORD,
    });
  }
};


const stopRecorded = (name) =>  async dispatch => {
  const response = await  get(APIAddresses.STOP_RECORD, dispatch, GET_RECORDED);

  const frequencies = _.get(response, 'data.frequencies');
  if (frequencies) {
    dispatch({
      type: STOP_RECORD,
    });
    dispatch(initTrack(RECORDED, frequencies));
  }
};

export { getRecorded, startRecorded, stopRecorded }