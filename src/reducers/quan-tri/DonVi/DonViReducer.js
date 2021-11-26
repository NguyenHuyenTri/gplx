import _ from "lodash";                                                                      
import types from "./DonViTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  donVis: [],                                                                     
  donVi: {}                                                                       
};                                                                                             
																							   
const DonViReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_DON_VI:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.CREATE_DON_VI:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    case types.GET_ALL_DON_VI:                                                  
      return { ...state, donVis: action.donVis, isLoading: false };  
																							   
    case types.GET_BY_ID_DON_VI:                                                
      return { ...state, donVi: action.donVi, isLoading: false };    
																							   
    case types.UPDATE_DON_VI:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default DonViReducer;                                                        
