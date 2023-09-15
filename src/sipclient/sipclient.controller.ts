import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SipclientService } from './sipclient.service';
import { CreateSipclientDto } from './dto/create-sipclient.dto';
import { UpdateSipclientDto } from './dto/update-sipclient.dto';

@Controller('sipclient')
export class SipclientController {
  constructor(private readonly sipclientService: SipclientService) {}

  @Post()
  create(@Body() createSipclientDto: CreateSipclientDto) {
    return this.sipclientService.create(createSipclientDto);
  }

  @Get()
  findAll() {
    return this.sipclientService.findAll();
  }

  @Get('csv')
  calculateCSV() {
    return this.sipclientService.getCSV();
  }

  @Get('csv2')
  calculateCSV2() {
    return this.sipclientService.getCSV2();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sipclientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSipclientDto: UpdateSipclientDto,
  ) {
    return this.sipclientService.update(+id, updateSipclientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sipclientService.remove(+id);
  }
}
