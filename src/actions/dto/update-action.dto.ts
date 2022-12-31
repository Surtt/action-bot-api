import {
	ArrayNotEmpty,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { TStatus } from '../../types';

export class UpdateActionDto {
	@IsNumber()
	id: number;

	@IsString({ message: 'Title is not specified' })
	title: string;

	@IsString({ message: 'Text is not specified' })
	text: string;

	@IsString({ message: 'Start Day is not specified' })
	startDay: Date;

	@IsString({ message: 'End Day is not specified' })
	endDay: Date;

	@IsString({ message: 'City is not specified' })
	city: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	tags: string[];

	@IsString({ message: 'Category is not specified' })
	category: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString({ message: 'Status is not specified' })
	status: TStatus;

	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	authorId: number;
}
