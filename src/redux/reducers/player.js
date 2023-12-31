import { ACTION_LOGOUT,
  FINAL_REQ,
  GET_USER,
  INITIAL_REQ,
  TOKEN_REQUEST,
  COUNTER_POINT,
  RESTART_REQ,
} from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa
  token: '',
  isLoading: false,
  isRedirect: false,
  ranking: [],
};

const player = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  const ten = 10;
  // console.log('oi', payload);

  switch (action.type) {
  case INITIAL_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case FINAL_REQ:
    return {
      ...state,
      isLoading: false,
    };
  case GET_USER:
    return {
      ...state,
      gravatarEmail: payload.email,
      name: payload.name,
    };
  case TOKEN_REQUEST:
    return {
      ...state,
      token: payload.token,
    };
  case ACTION_LOGOUT:
    return {
      ...state,
      isRedirect: true,
    };
  case COUNTER_POINT:
    return {
      ...state,
      score: state.score
      + Number(ten + (action.payload.timerPoint * action.payload.levelPoint)),
      assertions: state.assertions + 1,
      // ranking: [...state.ranking, payload],
    };
  case RESTART_REQ:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
