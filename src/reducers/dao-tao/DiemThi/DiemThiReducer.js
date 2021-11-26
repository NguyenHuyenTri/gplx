import _ from "lodash";                                                                      
import types from "./DiemThiTypes";                                                 
																							   
const initialState = {                                                                         
  isLoading: false,                                                                            
  diemThis: [],                                                                     
  diemThi: {},
  monHocs: [],                                                                   
};                                                                                             
																							   
const DiemThiReducer = (state = initialState, action) => {                            
  switch (action.type) {                                                                       
    case types.SET_LOADING_DIEM_THI:                                              
      return { ...state, isLoading: true };                                                    
																							   
    case types.CREATE_DIEM_THI:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    case types.GET_ALL_DIEM_THI:                                                  
      return { ...state, diemThis: action.diemThis, isLoading: false };  
																							   
    case types.GET_BY_ID_DIEM_THI:                                                
      return { ...state, diemThi: action.diemThi, isLoading: false }; 
      
    case types.GET_COMBOBOX_FOR_MON_HOC:
      return { ...state, monHocs: action.monHocs, isLoading: false };
																							   
    case types.UPDATE_DIEM_THI:                                                   
      return {                                                                                 
        ...state,                                                                              
        isLoading: false,                                                                      
      };                                                                                       
																							   
    default:                                                                                   
      return state;                                                                            
  }                                                                                            
};                                                                                             
																							   
export default DiemThiReducer;                                                        
