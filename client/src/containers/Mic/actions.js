import _ from 'lodash';
import { get, query, APIAddresses } from '../../utils/api';
import { initTrack } from '../Tracks/actions';

import { GET_RECORDED } from './constants.js';

const getRecorded = (name) =>  async dispatch => {
  const response = await
    get(`${APIAddresses.RECORDED}/${query({ name })}`, dispatch, GET_RECORDED);

  const frequencies = _.get(response, 'data.frequencies');
  if (frequencies) {
    dispatch(initTrack(name, frequencies));
  }
};

export { getRecorded }