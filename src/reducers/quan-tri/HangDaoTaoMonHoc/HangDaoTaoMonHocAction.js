import types from "./HangDaoTaoMonHocTypes";
import axios from "axios";

/**                                                                                                      
 * create HangDaoTaoMonHoc Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */
export const createHangDaoTaoMonHocRequest = (form, id) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: true, });

    try {
      const response = axios.post(`quantri/hangdt/monhoc/${id}`, form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_HANGDAOTAOMONHOC,
        });
      }
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: true, });
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * Get all ComboboxHangDaoTaoMonHoc Request                                                                      
 * @returns                                                                                              
 */
export const GetComboboxHangDaoTaoRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });

    try {
      const response = await axios.get("hanggplx");
      const resData = await response.data;
      if (resData.hangGPLXs !== null) {
        dispatch({
          type: types.GET_COMBOBOX_HANGDAOTAO,
          comboboxHDT: resData.hangGPLXs,
        });
      }
    
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * Get all combobox môn học HangDaoTaoMonHoc Request                                                                      
 * @returns                                                                                              
 */
export const GetComboboxMonHocRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, monHocs: false, });

    try {
      const response = await axios.get("quantri/monhoc/list");
      const resData = await response.data;
      if (resData.monHocs !== null) {
        dispatch({
          type: types.GET_ALL_MONHOC,
          monHocs: resData.monHocs,
        });
      }
    
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * get HangDaoTaoMonHoc By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const getHangDaoTaoMonHocByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: false,tenhangdaotaomonhoc:false });

    try {
      // call get HangDaoTaoMonHoc by id                                                                 
      const response = await axios.get(`quantri/hangdt/monhoc/${id}`);
      const resData = await response.data;
      if (resData !== null) {
        dispatch({ type: types.GET_ALL_HANGDAOTAOMONHOC,
          hangdaotaomonhocs: resData.hangDTMH.monHocs, 
          tenhangdaotaomonhoc: resData.hangDTMH.tenHang });
      }

    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * update HangDaoTaoMonHoc Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const updateHangDaoTaoMonHocRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: false, });

    try {
      // call update HangDaoTaoMonHoc                                                                    
      const response = axios.put(`quantri/hangdt/monhoc/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_HANGDAOTAOMONHOC,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete HangDaoTaoMonHoc Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const deleteMonHocDaoTaoMonHocRequest = (form ,id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: true, });
    
    axios({
      url: `http://14.241.134.20:8081/api/quantri/hangdt/monhoc/${id}`,
      method: 'DELETE',
      data:form,
      responseType: 'blob',
    }).then((response) => {
      dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: false, });
    });

  } catch (e) {
    dispatch({ type: types.SET_LOADING_HANGDAOTAOMONHOC, hangdaotaomonhoc: false, });
  }
};
