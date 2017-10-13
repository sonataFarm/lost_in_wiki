import merge from 'lodash/merge';
import {
  UPDATE_CURRENT_PAGE,
  UPDATE_FOCUS_PAGE,
  ADD_PAGE_TO_HISTORY,
  START_NEW_GAME
} from '../actions/game_actions.js';

export const gameReducer = (gameSlice = {}, action) => {
  Object.freeze(gameSlice);
  let newSlice;
  switch(action.type) {
    case START_NEW_GAME:
      newSlice = {
        origin: action.originTitle,
        destination: action.destinationTitle,
        currentPage: action.originTitle,
        focusPage: action.originTitle
      };

    case UPDATE_CURRENT_PAGE:
      newSlice = merge({}, gameSlice);
      newSlice.currentPage = action.pageTitle;
      return newSlice;

    case UPDATE_FOCUS_PAGE:
      newSlice = merge({}, gameSlice);
      newSlice.focusPage = action.pageTitle;
      return newSlice;

    case ADD_PAGE_TO_HISTORY:
      newSlice = merge({}, gameSlice);
      newSlice.pageHistory.push(action.pageTitle);
      return newSlice;

    default:
      return gameSlice;
  }
};
