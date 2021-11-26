import types from "./KetQuaSatHachTypes";                                                           
import axios from "axios";                                                                             
																										 
                                                                                                       																									 
/**                                                                                                      
 * Get all KetQuaSatHach Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllComboboxKySatHachRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KETQUASATHACH, ketquasathach: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("kysathach/list");                                          
      const resData = await response.data; 
      if (resData.satHachs!==null) {   
        dispatch({                                                                                         
          type: types.GET_COMBOBOX_KYSATHACH,                                                       
          combobox: resData.satHachs,                                                               
        });     
      }                                                                                                  
                                                                                                    
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 

/**                                                                                                      
 * get KetQuaSatHach By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
 export const getKetDiemThiLyThuyetSatHachRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KETQUASATHACH, diemLyThuyet: false, });             
																										 
    try {                                                                                                
      const response = await axios.get(`sathach/diemdatsathach/${id}`); 
      const resData = await response.data; 
     
      if (resData !== null) {       
        dispatch({ 
          type: types.GET_ID_DIEMLYTHUYET_SATHACH, 
          diemLyThuyet: resData
        });  
      } 
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};        
																										 
/**                                                                                                      
 * get KetQuaSatHach By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getKetQuaSatHachByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KETQUASATHACH, ketquasathach: false, });             
																										 
    try {                                                                                                
      // call get KetQuaSatHach by id                                                                 
      const response = await axios.get(`sathach/ketquasathach/${id}`); 
      const resData = await response.data; 
     
      if (resData.thiSinhs !== null) {       
        dispatch({ 
          type: types.GET_BY_ID_KETQUASATHACH, 
          ketquasathachs: resData.thiSinhs 
        });  
      } 
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update KetQuaSatHach Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateKetQuaSatHachRequest = (form) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_KETQUASATHACH, ketquasathach: false, });             
																										 
    try {                                                                                                
      // call update KetQuaSatHach                                                                    
      const response = axios.put(`sathach/ketquasathach`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_KETQUASATHACH,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete KetQuaSatHach Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
                                                                                                      
