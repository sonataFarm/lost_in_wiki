import {pagesReducer} from './pages-reducer';
import {errorsReducer} from './errors-reducer';
import {gameReducer} from './game-reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  pages: pagesReducer,
  errors: errorsReducer,
  game: gameReducer
});

export default rootReducer;
