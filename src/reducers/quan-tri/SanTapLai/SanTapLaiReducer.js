import _ from "lodash";                                                                      
import types from "./SanTapLaiTypes";                                                 

const initialState = {                                                                         
  isLoading: false,                                                                            
  sanTLs: [],                                                                     
  sanTL: {}                                                                       
};                                                                                             
		
/**
 * set state for SanTapLaiReducer
 * @param {*} state 
 * @param {*} action 
 * @returns new state and action
 */
const SanTapLaiReducer = (state = initialState, action) => {                            
  switch (action.type) {        
    
    // when loading data san tap lai, return new state and action is loading true 
    case types.SET_LOADING_SAN_TAP_LAI:                                              
      return { ...state, isLoading: true };                                                    
							
    // when create new san tap lai, return new state and action is loading true 
    case types.CREATE_SAN_TAP_LAI:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
							
    // when get all data san tap lai, return new state and action is data from 
    // rootReducer, loading true
    case types.GET_ALL_SAN_TAP_LAI:                                                  
      return { ...state, sanTLs: action.sanTLs, isLoading: false };  
							
    // when get data san tap lai by id, return new state and action is data from 
    // rootReducer, loading true
    case types.GET_BY_ID_SAN_TAP_LAI:                                                
      return { ...state, sanTL: action.sanTL, isLoading: false };    
							
    // when create update san tap lai, return new state and action is loading true
    case types.UPDATE_SAN_TAP_LAI:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default SanTapLaiReducer;                                                        
