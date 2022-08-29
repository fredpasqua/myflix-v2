

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER = 'SET_USER';
export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserData(value) {
  return { type: SET_USER_DATA, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

