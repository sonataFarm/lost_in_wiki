export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_FOCUS_PAGE = 'UPDATE_FOCUS_PAGE';
export const ADD_PAGE_TO_HISTORY = 'ADD_PAGE_TO_HISTORY';
export const START_NEW_GAME = 'START_NEW_GAME';

export const updateCurrentPage = (pageTitle) => ({
  type: UPDATE_CURRENT_PAGE,
  pageTitle
});

export const updateFocusPage = (pageTitle) => ({
  type: UPDATE_FOCUS_PAGE,
  pageTitle
});

export const addPageToHistory = (pageTitle) => ({
  type: ADD_PAGE_TO_HISTORY,
  pageTitle
});

export const startNewGame = (originTitle, destinationTitle) => ({
  type: START_NEW_GAME,
  originTitle,
  destinationTitle
});
