import * as BackendAPI from '../util/backend/backend-api-util';
import * as WikiAPI from '../util/wiki/wiki-api-util';
import urlencode from 'urlencode';

export const RECEIVE_BACKEND_PAGE = 'RECEIVE_BACKEND_PAGE';
export const RECEIVE_PAGE_ERRORS = 'RECEIVE_PAGE_ERRORS';
export const RECEIVE_PAGE_LINKS = 'RECEIVE_PAGE_LINKS';
export const RECEIVE_PAGE_SUMMARY = 'RECEIVE_PAGE_SUMMARY';
export const RECEIVE_MAIN_IMAGE = 'RECEIVE_MAIN_IMAGE';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';

export const receiveBackendPage = (page) => ({
  type: RECEIVE_BACKEND_PAGE,
  page
});

export const receivePageErrors = (errors) => ({
  type: RECEIVE_PAGE_ERRORS,
  errors: errors.responseJSON
});

export const receivePageLinks = (title, links) => ({
  type: RECEIVE_PAGE_LINKS,
  title,
  links
});

export const receivePageSummary = (title, summary) => ({
  type: RECEIVE_PAGE_SUMMARY,
  title,
  summary
});

export const receiveMainImage = (title, image) => ({
  type: RECEIVE_MAIN_IMAGE,
  title,
  image
});

export const receiveImages = (title, images) => ({
  type: RECEIVE_IMAGES,
  title,
  images
});

export const requestBackendPage = title => dispatch => {
  BackendAPI.fetchPage(title).then(
    page => dispatch(receiveBackendPage(page)),
    errors => dispatch(receivePageErrors(errors))
  );
};

export const requestPageLinks = title => dispatch => {
  WikiAPI.fetchLinks(title).then(
    links => dispatch(receivePageLinks(title,links)),
    errors => dispatch(receivePageErrors(errors))
  );
};

export const requestPageSummary = title => dispatch => {
  WikiAPI.fetchSummary(title).then(
    summary => dispatch(receivePageSummary(summary)),
    errors => dispatch(receivePageErrors(errors))
  );
};

export const requestMainImage = title => dispatch => {
  WikiAPI.fetchMainImage(title).then(
    image => dispatch(receiveMainImage(image)),
    errors => dispatch(receivePageErrors(errors))
  );
};

export const requestImages = title => dispatch => {
  WikiAPI.fetchImages(title).then(
    images => dispatch(receiveImages(images)),
    errors => dispatch(receivePageErrors(errors))
  );
};


const encodeIdentifier = (title) => {
  // encode url identifier from page title
  return urlencode.encode(title.replace(/\s/g, '_'));
};

const decodeIdentifier = (identifier) => {
  // decode page title from url identifier
  return urlencode.decode(identifier.replace(/_/g, ' '));
};
