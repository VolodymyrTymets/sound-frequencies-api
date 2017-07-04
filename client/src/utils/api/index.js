import _ from 'lodash';
import axios from 'axios';
import APIAddresses from './urls';
import { showError } from '../notifications';
import { switchLoader } from '../../containers/Loader/actions';

const makeRequest = async (type, url, data, dispatch, loaderName,  logError) => {
  try {
    loaderName && dispatch(switchLoader(loaderName, true));
     const response =  await axios({
      url,
      data,
      method: type,
    });
    loaderName && dispatch(switchLoader(loaderName, false));
    return response;
  } catch (error) {
    if(process.env.NODE_ENV !== 'production') {
      //eslint-disable-next-line no-console
      console.log(`Error: [${type}] - ${url}`);
      //eslint-disable-next-line no-console
      console.log(error);
    }
    loaderName && dispatch(switchLoader(loaderName, false));

    if(dispatch && logError) {
      const message = _.get(error,'response.data.message');
      dispatch(showError(message || error.message));
      return error;
    }
    return error;
  }
};
/**
  Provide Request for server
**/
const get = (url, dispatch, loaderName, logError) =>
  makeRequest('get', url, null, dispatch, loaderName, logError);
const post = (url, data, dispatch, loaderName, logError) =>
  makeRequest('post', url, data, dispatch, loaderName, logError);
const put = (url, data, dispatch, loaderName, logError) =>
  makeRequest('put', url, data, dispatch, loaderName, logError);
const remove = (url, data, dispatch, loaderName, logError) =>
  makeRequest('delete', url, data, dispatch, loaderName, logError);
const query = data => `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`;

export { APIAddresses, get, post, put, remove, query };
