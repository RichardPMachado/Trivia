import { GET_USER } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa
  assertions: '', // número-de-acertos
  score: '', // pontuação
  gravatarEmail: '', // email-da-pessoa
};

function user(state = INITIAL_STATE, action) {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      gravatarEmail: payload.email,
      name: payload.user,
    };
  default:
    return state;
  }
}

export default user;
