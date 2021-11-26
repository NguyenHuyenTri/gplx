import _ from 'lodash';

const initialState = {
  type: 'success',
  message: '',
};

const toastReducer = (state = initialState, action) => {
  return { ...state, ...action.payload };
};

export default toastReducer;
