import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { CustomHeader, Button } from '../components';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { colors } from '../shared/styles';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {
	static navigationOptions = {
		tabBarVisible: false,
	};
	headerLeftIcon = () => (
		<Ionicons
			name="ios-arrow-back"
			size={32}
			style={{ color: colors.black }}
			onPress={() => this.props.navigation.navigate('chat')}
		/>
	);

	render() {
		return (
			<SafeAreaView>
				<CustomHeader title="Settings" left={this.headerLeftIcon()} />
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
					<Button
						color={colors.danger}
						style={{ width: '100%', marginTop: 20 }}
						onPress={() => {
							this.props.userLogout(this.props.currentUser);
							this.props.navigation.pop();
							this.props.navigation.navigate('login');
						}}
					>
						<Text>Logout</Text>
					</Button>
				</View>
			</SafeAreaView>
		);
	}
}

mapStateToProps = (state) => {
	return { currentUser: state.auth };
};

export default connect(
	mapStateToProps,
	actions
)(SettingsScreen);
