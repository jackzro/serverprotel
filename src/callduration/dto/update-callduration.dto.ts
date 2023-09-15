import { PartialType } from '@nestjs/mapped-types';
import { CreateCalldurationDto } from './create-callduration.dto';

export class UpdateCalldurationDto extends PartialType(CreateCalldurationDto) {}
