import types from "./TheThueXeTypes";                                                           
import axios from "axios";                                                                             
																										 
																							 
/**                                                                                                      
 * Get all TheThueXe Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllTheThueXeRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("thietbi/thethuexe");                                            
      const resData = await response.data;   
                                                   
      if (resData.theTus!=null) { 
        dispatch({                                                                                         
          type: types.GET_ALL_THETHUEXE,                                                       
          thethuexes: resData.theTus,                                                               
        });                                                                           
      }                                                                                                         
																										 
                                                                                                 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};  

/**                                                                                                      
 * get thethuexe By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
 export const getTheThueXeByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: false, });

    try {
      // call get thethuexe by id                                                                 
      const response = await axios.get(`thietbi/thethuexe/detail/${id}`);

      const resData = await response;
      if (resData.status === 200) {
        dispatch({
          type: types.GET_BY_ID_THETHUEXE,
          thethuexe: resData.data.theTu,
        });
      }


    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * create TheThueXe Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */
 export const createTheThueXeRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: true, });

    try {
      const response = axios.post("thietbi/thethuexe", form);
      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.CREATE_THETHUEXE,
        });
      }
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: true, });
    } catch (error) {
      throw error;
    }
  };
};
																										                                                                                                     
/**                                                                                                      
 * update thethuexe Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
 export const updateTheThueXeRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: false, });

    try {
      // call update thethuexe                                                                    
      const response = axios.put(`thietbi/thethuexe/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_THETHUEXE,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete thethuexe Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const deleteTheThueXeRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: true, });

    // call delete thethuexe                                                                      
    const response = axios.delete(`thietbi/thethuexe/${id}`);
    const resData = await response;
    if (resData.status === 200) {                                                                       
      dispatch(GetAllTheThueXeRequest());
    }

    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: false, });
  } catch (e) {
    dispatch({ type: types.SET_LOADING_THETHUEXE, thethuexe: false, });
  }
};                                                                                                    
																										 