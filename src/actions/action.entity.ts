import { TStatus } from '../types';

export class Action {
	constructor(
		private readonly _title: string,
		private readonly _text: string,
		private readonly _startDay: Date,
		private readonly _endDay: Date,
		private readonly _city: string,
		private readonly _tags: string[],
		private readonly _category: string,
		private readonly _status: TStatus,
		private readonly _authorId: number,
	) {}

	get title(): string {
		return this._title;
	}

	get text(): string {
		return this._text;
	}

	get startDay(): Date {
		return this._startDay;
	}

	get endDay(): Date {
		return this._endDay;
	}

	get city(): string {
		return this._city;
	}

	get tags(): string[] {
		return this._tags;
	}

	get category(): string {
		return this._category;
	}

	get status(): string {
		return this._status;
	}

	get authorId(): number {
		return this._authorId;
	}
}
