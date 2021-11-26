import _ from "lodash";                                                                      
import types from "./ChucVuTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  chucVus: [],                                                                     
  chucVu: {}                                                                       
};                                                                                             
		
/**
 * set state for ChucVuReducer
 * @param {*} state 
 * @param {*} action 
 * @returns new state and action
 */
const ChucVuReducer = (state = initialState, action) => {                            
  switch (action.type) { 
    // when loading data chuc vu, return new state and action is loading true                                                                        
    case types.SET_LOADING_CHUC_VU:                                              
      return { ...state, isLoading: true };                                                    
									
    // when create new chuc vu, return new state and action is loading true 
    case types.CREATE_CHUC_VU:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
								
    // when get all data chuc vu, return new state and action is data from 
    // rootReducer, loading true
    case types.GET_ALL_CHUC_VU:                                                  
      return { ...state, chucVus: action.chucVus, isLoading: false };  
												
    // when get data chuc vu by id, return new state and action is data from 
    // rootReducer, loading true
    case types.GET_BY_ID_CHUC_VU:                                                
      return { ...state, chucVu: action.chucVu, isLoading: false };    
									
    // when create update chuc vu, return new state and action is loading true
    case types.UPDATE_CHUC_VU:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default ChucVuReducer;                                                        
