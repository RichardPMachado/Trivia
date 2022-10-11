import { combineReducers } from 'redux';
import player from './player';
import gameReducer from './game';

const rootReducer = combineReducers({ gameReducer, player });

export default rootReducer;
