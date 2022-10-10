import md5 from 'crypto-js/md5';

export const INITIAL_REQ = 'INITIAL_REQ';
export const FINAL_REQ = 'FINAL_REQ';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const GET_USER = 'GET_USER';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';
export const FIVE_NEW_QUESTIONS = 'FIVE_NEW_QUESTIONS';

const endPointToken = 'https://opentdb.com/api_token.php?command=request';

const initialRequest = () => ({ type: INITIAL_REQ });
const tokenRequest = (payload) => ({ type: TOKEN_REQUEST, payload });

const getUser = (payload) => ({ type: GET_USER, payload });

const actLogout = () => ({ type: ACTION_LOGOUT });
const questionsLoaded = (payload) => ({ type: FIVE_NEW_QUESTIONS, payload });
const finalRequest = () => ({ type: FINAL_REQ });

const getApiToken = () => async (dispatch) => {
  dispatch(initialRequest());
  try {
    const response = await fetch(endPointToken);
    const token = await response.json();
    dispatch(tokenRequest(token));
    dispatch(finalRequest());
  } catch (e) {
    throw new Error(e);
  }
};

const criarImg = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

const fetchGame = () => async (dispatch) => {
  dispatch(initialRequest());
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const results = await response.json();
    // const {
    //   results,
    //   response_code: responseCode,
    // } = await response.json();
    // if (responseCode === 0) {
    // console.log(results);
    // return { results, responseCode };
    dispatch(questionsLoaded(results));
    dispatch(finalRequest());
  } catch (e) {
    localStorage.clear();
    dispatch(actLogout());
    throw new Error(e);
  }
  // return { results, responseCode };
  // throw new Error('Token Invalid');
};

export {
  criarImg,
  getApiToken,
  initialRequest,
  finalRequest,
  tokenRequest,
  getUser,
  questionsLoaded,
  fetchGame,
  actLogout,
};
