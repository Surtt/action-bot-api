import { TStatus } from '../../types';

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

	get title() {
		return this._title;
	}

	get text() {
		return this._text;
	}

	get startDay() {
		return this._startDay;
	}

	get endDay() {
		return this._endDay;
	}

	get city() {
		return this._city;
	}

	get tags() {
		return this._tags;
	}

	get category() {
		return this._category;
	}

	get status() {
		return this._status;
	}

	get authorId() {
		return this._authorId;
	}
}
