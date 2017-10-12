import {pagesReducer} from './pages_reducer';
import {errorsReducer} from './errors_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  pages: pagesReducer,
  errors: errorsReducer
});

export default rootReducer;
