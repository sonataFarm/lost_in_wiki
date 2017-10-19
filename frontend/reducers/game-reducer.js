import merge from 'lodash/merge';
import {
  UPDATE_CURRENT_PAGE,
  UPDATE_FOCUS_PAGE,
  START_NEW_GAME,
  FINISH_GAME
} from '../actions/game-actions.js';

export const gameReducer = (gameSlice = {}, action) => {
  Object.freeze(gameSlice);
  let newSlice;
  switch(action.type) {
    case START_NEW_GAME:
      newSlice = {
        history: [action.originTitle],
        destination: action.destinationTitle,
        currentPage: action.originTitle,
        focusPage: action.originTitle,
        difficulty: action.difficulty,
        won: false,
        playing: true
      };
      return newSlice;

    case UPDATE_CURRENT_PAGE:
      newSlice = merge({}, gameSlice);
      newSlice.currentPage = action.pageTitle;
      newSlice.history.push(action.pageTitle);
      return newSlice;

    case UPDATE_FOCUS_PAGE:
      newSlice = merge({}, gameSlice);
      newSlice.focusPage = action.pageTitle;
      return newSlice;

    case FINISH_GAME:
      newSlice = merge({}, gameSlice);
      newSlice.won = true;
      newSlice.playing = false;
      return newSlice;

    default:
      return gameSlice;
  }
};
