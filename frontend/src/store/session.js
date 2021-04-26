import { csrfFetch } from './csrf';

const SET_USER = "session/set-user"
const REMOVE_USER = "session/remove-user"

export const setSessionUser = (user) => {
  return { type: SET_USER, user }
};

export const removeSessionUser = () => {
  return { type: REMOVE_USER }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await res.json();
  dispatch(setSessionUser(data.user));
  return res;
}

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session/', {
    method: "DELETE",
  });
  dispatch(removeSessionUser());
  return res;
};


export default function sessionReducer(state = { user: null}, action) {
  switch(action.type) {
    case SET_USER:
      return {...state, user: action.user};
    case REMOVE_USER:
      return {...state, user: null};
    default:
      return state;
  }
}
