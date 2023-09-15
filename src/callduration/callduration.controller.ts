import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalldurationService } from './callduration.service';
import { CreateCalldurationDto } from './dto/create-callduration.dto';
import { UpdateCalldurationDto } from './dto/update-callduration.dto';

@Controller('callduration')
export class CalldurationController {
  constructor(private readonly calldurationService: CalldurationService) {}

  @Post()
  create(@Body() createCalldurationDto: CreateCalldurationDto) {
    return this.calldurationService.create(createCalldurationDto);
  }

  @Post('client')
  callDuration(@Body() data) {
    return this.calldurationService.getClientCallDuration(data);
  }

  @Post('clientgw1')
  callDurationgw1(@Body() data) {
    return this.calldurationService.getClientCallDurationgw1(data);
  }

  @Post('client/number')
  callDurationByNumber(@Body() data) {
    return this.calldurationService.getBillGroupBySrc(data);
  }

  @Post('client/detail')
  callDurationDetail(@Body() data) {
    return this.calldurationService.getDetailCall(data);
  }

  @Get()
  findAll() {
    return this.calldurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calldurationService.findOne(+id);
  }

  @Post('client/did')
  getDidByClient(@Body() data) {
    return this.calldurationService.getDidByClient(data.name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalldurationDto: UpdateCalldurationDto,
  ) {
    return this.calldurationService.update(+id, updateCalldurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calldurationService.remove(+id);
  }
}
