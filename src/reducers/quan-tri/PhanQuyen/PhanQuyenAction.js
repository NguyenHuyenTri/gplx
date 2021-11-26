import types from "./PhanQuyenTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create PhanQuyen Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createPhanQuyenRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: true, });              
																										 
    try {                                                                                                
      const response = axios.post("phanQuyen", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_PHANQUYEN,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all PhanQuyen Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllPhanQuyenRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_PHAN_QUYEN, phanQuyen: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/nguoidung");                                          
      const resData = await response.data; 
      
      if (resData !== 200) {                                                                             
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_ALL_PHAN_QUYEN,                                                       
        phanQuyens: resData.nhanViens,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get PhanQuyen By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getPhanQuyenByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: false, });             
																										 
    try {                                                                                                
      // call get PhanQuyen by id                                                                 
      const response = await axios.get(`phanQuyen/${id}`);                                      
																										 
      dispatch({ type: types.GET_BY_ID_PHANQUYEN, car: response.data.phanQuyen });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update PhanQuyen Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updatePhanQuyenRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: false, });             
																										 
    try {                                                                                                
      // call update PhanQuyen                                                                    
      const response = axios.put(`phanQuyen/${id}`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_PHANQUYEN,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete PhanQuyen Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deletePhanQuyenRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: true, });              
																										 
    // call delete PhanQuyen                                                                      
    const response = axios.delete(`phanQuyen/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllPhanQuyenRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_PHANQUYEN, phanQuyen: false, });             
  }                                                                                                      
};    

/**                                                                                                      
 * get nhom chuc nang Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
 export const getNhomChucNangRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_PHAN_QUYEN, phanQuyen: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/nhomchucnang");                                          
      const resData = await response.data; 
      
      if (resData !== 200) {                                                                             
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_NHOM_CHUC_NANG,                                                       
        nhomChucNangs: resData.nhomChucNangs,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};        

