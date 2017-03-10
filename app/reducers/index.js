import axios from 'axios'

// actions
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const ADD_OMDB_DATA = 'ADD_OMDB_DATA'

// actionCreators
export function setSearchTerm (searchTerm) {
  return { type: SET_SEARCH_TERM, searchTerm }
}

export function addOMDBData (imdbID, omdbData) {
  return { type: ADD_OMDB_DATA, imdbID, omdbData }
}

export function getOMDBDetails (imdbID) {
  return function (dispatch, getState) {
    axios.get(`http://www.omdbapi.com/?i=${imdbID}`)
      .then((response) => {
        dispatch(addOMDBData(imdbID, response.data))
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
}

// Handlers
const handleSetSearchTerm = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {searchTerm: action.searchTerm})
  return newState
}

const handleAddOMDBData = (state, action) => {
  const newOMDBData = {}
  Object.assign(newOMDBData, state.omdbData, {[action.imdbID]: action.omdbData})
  const newState = {}
  Object.assign(newState, state, {omdbData: newOMDBData})
  return newState
}

// Reducer
const DEFAULT_STATE = {
  searchTerm: '',
  omdbData: {}
}
const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return handleSetSearchTerm(state, action)
    case ADD_OMDB_DATA:
      return handleAddOMDBData(state, action)
    default:
      return state
  }
}

export default rootReducer
