export class Action {
	constructor(
		private readonly _title: string,
		private readonly _text: string,
		private readonly _startDay: string,
		private readonly _endDay: string,
		private readonly _city: string,
		private readonly _tags: string[],
		private readonly _category: string,
		private readonly _status: string,
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
}
