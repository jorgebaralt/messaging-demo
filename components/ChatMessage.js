import React from 'react';
import { View, Text } from 'react-native';
import { FadeImage } from './FadeImage';
import { getAvatar } from '../shared/helpers/getAvatar';
import { colors } from '../shared/styles';

export const ChatMessage = ({ message, collapse, gif }) => {
	// Time formatting
	let hours = message.timestamp.getHours();
	let minutes = message.timestamp.getMinutes();
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	const time = `${hours}:${minutes} ${ampm}`;

	// check if we should collapse text
	if (collapse) {
		return (
			<View style={{ marginLeft: 55 }}>
				{gif ? (
					<FadeImage
						uri={gif}
						style={{ height: 200, width: 'auto' }}
					/>
				) : (
					<Text>{message.text}</Text>
				)}
			</View>
		);
	}
	// Show separate message
	return (
		<View style={{ marginTop: 10 }}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<FadeImage
					image={getAvatar(message.avatarRef)}
					style={{ width: 50, height: 50 }}
				/>
				<Text
					style={{
						marginLeft: 5,
						fontSize: 16,
						fontWeight: '500',
						color: colors.black,
					}}
				>
					{message.username}
				</Text>
				<Text
					style={{
						marginLeft: 5,
						fontSize: 14,
						color: colors.darkGray,
					}}
				>
					{time}
				</Text>
			</View>
			{/* if there is a gif, render it, otherwise render text */}
			{gif ? (
				<FadeImage
					uri={gif}
					style={{
						marginLeft: 55,
						height: 200,
						width: 'auto',
						marginTop: -20,
					}}
				/>
			) : (
				<Text style={{ marginLeft: 55, marginTop: -20 }}>
					{message.text}
				</Text>
			)}
		</View>
	);
};
