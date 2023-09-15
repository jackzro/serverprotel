import { PartialType } from '@nestjs/mapped-types';
import { CreateSipclientDto } from './create-sipclient.dto';

export class UpdateSipclientDto extends PartialType(CreateSipclientDto) {}
