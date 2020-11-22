import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './actionTypes';

const URL = 'https://api.exchangeratesapi.io/latest?base=IDR';

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchSuccess = (data) => ({
  type: FETCH_SUCCESS,
  loading: false,
  data,
});

export const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  error,
});

export const fetchData = () => (dispatch) => {
  dispatch(fetchRequest());
  fetch(URL)
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(fetchSuccess(responseData));
    })
    .catch((error) => dispatch(fetchFailure(error)));
};
