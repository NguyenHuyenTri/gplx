import _ from "lodash";                                                                      
import types from "./CoSoDaoTaoTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  cosodaotaos: [],                                                                     
  cosodaotao: {}                                                                       
};                                                                                             
																							   
const CoSoDaoTaoReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_COSODAOTAO:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.CREATE_COSODAOTAO:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    case types.GET_ALL_COSODAOTAO:                                                  
      return { ...state, cosodaotaos: action.cosodaotaos, isLoading: false };  
																							   
    case types.GET_BY_ID_COSODAOTAO:                                                
      return { ...state, cosodaotao: action.cosodaotao, isLoading: false };    
																							   
    case types.UPDATE_COSODAOTAO:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default CoSoDaoTaoReducer;                                                        
