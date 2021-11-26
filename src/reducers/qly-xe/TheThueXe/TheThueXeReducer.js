import _ from "lodash";                                                                      
import types from "./TheThueXeTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  thethuexes: [],                                                                     
  thethuexe: {}                                                                       
};                                                                                             
																							   
const TheThueXeReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_THETHUEXE:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.CREATE_THETHUEXE:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    case types.GET_ALL_THETHUEXE:                                                  
      return { ...state, thethuexes: action.thethuexes, isLoading: false };  
																							   
    case types.GET_BY_ID_THETHUEXE:                                                
      return { ...state, thethuexe: action.thethuexe, isLoading: false };    
																							   
    case types.UPDATE_THETHUEXE:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default TheThueXeReducer;                                                        
