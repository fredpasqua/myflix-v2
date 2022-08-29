import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USER_DATA, SET_USER} from "../actions/actions";

function visibilityFilter(state = '', action) {
    switch (action.type) {
      case SET_FILTER:
        return action.value;
      default:
        return state;
    }
  }

function movies(state = [], action) {
    switch (action.type) {
      case SET_MOVIES:
        return action.value;
      default:
        return state;
    }
  }

  function userData(state = {}, action) {
    switch (action.type) {
      case SET_USER_DATA:
        return action.value;
        default: 
        return state;
    }
  }  


function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default: 
    return state;
  }
}

  
  const moviesApp = combineReducers({
    visibilityFilter,
    movies, userData, user
  });
  
  
  export default moviesApp;