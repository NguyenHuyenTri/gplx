import types from "./DoanhThuTypes";                                                           
import axios from "axios";                                                                             
																										 
																							 
/**                                                                                                      
 * Get all DoanhThu Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllDoanhThuRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DOANHTHU, doanhthu: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("lichthuexe");                                            
      const resData = await response.data;   
                                                   
      if (resData.lichThueXes!=null) { 
        dispatch({                                                                                         
          type: types.GET_ALL_DOANHTHU,                                                       
          doanhthus: resData.lichThueXes,                                                               
        });                                                                           
      }                                                                                                         
																										 
                                                                                                 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										                                                                                                     
export const updateDoanhThuRequest = (id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DOANHTHU, doanhthu: false, });             
																										 
    try {                                                                                                
      // call update DoanhThu                                                                    
      const response = axios.put(`lichthuexe/doanhthu/${id}`);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_DOANHTHU,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 