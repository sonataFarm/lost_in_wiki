import merge from 'lodash/merge';

import {RECEIVE_PAGE_ERRORS} from '../actions/page_actions';

export const errorsReducer = (errorsSlice = {}, action) => {
  Object.freeze(errorsSlice);
  let newSlice;
  switch(action.type) {
    case RECEIVE_PAGE_ERRORS:
      newSlice = action.errors;
      return newSlice;

    default:
      return errorsSlice;
  }
};
