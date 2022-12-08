import { IsNumber } from 'class-validator';

export class DeleteActionDto {
	@IsNumber()
	id: number;
}
