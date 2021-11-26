import types from "./GiaoVienTypes";
import axios from "axios";
import fileDownload from "js-file-download";

/**
 * create xe
 * @param {*} form
 * @returns
 */
export const createGiaoVienRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, xe: true });

    try {
      const response = axios.post("daotao/giaovien", form);
      const resData = await response;
      if (resData.status) {
      

        dispatch({
          type: types.CREATE_GIAO_VIEN,
        });
      }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_GIAO_VIEN, xe: true });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get Xe Request
 * @returns
 */
export const GetGiaoVienRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoViens: false });
    try {
      const response = await axios.get("daotao/giaovien");
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_ALL_GIAO_VIEN,
        giaoViens: resData.giaoViens,
      });
     
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get Xe By Id
 * @param {*} id
 * @returns
 */
export const getGiaoVienByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false });

    try {
      const response = await axios.get(`daotao/giaovien/detail/${id}`);
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_BY_ID_GIAO_VIEN,
        giaoVien: resData.giaoVien,
      });
      
    } catch (error) {
      throw error;
    }
  };
};

/**
 * export xe
 * @param {*} form
 * @returns
 */
export const exportGiaoVienRequest = (listId) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: true });

    try {
      // const response = axios.post("xe/export",id);
      // const resData = await response;
      // console.log('em')

      //     // FileDownload(response.data, 'report.csv');

      axios({
        url: "http://14.241.134.20:8081/api/daotao/giaovien/export",
        method: "POST",
        data: {
          listGV: listId,
        },
        responseType: "blob", // Important
      }).then((response) => {
        console.log(response);
        fileDownload(response.data, "danhsachgiaovien.xlsx");
      });
      // if (resData.status) {
      //   dispatch({
      //     type: types.EXPORT_XE,
      //   });
      // }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_GIAO_VIEN, xe: true });
    } catch (error) {
      throw error;
    }
  };
};
/**
 * create xe
 * @param {*} form
 * @returns
 */
export const createHangGPLXRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, xe: true });

    try {
      const response = axios.post("daotao/giaovien/gplx", form);
      const resData = await response;
      console.log('resData', resData)

      if (resData.status) {
        dispatch({
          type: types.CREATE_GPLX_GV,
          hangGPLXGV: resData.data.gplx,
        });
      }

      // setLoadings falses
      dispatch({ type: types.SET_LOADING_GIAO_VIEN, xe: true });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get Xe Request
 * @returns
 */
export const GetHangGPLXsRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false });
    try {
      const response = await axios.get("hanggplx");
      const resData = await response.data;
      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_HANG_GPLX,
        hangGPLXs: resData.hangGPLXs,
      });
    } catch (error) {
      throw error;
    }
  };
};
/**
 * Get Xe Request
 * @returns
 */
export const GetNoiCapRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false });
    try {
      const response = await axios.get("noicap");
      const resData = await response.data;
      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_NOI_CAP,
        noiCaps: resData.noiCaps,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * updateXE
 * @param {*} form
 * @param {*} id
 * @returns
 */
export const updateGPLXGVRequest = (form,id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false });

    try {
      const response = axios.put(`daotao/giaovien/gplx/${id}`, form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.UPDATE_GPLX_GV,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**
 * updateXE
 * @param {*} form
 * @param {*} id
 * @returns
 */
 export const updateGVRequest = (form,id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false });

    try {
      const response = axios.put(`daotao/giaovien/${id}`, form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.UPDATE_GV,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete KhoaHoc Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
 export const deleteGVRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: true, });              
																					
    // call delete KhoaHoc                                                                      
    const response = axios.delete(`daotao/giaovien/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      dispatch(GetGiaoVienRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false, });             
  }                                                                                                      
};                                                                                                       

export const deleteGPLXGVRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: true, });              
																								 
    // call delete KhoaHoc                                                                      
    const response = axios.delete(`daotao/giaovien/gplx/${id}`);                                           
    const resData = await response;                                                                      
																										 
  																					 
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVien: false, });             
  }                                                                                                      
};                                                                                                       
