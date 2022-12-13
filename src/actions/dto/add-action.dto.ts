import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class AddActionDto {
	@IsString({ message: 'Title is not specified' })
	title: string;

	@IsString({ message: 'Text is not specified' })
	text: string;

	@IsString({ message: 'Start Day is not specified' })
	startDay: string;

	@IsString({ message: 'End Day is not specified' })
	endDay: string;

	@IsString({ message: 'City is not specified' })
	city: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	tags: string[];

	@IsString({ message: 'Category is not specified' })
	category: string;
}
