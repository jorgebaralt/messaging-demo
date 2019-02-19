export const getAvatar = (avatar) => {
	switch (avatar) {
		case 1:
			return require('../../assets/1.png');
		case 2:
			return require('../../assets/2.png');
		case 3:
			return require('../../assets/3.png');
		case 4:
			return require('../../assets/4.png');
		default: //
	}
};
