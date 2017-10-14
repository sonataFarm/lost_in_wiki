import merge from 'lodash/merge';

import {
  RECEIVE_BACKEND_PAGE_DATA,
  RECEIVE_PAGE_LINKS,
  RECEIVE_PAGE_SUMMARY
} from '../actions/page_actions';

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

    case RECEIVE_PAGE_LINKS:
      newSlice = merge({}, pagesSlice);
      newSlice[action.title].links = action.links;
      return newSlice;

    case RECEIVE_PAGE_SUMMARY:
      newSlice = merge({}, pagesSlice);
      newSlice[action.title].summary = action.summary;
      return newSlice;
    
    default:
      return pagesSlice;
  }
};
