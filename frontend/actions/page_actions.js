import * as BackendAPI from '../util/backend/backend-api-util';
import * as WikiAPI from '../util/wiki/wiki-api-util'

export const RECEIVE_BACKEND_PAGE = 'RECEIVE_BACKEND_PAGE';
export const RECEIVE_PAGE_ERRORS = 'RECEIVE_PAGE_ERRORS';

export const receiveBackendPage = (page) => ({
  type: RECEIVE_BACKEND_PAGE,
  page
});

export const receivePageErrors = (errors) => ({
  type: RECEIVE_PAGE_ERRORS,
  errors: errors.responseJSON
});


export const requestBackendPage = title => dispatch => {
  BackendAPI.fetchPage(title).then(
    page => dispatch(receiveBackendPage(page)),
    errors => dispatch(receivePageErrors(errors))
  );
};
