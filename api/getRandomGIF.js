import GphApiClient from 'giphy-js-sdk-core';
const client = GphApiClient('Awq5410QQl0416nJogqlsinldM2s9PCA');

export const getRandomGIF = async () => {
	const { data } = await client.random('gifs', {});
	return data.images.original.gif_url;
};
