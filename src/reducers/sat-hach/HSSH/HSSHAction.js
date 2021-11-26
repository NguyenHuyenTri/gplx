import types from './HSSHTypes';
import { getHSSH } from '../../../api/sat-hach-api';

export const setLoadings = (payload) => ({ type: types.SET_LOADING, payload });



export const setHSSH= (payload) => ({ type: types.GET_HSSH, payload });

export const getHSSHRequest = () => async (dispatch) => {
  try {
    dispatch(setLoadings({ HSSH: true }));

    const res = await getHSSH();

    if (res) {
      dispatch(setHSSH(res));
    }
    dispatch(setLoadings({ HSSH: false }));
  } catch (e) {
    console.error(e);
    dispatch(setLoadings({ HSSH: false }));
  }
};


