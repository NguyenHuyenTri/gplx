import _ from "lodash";                                                                      
import types from "./CheckinTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  checkins: [],                                                                     
  checkin: {},
  xes: [],
  xeTLs: []                                                                       
};                                                                                             
																							   
const CheckinReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_CHECKIN:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.GET_ALL_CHECKIN:                                                  
      return { ...state, checkins: action.checkins, isLoading: false };  
																							   
    case types.GET_BY_ID_CHECKIN:                                                
      return { ...state, checkin: action.checkin, isLoading: false };    
																							   
    case types.UPDATE_CHECKIN:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
    case types.GET_ALL_XE:                                                  
      return { ...state, xes: action.xes, isLoading: false };  
    case types.GET_ALL_SAN_TAP_LAI:                                                  
      return { ...state, sanTLs: action.sanTLs, isLoading: false };  																					   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default CheckinReducer;                                                        
