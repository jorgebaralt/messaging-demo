import { USER_LOGIN, USER_LOGOUT } from './types';
import { AsyncStorage } from 'react-native';

export const userLogin = (username) => async (dispatch) => {
	const avatarRef = Math.floor(Math.random() * (5 - 1)) + 1;

	await AsyncStorage.setItem('username', username);
	await AsyncStorage.setItem('avatarRef', avatarRef.toString());

	const currentUser = {
		username: username,
		avatarRef: Number(avatarRef),
	};

	await dispatch({ type: USER_LOGIN, payload: currentUser });
};

export const getCurrentUser = () => async (dispatch) => {
	const username = await AsyncStorage.getItem('username');
	const avatarRef = await AsyncStorage.getItem('avatarRef');
	if (avatarRef && username && username.length > 0) {
		const currentUser = {
			username: username,
			avatarRef: Number(avatarRef),
		};
		return dispatch({ type: USER_LOGIN, payload: currentUser });
	}
	return dispatch({ type: USER_LOGOUT });
};

export const userLogout = () => async (dispatch) => {
	//clean up async
	await AsyncStorage.setItem('username', '');
	await AsyncStorage.setItem('avatarRef', '');
	// dispatch to clean app state
	return dispatch({ type: USER_LOGOUT });
};
