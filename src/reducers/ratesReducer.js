import { FETCH_SUCCESS } from '../actions/actionTypes';

const ratesInitialState = {
  data: [],
  date: '',
  loading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = ratesInitialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        data: Object.entries(action.data.rates),
        date: action.data.date,
        loading: false,
      };
    default:
      return state;
  }
};
