import React, { Component } from 'react';
import {
	SafeAreaView,
	Text,
	ScrollView,
	View,
	TextInput,
	FlatList,
	KeyboardAvoidingView,
} from 'react-native';
import { CustomHeader, Button, ChatMessage } from '../components';
import { colors } from '../shared/styles';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getRandomGIF } from '../api';

let willFocusSubscription;
let willBlurSubscriptions;

class ChatScreen extends Component {
	state = { messageHeigth: 50, messages: [], currentMessage: '', gif: null };

	componentWillMount() {
		// first messag on mount
		setTimeout(() => {
			const avatarRef = Math.floor(Math.random() * (5 - 1)) + 1;
			this.addNewMessage('Hello, anyone there?', {
				username: 'Intro bot',
				avatarRef,
			});
		}, 1000);

		// add interval on focus
		willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => {
				this.interval = window.setInterval(() => {
					const avatarRef = Math.floor(Math.random() * (5 - 1)) + 1;
					this.addNewMessage(
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
						{
							username: 'Mock person',
							avatarRef,
						}
					);
				}, 20000);
				setTimeout(() => {
					this.interval2 = window.setInterval(() => {
						const avatarRef =
							Math.floor(Math.random() * (5 - 1)) + 1;
						this.addNewMessage(
							'Lorem Ipsum is simply dummy text of the printi',
							{
								username: 'Mock person 2',
								avatarRef,
							}
						);
					}, 30000);
				}, 10000);
			}
		);

		// Cancel interval on blur
		willBlurSubscriptions = this.props.navigation.addListener(
			'willBlur',
			() => {
				clearInterval(this.interval);
				clearImmediate(this.interval2);
			}
		);
	}

	componentWillUnmount() {
		willBlurSubscriptions.remove();
		willFocusSubscription.remove();
	}

	headerRightIcon = () => (
		<Entypo
			name="dots-three-horizontal"
			size={32}
			style={{ color: colors.black }}
			onPress={() => this.props.navigation.navigate('settings')}
		/>
	);

	// called on content size changed of the text field message
	updateSize = (messageHeigth) => {
		if (messageHeigth > 20) {
			this.setState({
				messageHeigth: messageHeigth + 40,
			});
		}
	};

	// add new message to  messages list
	addNewMessage = async (text, currentUser) => {
		const { username, avatarRef } = currentUser;
		let gif = null;
		if (text.includes('/giphy')) {
			gif = await getRandomGIF();
		}
		await this.setState((prevState) => {
			const id = prevState.messages.length.toString();
			const oldMessages = prevState.messages;
			const timestamp = new Date();
			const newMessages = oldMessages;
			newMessages.push({ text, username, avatarRef, timestamp, id, gif });
			// update messages state, and reset the height of the message text field
			return { messages: newMessages, messageHeigth: 50 };
		});

		setTimeout(() => this.scrollRef.scrollToEnd(), 50);
	};

	//render each message
	renderMessage = (message, i) => {
		const { messages } = this.state;
		let collapse = false;
		if (i > 0) {
			collapse = messages[i].username === messages[i - 1].username;
		}
		return (
			<ChatMessage
				message={message}
				collapse={collapse}
				gif={message.gif}
			/>
		);
	};

	render() {
		return (
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<SafeAreaView
					style={{ flex: 1, backgroundColor: colors.white }}
				>
					<CustomHeader
						right={this.headerRightIcon()}
						title="Sports Chat"
					/>
					<View style={{ flex: 1 }}>
						<ScrollView
							ref={(scrollRef) => {
								this.scrollRef = scrollRef;
							}}
							contentContainerStyle={{
								padding: 20,
								paddingBottom: 40,
							}}
						>
							{/* If there are no messages, show empty message */}
							{this.state.messages.length === 0 ? (
								<Text style={{ color: colors.darkGray }}>
									Chat is currently empty, type a message to
									talk with some bots :)
								</Text>
							) : (
								<FlatList
									data={this.state.messages}
									renderItem={({ item, index }) =>
										this.renderMessage(item, index)
									}
									keyExtractor={(item) => item.id}
									extraData={this.state}
								/>
							)}
						</ScrollView>
						<View
							style={[
								styles.messageViewStyle,
								{ height: this.state.messageHeigth },
							]}
						>
							<View style={styles.messageViewContainer}>
								<TextInput
									style={styles.textInputStyle}
									placeholder="Enter Message"
									multiline={true}
									editable={true}
									onContentSizeChange={(e) =>
										this.updateSize(
											e.nativeEvent.contentSize.height
										)
									}
									value={this.state.currentMessage}
									onChangeText={(currentMessage) =>
										this.setState({ currentMessage })
									}
									onFocus={() => {
										this.scrollRef.scrollToEnd();
									}}
									onBlur={() => {
										setTimeout(() => {
											this.scrollRef.scrollToEnd();
										}, 250);
									}}
								/>
								<Button
									style={styles.buttonStyle}
									onPress={() => {
										this.addNewMessage(
											this.state.currentMessage,
											this.props.currentUser
										);
										this.setState({ currentMessage: '' });
									}}
								>
									<Text style={styles.buttonTextStyle}>
										SEND
									</Text>
								</Button>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = {
	buttonStyle: {
		padding: 5,
		alignSelf: 'flex-end',
		backgroundColor: 'transparent',
		top: 0,
	},
	buttonTextStyle: {
		fontSize: 16,
		color: colors.primaryColor,
	},
	textInputStyle: {
		fontSize: 16,
		width: '70%',
	},
	messageViewStyle: {
		shadowOpacity: 0.05,
		shadowRadius: 3,
		shadowOffset: { width: 0, height: -5 },
		backgroundColor: colors.white,
		zIndex: 20,
	},
	messageViewContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
};

mapStateToProps = (state) => {
	return { currentUser: state.auth };
};

export default connect(mapStateToProps)(ChatScreen);
