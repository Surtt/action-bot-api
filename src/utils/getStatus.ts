import { TRole } from '../types';

export const getStatus = (role: TRole) => {
	switch (role) {
		case 'admin':
			return 'approved';
		default:
			return 'moderated';
	}
};
