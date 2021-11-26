import _ from "lodash";                                                                      
import types from "./DoanhThuTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  doanhthus: [],                                                                     
  doanhthu: {}                                                                       
};                                                                                             
																							   
const DoanhThuReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_DOANHTHU:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.CREATE_DOANHTHU:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    case types.GET_ALL_DOANHTHU:                                                  
      return { ...state, doanhthus: action.doanhthus, isLoading: false };  
																							   
    case types.GET_BY_ID_DOANHTHU:                                                
      return { ...state, doanhthu: action.doanhthu, isLoading: false };    
																							   
    case types.UPDATE_DOANHTHU:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default DoanhThuReducer;                                                        
