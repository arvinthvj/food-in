// src/actions/suggestionActions.js
export const SET_POSTAL_CODE_SUGGESTIONS = 'SET_POSTAL_CODE_SUGGESTIONS';
export const CLEAR_POSTAL_CODE_SUGGESTIONS = 'CLEAR_POSTAL_CODE_SUGGESTIONS';

export const setPostalCodeSuggestions = (term:any) => ({
  type: SET_POSTAL_CODE_SUGGESTIONS,
  payload: term,
});

export const clearPostalCodeSuggestions = (term:any) => ({
  type: CLEAR_POSTAL_CODE_SUGGESTIONS,
  payload: term,
});
