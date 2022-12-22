import { TStatus } from './statuses';

export interface IAction {
	readonly _title: string;
	readonly _text: string;
	readonly _startDay: Date;
	readonly _endDay: Date;
	readonly _city: string;
	readonly _tags: string[];
	readonly _category: string;
	readonly _status: TStatus;
	readonly _authorId: number;
}
