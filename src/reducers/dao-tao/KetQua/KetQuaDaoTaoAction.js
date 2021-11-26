import types from "./KetQuaDaoTaoTypes";
import axios from "axios";
import fileDownload from "js-file-download";

/**                                                                                                      
 * update KetQuaDaoTao Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
 export const updateKetQuaDaoTaoRequest = (form) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });             
																										 
    try {                                                                                                
      // call update KetQuaDaoTao                                                                    
      const response = axios.put(`daotao/ketquadaotao`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_KETQUADAOTAO,                                                      
        }); 
      }                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 

/**                                                                                                      
 * Get all Combobox Khoa Hoc Request                                                                      
 * @returns                                                                                              
 */
export const GetAllComboboxKhoaHocRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });

    try {
      const response = await axios.get("daotao/khoahoc");
      const resData = await response.data;
      if (resData.khoaHocs !== null) {
        dispatch({
          type: types.GET_ALL_COMBOBOX_KHOAHOC,
          comboboxkhoahoc: resData.khoaHocs,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};


/**                                                                                                      
 * Get all Môn học đào tạo Request                                                                      
 * @returns                                                                                              
 */
 export const GetAllMonHocDaoTaoRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });

    try {
      const response = await axios.get("daotao/ketquadaotao");
      const resData = await response.data;

      if (resData.monHocs !== null) {
        dispatch({
          type: types.GET_LIST_MONHOC_DAOTAO,
          listmonhocdaotao: resData.monHocs,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * Get all Môn học đào tạo Request                                                                      
 * @returns                                                                                              
 */
 export const GetAllMonHocRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });
    try {
      const response = await axios.get(`daotao/monhoc/${id}`);
      const resData = await response.data;
      if (resData.monHocs !== null) {
        dispatch({
          type: types.GET_LIST_MONHOC,
          listmonhoc:resData.monHocs,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * get KetQuaDaoTao By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const getKetQuaDaoTaoByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });

    try {
      // call get KetQuaDaoTao by id                                                                 
      const response = await axios.get(`daotao/ketquadaotao/${id}`);
      const resData = await response.data;
      if (resData.hocViens !== null) {
        dispatch({
          type: types.GET_BY_ID_KETQUADAOTAO,
          ketquadaotaos: resData.hocViens });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * get KetChungChiSoCap By Id Khoa Hoc                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
 export const getAllChungChiKhoaHocByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });

    try {
      // call get KetQuaDaoTao by id                                                                 
      const response = await axios.get(`daotao/chungchisocap/${id}`);
      const resData = await response.data;
      if (resData.hocViens !== null) {
        dispatch({
          type: types.GET_BY_ID_KETQUACHINHCHI,
          listchinhchi: resData.hocViens });
 
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * update save File excel Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const saveCSVRequest = (form) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });
    try {
      axios({
        url: 'http://14.241.134.20:8081/api/daotao/ketquadaotao/export',
        method: 'POST',
        data:form,
        responseType: 'blob',
      }).then((response) => {
          fileDownload(response.data, 'ketquadaotao.xlsx');
      });
        dispatch({
          type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao:true
        });
    } catch (error) {
      throw error;
    }
  };
};


/*
*export daotao sang sát hạch
*/                                                                                                     
 export const exportDaoTao = (form) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });

    try {
      const response = await axios.post(`daotao/hocvien/sathach`,form);
      const resData = await response.data;

      if (resData.message==="Đã chuyển học viên sang sát hạch thành công!") {
        dispatch({
          type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao:true
        });
      }
      
    } catch (error) {
      throw error;
    }
  };
};


/**                                                                                                      
 * update Date Tot Nghiep                                                                          
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
 export const getUpdateDateRequest = (id ,form) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KETQUADAOTAO, ketquadaotao: false, });

    try {
      const response = await axios.put(`daotao/ketquadaotao/ngaytotnghiep/${id}`,form);
      const resData = await response.data;
  
      if (resData.hocViens !== null) {
        dispatch({
          type: types.GET_BY_ID_KETQUADAOTAO,
          ketquadaotaos: resData.hocViens });
      }

    } catch (error) {
      throw error;
    }
  };
};
                                                                                                       
