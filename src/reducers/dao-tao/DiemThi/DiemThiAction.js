import types from "./DiemThiTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create DiemThi Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createDiemThiRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: true, });              
																										 
    try {                                                                                                
      const response = axios.post("diemThi", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_DIEM_THI,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all DiemThi Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllDiemThiRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("diemThi");                                          
      const resData = await response.data;  
      
      if (resData !== 200) {                                                                             
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_ALL_DIEM_THI,                                                       
        diemThis: resData.hocViens,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get DiemThi By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getDiemThiByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: false, });             
																										 
    try {                                                                                                
      // call get DiemThi by id                                                                 
      const response = await axios.get(`daotao/diemthi/${id}`);   
      const resData = response.data;                                   
									
      dispatch({ type: types.GET_ALL_DIEM_THI, diemThis: resData.hocViens });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update DiemThi Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateDiemThiRequest = (form) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: false, });             
																										 
    try {                                                                                                
      // call update DiemThi                                                                    
      const response = axios.put("daotao/diemthi", form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.UPDATE_DIEM_THI,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete DiemThi Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteDiemThiRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: true, });              
																										 
    // call delete DiemThi                                                                      
    const response = axios.delete(`diemThi/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllDiemThiRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThi: false, });             
  }                                                                                                      
};  

/**
 * get mon hoc for combobox
 * @param {*} id
 * @returns
 */
 export const GetAllMonHocByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_DIEM_THI, diemThis: false });

    try {
      const response = await axios.get(`/daotao/monhoc/${id}`);
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_COMBOBOX_FOR_MON_HOC,
        monHocs: resData.monHocs,
      });
    } catch (error) {
      throw error;
    }
  };
};
