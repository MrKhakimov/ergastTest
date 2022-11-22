import axios from 'axios';
import api from '../../utils/api';
import {
  driversDispatch,
  errorDispatch,
  footerLoadingDispatch,
  infiniteScrollDispatch,
  loadingDispatch,
} from '../reducers/driversReducer';

const {baseUrl, drivers} = api;

export const fetchDriverList = () => {
  return async dispatch => {
    dispatch(loadingDispatch(true));
    try {
      const {data} = await axios.get(`${baseUrl}${drivers}.json?limit=10`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return dispatch(driversDispatch(data?.MRData));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log('error message: ', error.message);
        return dispatch(errorDispatch(true, error?.message));
      } else {
        return dispatch(errorDispatch(true, 'An unexpected error occurred'));
      }
    }
  };
};

export const fetchDriverListScrolling = (offset: number) => {

  return async dispatch => {
    try {
      const {data} = await axios.get(
        `${baseUrl}${drivers}.json?limit=10&offset=${offset}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return dispatch(infiniteScrollDispatch(data?.MRData?.DriverTable?.Drivers, offset));
    } catch (error) {
      // errors
      return dispatch(footerLoadingDispatch(false));
    }
  };
};
