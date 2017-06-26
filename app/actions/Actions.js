import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constants/Constants'
import getRoutes from '../api/Api'

export function getData() {
  return {
    type: FETCHING_DATA
  };
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  };
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  };
}

export function fetchData(origin, destination) {
  return (dispatch) => {
    dispatch(getData());
    getRoutes(origin, destination).then(([response, json]) =>{
      if(response.status === 200){
        console.log('json:');
        console.log(json);
        
        dispatch(getDataSuccess(json.routes))
      }
      else{
        dispatch(getDataFailure())
      }
    })
    .catch((err) => dispatch(getDataFailure()))
  }
}
