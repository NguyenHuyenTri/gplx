import _ from "lodash";                                                                      
import types from "./GiayToTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  giayTos: [],                                                                     
  giayTo: {}                                                                       
};                                                                                             
						
/**
 * set state for GiayToReducer
 * @param {*} state 
 * @param {*} action 
 * @returns new state and action
 */
const GiayToReducer = (state = initialState, action) => {                            
  switch (action.type) {         
    // when loading data giay to, return new state and action is loading true                                                            
    case types.SET_LOADING_GIAY_TO:                                              
      return { ...state, isLoading: true };                                                    
																
    // when create new giay to, return new state and action is loading false  
    case types.CREATE_GIAY_TO:                                                   
      return { ...state, isLoading: false };                                                                                       
													
    // when get all data giay to, return new state and action is data from 
    // rootReducer, loading false
    case types.GET_ALL_GIAY_TO:                                                  
      return { ...state, giayTos: action.giayTos, isLoading: false };  
		
    // when get data giay to by id, return new state and action is data from 
    // rootReducer, loading false
    case types.GET_BY_ID_GIAY_TO:                                                
      return { ...state, giayTo: action.giayTo, isLoading: false };    
			
    // when create update giay to, return new state and action is loading false
    case types.UPDATE_GIAY_TO:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
		
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default GiayToReducer;                                                        
