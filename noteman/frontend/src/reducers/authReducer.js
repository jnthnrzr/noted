import { LOGIN_USER, REGISTER_USER } from '../actions/types';

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
      };
    case LOGIN_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
