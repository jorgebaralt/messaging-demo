import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// navigation
import {
	createBottomTabNavigator,
	createAppContainer,
	createStackNavigator,
} from 'react-navigation';
// Screens
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';

//store
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

const ChatNav = createStackNavigator(
	{
		chat: { screen: ChatScreen },
		settings: { screen: SettingsScreen },
	},
	{
		headerMode: 'none',

		navigationOptions: {
			tabBarVisible: false,
		},
	}
);

const RootNavigation = createBottomTabNavigator({
	login: { screen: LoginScreen },
	chat: { screen: ChatNav },
});

const Root = createAppContainer(RootNavigation);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		);
	}
}

export default App;
