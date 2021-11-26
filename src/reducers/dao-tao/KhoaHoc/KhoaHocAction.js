import types from "./KhoaHocTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create KhoaHoc Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createKhoaHocRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: true, });              
																										 
    try {                                                                                                
      const response = axios.post("khoahoc", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_KHOA_HOC,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all KhoaHoc Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllKhoaHocRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("khoahoc");                                          
      const resData = await response.data; 
      
      if (resData !== 200) {                                                                             
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_ALL_KHOA_HOC,                                                       
        khoaHocs: resData.khoaHocs,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get KhoaHoc By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getKhoaHocByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: false, });             
																										 
    try {                                                                                                
      // call get KhoaHoc by id                                                                 
      const response = await axios.get(`khoahoc/${id}`); 
      const resData = response.data;                             
																										 
      dispatch({ type: types.GET_BY_ID_KHOA_HOC, khoaHoc: resData.khoaHoc });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update KhoaHoc Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateKhoaHocRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: false, });             
																										 
    try {                                                                                                
      // call update KhoaHoc                                                                    
      const response = axios.put(`khoahoc/${id}`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_KHOA_HOC,                                                      
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
export const deleteKhoaHocRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: true, });              
																										 
    // call delete KhoaHoc                                                                      
    const response = axios.delete(`khoahoc/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllKhoaHocRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHoc: false, });             
  }                                                                                                      
};                                                                                                       

/**
 * get khoa hoc for combobox
 * @param {*} id
 * @returns
 */
 export const getHangGPLXRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_KHOA_HOC, khoaHocs: false });

    try {
      const response = await axios.get("hanggplx/hangdt");
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