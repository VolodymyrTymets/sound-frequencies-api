import _ from 'lodash';
import { get, query, APIAddresses } from '../../utils/api';
import { initTrack, initWave, initEnergy } from '../Tracks/actions';
import { GET_RECORDED, START_RECORD, STOP_RECORD,  } from './constants.js';
import { RECORDED } from '../Tracks/constants.js';

const getRecorded = (name) =>  async dispatch => {
  const response = await
    get(`${APIAddresses.RECORDED}/${query({ name })}`, dispatch, GET_RECORDED);

  const frequencie = _.get(response, 'data.frequencie');
  const wave = _.get(response, 'data.wave');
  const energy = _.get(response, 'data.energy');
  if (frequencie) {
    dispatch(initTrack(name, frequencie));
    dispatch(initWave(name, wave));
    dispatch(initEnergy(name, energy));
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

  const success = _.get(response, 'data.success');
  if (success) {
    dispatch({
      type: STOP_RECORD,
    });
    //dispatch(initTrack(RECORDED, frequencies));
  }
};

export { getRecorded, startRecorded, stopRecorded }
