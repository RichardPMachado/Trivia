import { FIVE_NEW_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  currentQuestion: 0,
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  // console.log('oi', payload);

  switch (action.type) {
  case FIVE_NEW_QUESTIONS:
    return {
      ...state,
      questions: payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
