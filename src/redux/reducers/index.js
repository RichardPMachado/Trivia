import { combineReducers } from 'redux';
import playerReducer from './player';
import gameReducer from './game';

const rootReducer = combineReducers({ gameReducer, playerReducer });

export default rootReducer;
