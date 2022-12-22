import { compare, hash } from 'bcryptjs';
import { TRole } from '../types';

export class User {
	private _password: string;
	private readonly _role: TRole = 'admin';
	private readonly _isDeleted: boolean = false;
	constructor(
		private readonly _name: string,
		private readonly _email: string,
		userRole?: TRole,
		passwordHash?: string,
	) {
		if (userRole) {
			this._role = userRole;
		}

		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get role(): TRole {
		return this._role;
	}

	get password(): string {
		return this._password;
	}

	get isDeleted(): boolean {
		return this._isDeleted;
	}

	public setPassword = async (pass: string, salt: number): Promise<void> => {
		this._password = await hash(pass, salt);
	};

	public comparePassword = async (pass: string): Promise<boolean> => {
		return compare(pass, this._password);
	};
}
