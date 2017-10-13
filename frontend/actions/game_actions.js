export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_FOCUS_PAGE = 'UPDATE_FOCUS_PAGE';
export const START_NEW_GAME = 'START_NEW_GAME';
export const FINISH_GAME = 'FINISH_GAME';

export const updateCurrentPage = (pageTitle) => ({
  type: UPDATE_CURRENT_PAGE,
  pageTitle
});

export const updateFocusPage = (pageTitle) => ({
  type: UPDATE_FOCUS_PAGE,
  pageTitle
});

export const startNewGame = (originTitle, destinationTitle, difficulty) => ({
  type: START_NEW_GAME,
  originTitle,
  destinationTitle
});

export const finishGame = () => ({
  type: FINISH_GAME
});
