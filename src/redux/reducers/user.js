import { GET_USER, TOKEN_REQUEST } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa
  assertions: '', // número-de-acertos
  score: '', // pontuação
  gravatarEmail: '', // email-da-pessoa
  token: '',
};

function userTest(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
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
  default:
    return state;
  }
}

export default userTest;
