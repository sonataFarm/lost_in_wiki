import merge from 'lodash/merge';

import {
  RECEIVE_BACKEND_PAGE,
  RECEIVE_PAGE_LINKS,
  RECEIVE_PAGE_SUMMARY,
  RECEIVE_PAGE_RANKS,
  RECEIVE_USABLE_LINKS
} from '../actions/page-actions';

export const pagesReducer = (pagesSlice = {}, action) => {
  Object.freeze(pagesSlice);
  let newSlice;
  switch(action.type) {
    case RECEIVE_BACKEND_PAGE:
      newSlice = merge({}, pagesSlice);
      newSlice[action.page.title] = merge(
        newSlice[action.page.title],
        action.page
      );
      return newSlice;

    case RECEIVE_PAGE_RANKS:
      newSlice = merge({}, pagesSlice);
      action.pages.forEach( (page) => {
        newSlice[page.title] = newSlice[page.title] || {title: page.title};
        newSlice[page.title].pageRank = page.pageRank;
      });
      return newSlice;

    case RECEIVE_PAGE_LINKS:
      newSlice = merge({}, pagesSlice);
      newSlice[action.title] = newSlice[action.title] || {title: action.title};
      newSlice[action.title].links = action.links;
      return newSlice;

    case RECEIVE_PAGE_SUMMARY:
      newSlice = merge({}, pagesSlice);
      newSlice[action.title].summary = action.summary;
      return newSlice;

    case RECEIVE_USABLE_LINKS:
      newSlice = merge({}, pagesSlice);
      newSlice[action.title].usableLinks = action.links;
      return newSlice;

    default:
      return pagesSlice;
  }
};
