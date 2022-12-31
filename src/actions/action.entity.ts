import { TStatus } from '../types';

export class Action {
	readonly title: string;
	readonly text: string;
	readonly startDay: Date;
	readonly endDay: Date;
	readonly city: string;
	readonly tags: string[];
	readonly category: string;
	readonly status: TStatus;
	readonly authorId: number;
	constructor(obj: Action) {
		Object.assign(this, obj);
	}
}
