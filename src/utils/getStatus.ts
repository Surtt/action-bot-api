export const getStatus = (role: string) => {
	switch (role) {
		case 'admin':
			return 'approved';
		default:
			return 'moderated';
	}
};
