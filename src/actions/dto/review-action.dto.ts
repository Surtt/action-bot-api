import { TStatus } from '../../../types';
import { IsNumber, IsString } from 'class-validator';

export class ReviewActionDto {
	@IsNumber()
	id: number;

	@IsString({ message: 'Status is not specified' })
	status: TStatus;
}
