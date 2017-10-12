import * as Api from './util/page_api_util';
import merge from 'lodash/merge';

export const RECEIVE_PAGE_DATA = 'RECEIVE_PAGE_DATA';
export const RECEIVE_PAGE_ERRORS = 'RECEIVE_PAGE_ERRORS';
export const receivePageData = (page) => ({
  type: RECEIVE_PAGE_DATA,
  page
});

export const receivePageErrors = (errors) => ({
  type: RECEIVE_PAGE_ERRORS,
  errors
});

export const requestPageData = title => dispatch => {
  Api.fetchPage(title).then(
    page => dispatch(receivePageData(page)),
    errors => dispatch(receivePageErrors(errors))
  );
};
