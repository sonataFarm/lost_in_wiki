import merge from 'lodash/merge';
import {
  UPDATE_CURRENT_PAGE,
  UPDATE_FOCUS_PAGE
} from '../actions/game_actions.js';

export const gameReducer = (gameSlice = {}, action) => {
  Object.freeze(gameSlice);
  let newSlice;
  switch(action.type) {
    case UPDATE_CURRENT_PAGE:
      newSlice = merge({}, gameSlice);
      newSlice.currentPage = action.pageTitle;
      return newSlice;

    case UPDATE_FOCUS_PAGE:
      newSlice = merge({}, gameSlice);
      newSlice.focusPage = action.pageTitle;
      return newSlice;

    default:
      return gameSlice;
  }
};
