import {

} from '../actions/auth';

const initialState = {
  userAuthorized: false,
  dropPasswordRequest: false,
  dropPasswordFailed: false,
  user: {
    name: '',
    email: ''
  },
};

export const authStore = (state = initialState, action) => {
  switch (action.type) {

    default: {
      return state;
    }
  }
};