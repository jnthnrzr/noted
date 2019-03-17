import { combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from './messagesReducer';
import notesReducer from './notesReducer';

export default combineReducers({
  authReducer,
  errorsReducer,
  messagesReducer,
  notesReducer,
});
