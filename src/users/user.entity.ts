import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(
		private readonly _name: string,
		private readonly _email: string,
		passwordHash?: string,
	) {
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

	get password(): string {
		return this._password;
	}

	public setPassword = async (pass: string, salt: number): Promise<void> => {
		this._password = await hash(pass, salt);
	};

	public comparePassword = async (pass: string): Promise<boolean> => {
		return compare(pass, this._password);
	};
}
