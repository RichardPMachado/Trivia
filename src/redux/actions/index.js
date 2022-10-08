export const INITIAL_REQ = 'INITIAL_REQ';
export const FINAL_REQ = 'FINAL_REQ';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const GET_USER = 'GET_USER';
const endPointToken = 'https://opentdb.com/api_token.php?command=request';

const initialRequest = () => ({ type: INITIAL_REQ });
const tokenRequest = (payload) => ({ type: TOKEN_REQUEST, payload });
const finalRequest = () => ({ type: FINAL_REQ });
const getUser = (payload) => ({ type: GET_USER, payload });

const getApiToken = () => async (dispatch) => {
  // dispatch(initialRequest());
  try {
    const response = await fetch(endPointToken);
    const token = await response.json();
    dispatch(tokenRequest(token));
    // dispatch(finalRequest());
  } catch (e) {
    throw new Error(e);
  }
};

// const criarImg = (email) => {
//   const hash = md5(email).toString();
//   return `https://www.gravatar.com/avatar/${hash}`;
// };

export {
  getApiToken,
  initialRequest,
  finalRequest,
  tokenRequest,
  getUser,
};
