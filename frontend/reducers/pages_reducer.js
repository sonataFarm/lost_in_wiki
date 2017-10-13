import merge from 'lodash/merge';

import {RECEIVE_BACKEND_PAGE_DATA} from '../actions/page_actions';

export const pagesReducer = (pagesSlice = {}, action) => {
  Object.freeze(pagesSlice);
  let newSlice;
  switch(action.type) {
    case RECEIVE_BACKEND_PAGE_DATA:
      newSlice = merge({}, pagesSlice);
      newSlice[action.page.title] = merge(
        newSlice[action.page.title],
        action.page
      );
      return newSlice;

    default:
      return pagesSlice;
  }
};
