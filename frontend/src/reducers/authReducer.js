import { AUTH_SUCCESS, SET_ERROR, LOGOUT, LOADING } from '../constants/userConstansts';

const initState =  { userInfo: {}, loading: false, error: {} };

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify({ ...action?.payload }));
      return { ...state, userInfo: action.payload, loading: false };

    case SET_ERROR:
      return { ...state, error: action?.payload, loading: false } 

    case LOADING:
      return { ...state, loading: action?.payload } 

    case LOGOUT:
      localStorage.setItem('userInfo', null);
      return { ...state, userInfo: null };

    default:
      return state;
  }
};
