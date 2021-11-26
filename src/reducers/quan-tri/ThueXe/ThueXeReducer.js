import _ from "lodash";                                                                      
import types from "./ThueXeTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  xes: [],                                                                     
  xe: {}                                                                       
};                                                                                             
																							   
const ThueXeReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_THUE_XE:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.CREATE_THUE_XE:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    case types.GET_ALL_THUE_XE:                                                  
      return { ...state, xes: action.xes, isLoading: false };  
																							   
    case types.GET_BY_ID_THUE_XE:                                                
      return { ...state, xe: action.xe, isLoading: false };    
																							   
    case types.UPDATE_THUE_XE:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default ThueXeReducer;                                                        
