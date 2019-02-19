import React, { Component } from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { Button, FloatingLabelInput } from '../components';
import { colors } from '../shared/styles';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LoginScreen extends Component {
	static navigationOptions = {
		tabBarVisible: false,
	};

	state = { loaded: false, messages: [], username: '' };

	async componentWillMount() {
		// Get user, if there is any saved in local storage
		await this.props.getCurrentUser();
		if (this.props.currentUser.username) {
			this.props.navigation.navigate('chat');
		}
		this.setState({ loaded: true });
	}

	render() {
		if (this.state.loaded) {
			return (
				<SafeAreaView
					style={{
						flex: 1,
					}}
					keyboardShouldPersistTaps="handled"
				>
					<ScrollView
						style={{
							flex: 1,
							paddingLeft: 20,
							paddingRight: 20,
						}}
						contentContainerStyle={{ justifyContent: 'center' }}
						keyboardShouldPersistTaps="handled"
					>
						<Text style={styles.titleStyle}>Login Screen</Text>
						<FloatingLabelInput
							value={this.state.username}
							label="Username"
							firstColor={colors.black}
							secondColor={colors.black}
							onChangeText={(username) => {
								this.setState({ username });
							}}
							autoCapitalize="none"
							style={{ marginTop: 20 }}
						/>
						<Text style={{ color: colors.darkGray }}>
							Enter any username, account will be created for you
							(no password is required), a random avatar will be
							picked for you
						</Text>
						<Button
							color={colors.primaryColor}
							style={{ width: '100%', marginTop: 20 }}
							disabled={this.state.username.length < 1}
							onPress={() => {
								this.props.userLogin(this.state.username);
								this.props.navigation.navigate('chat');
								this.setState({ username: '' });
							}}
						>
							<Text>Login</Text>
						</Button>
					</ScrollView>
				</SafeAreaView>
			);
		}
		return <View />;
	}
}

const styles = {
	titleStyle: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		marginTop: 40,
	},
};

mapStateToProps = (state) => {
	return { currentUser: state.auth };
};

export default connect(
	mapStateToProps,
	actions
)(LoginScreen);
