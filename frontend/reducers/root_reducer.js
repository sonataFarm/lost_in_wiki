import {pagesReducer} from './pages_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  pages: pagesReducer
});

export default rootReducer;
