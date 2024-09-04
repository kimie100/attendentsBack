import { PartialType } from '@nestjs/mapped-types';
import { CreateAtendentDto } from './create-atendent.dto';

export class UpdateAtendentDto extends PartialType(CreateAtendentDto) {
  userid: string;
  clockIn: Date;
  clockOut: Date;
  totalHours: string;
  imgClockIn: string;
}
