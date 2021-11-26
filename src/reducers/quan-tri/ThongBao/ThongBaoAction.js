import types from "./ThongBaoTypes";
import axios from "axios";


export const setLoadings = (payload) => ({ type: types.SET_LOADING_THONG_BAO, payload });

export const setThongBaoTC = (payload) => ({ type: types.GET_THONG_BAO_TC, payload });

/**                                                                                                      
 * create ThongBao Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */
export const createThongBaoRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: true, });

    try {
      const response = axios.post("quantri/thongbao", form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_THONG_BAO,
        });
      }
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: true, });
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * Get all ThongBao Request                                                                      
 * @returns                                                                                              
 */
export const GetAllThongBaoRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });

    try {
      const response = await axios.get("quantri/thongbao");
      const resData = await response.data;
      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_ALL_THONG_BAO,
        thongBaos: resData.thongBaos,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * get ThongBao By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const getThongBaoByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });

    try {
      // call get ThongBao by id                                                                 
      const response = await axios.get(`quantri/thongbao/${id}`);
      const resData = await response.data;

      if (resData !== 200) {
      }
      dispatch({ type: types.GET_BY_ID_THONG_BAO, thongBao: resData.thongBao });

    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * update ThongBao Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const updateThongBaoRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });

    try {
      // call update ThongBao                                                                    
      const response = axios.put(`quantri/thongbao/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_THONG_BAO,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete ThongBao Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const deleteThongBaoRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: true, });

    // call delete ThongBao                                                                      
    const response = axios.delete(`quantri/thongbao/${id}`);
    const resData = await response;

    if (resData) {
      // call load data after delete                                                                     
      dispatch(GetAllThongBaoRequest());
    }

    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });
  } catch (e) {
    console.error(e);
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });
  }
};

export const getThongBaoTCRequest = () => async (dispatch) => {
  try {
    dispatch(setLoadings({ deleteInformation: true }));
    const url = `thongbao`;

    const res = await axios({
      url,
      method: 'GET',
    });

    if (res) {
      dispatch(setThongBaoTC(res.data.thongBaos));
    }
    dispatch(setLoadings({ deleteInformation: false }));
  } catch (e) {
    dispatch(setLoadings({ deleteInformation: false }));
  }
};

/**
 * get sat hach for combobox
 * @param {*} id
 * @returns
 */
export const getSatHachComboboxRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBaos: false });

    try {
      const response = await axios.get("kysathach/list");
      const resData = await response.data;

      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_COMBOBOX_SAT_HACH,
        satHachs: resData.satHachs,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get khoa hoc for combobox
 * @param {*} id
 * @returns
 */
export const getKhoaHocComboboxRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBaos: false });

    try {
      const response = await axios.get("daotao/khoahoc");
      const resData = await response.data;

      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_COMBOBOX_KHOA_HOC,
        khoaHocs: resData.khoaHocs,
      });
    } catch (error) {
      throw error;
    }
  };
};


/**                                                                                                      
 * active ThongBao Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const activeThongBaoRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: true, });

    axios.get(`quantri/guithongbao/${id}`);
    dispatch(GetAllThongBaoRequest());

    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });
  } catch (e) {
    console.error(e);
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });
  }
};

/**                                                                                                      
 * inactive ThongBao Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const inactiveThongBaoRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: true, });

    axios.get(`quantri/dungthongbao/${id}`);
    dispatch(GetAllThongBaoRequest());

    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });
  } catch (e) {
    console.error(e);
    dispatch({ type: types.SET_LOADING_THONG_BAO, thongBao: false, });
  }
};


