import { Injectable } from '@nestjs/common';
import { CreateCalldurationDto } from './dto/create-callduration.dto';
import { UpdateCalldurationDto } from './dto/update-callduration.dto';
import { getManager } from 'typeorm';

@Injectable()
export class CalldurationService {
  create(createCalldurationDto: CreateCalldurationDto) {
    return 'This action adds a new callduration';
  }

  findAll() {
    return `This action returns all callduration`;
  }

  async getDetailCall(data) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT calldate,billsec as duration,src,dst FROM cdr_ba WHERE accountcode='${data.name}' 
      and calldate between '${data.start_date}' and '${data.end_date}'`,
    );
    return result;
  }

  async getClientCallDuration(data) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT date(calldate) as date,sum(billsec) as duration FROM cdr_ba WHERE accountcode='${data.name}' 
      and calldate between '${data.start_date}' and '${data.end_date}' group by date(calldate)`,
    );
    return result;
  }

  async getClientCallDurationgw1(data) {
    const entityManager = getManager();
    // const result = await entityManager.query(
    //   `SELECT caller_domain FROM cdr WHERE caller_domain like '172.14.0%' and calldate between '${data.start_date}' and '${data.end_date}'`,
    // );
    const result = await entityManager.query(
      `SELECT date(calldate) as date,sum(duration) as duration FROM cdr WHERE caller_domain like '172.14.0%' and calldate between '${data.start_date}' and '${data.end_date}' group by date(calldate)`,
    );

    return result;
  }

  async getBillGroupBySrc(data) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT src as number,sum(billsec) as duration FROM cdr_ba WHERE accountcode='${data.name}' 
      and calldate between '${data.start_date}' and '${data.end_date}' group by src`,
    );

    return result;
  }

  async getDidByClient(client) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT * FROM did WHERE usedby='${client}' `,
    );
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} callduration`;
  }

  update(id: number, updateCalldurationDto: UpdateCalldurationDto) {
    return `This action updates a #${id} callduration`;
  }

  remove(id: number) {
    return `This action removes a #${id} callduration`;
  }
}
