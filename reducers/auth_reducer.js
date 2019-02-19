import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return { ...state, ...action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
