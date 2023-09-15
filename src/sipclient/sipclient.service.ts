import { Injectable } from '@nestjs/common';
import { CreateSipclientDto } from './dto/create-sipclient.dto';
import { UpdateSipclientDto } from './dto/update-sipclient.dto';
import { createReadStream, appendFile, readFileSync } from 'fs';
const es = require('event-stream');

const Result = (durationCall, tanggal) => {
  let results = 0;
  let date = {};
  if (!isNaN(durationCall)) {
    results += durationCall;
    if (date[tanggal] === undefined) {
      console.log(tanggal);
      date[tanggal] = durationCall;
    } else {
      date[tanggal] += durationCall;
    }
  }
};

@Injectable()
export class SipclientService {
  create(createSipclientDto: CreateSipclientDto) {
    return 'This action adds a new sipclient';
  }

  findAll() {
    const array = readFileSync('/Users/jackzro/Downloads/sip_trunk.conf')
      .toString()
      .split('\n\n');
    let result = [];

    array.map((item) => {
      let target = {};
      item.split('\n').forEach((pair) => {
        let splitpair = pair.split('=');
        if (splitpair[0].includes('[') && splitpair[0].includes(']')) {
          target['clientName'] = splitpair[0];
        } else if (splitpair.length === 1) {
          target['options'] = splitpair[0];
        } else {
          let key =
            splitpair[0].charAt(0).toLowerCase() +
            splitpair[0].slice(1).split(' ').join('');

          target[key] = splitpair[1];
        }
      });
      result.push(target);
    });

    return result;
  }

  async getCSV2() {
    let date = {};
    let results = 0;

    function getSHA() {
      return new Promise((resolve, reject) => {
        createReadStream('/Users/jackzro/Downloads/momokogw2.csv')
          .pipe(es.split())
          .pipe(
            es.mapSync((line) => {
              // console.log(
              //   line.split('|')[0].split(',')[9].split(' ')[0].replace('"', ''),
              // );

              const durationCall = Number(line.split('|')[0].split(',')[13]);
              // console.log(line.split('|')[0].split(','));
              // if (line.split('|')[0].split(',').length !== 18) {
              //   console.log('tidak 18');
              // }
              if (!isNaN(durationCall)) {
                results += durationCall;
                if (
                  date[
                    line
                      .split('|')[0]
                      .split(',')[9]
                      .split(' ')[0]
                      .replace('"', '')
                  ]! == undefined
                ) {
                  date[
                    line
                      .split('|')[0]
                      .split(',')[9]
                      .split(' ')[0]
                      .replace('"', '')
                  ] = durationCall;
                } else {
                  date[
                    line
                      .split('|')[0]
                      .split(',')[9]
                      .split(' ')[0]
                      .replace('"', '')
                  ] += durationCall;
                }
              }
            }),
          )
          .on('error', function (err) {
            console.error(err);
          })
          .on('end', () => {
            let test = 0;
            for (const key in date) {
              test += date[key];
            }
            // console.log(date);
            // console.log(test);
            console.log(results);
            // console.log('CSV file successfully processed');
            resolve(date);
          });
      });
    }

    const data = getSHA();

    return data;
  }

  async getCSV() {
    let date = {};
    let results = 0;
    let count = 0;
    function getSHA() {
      return new Promise((resolve, reject) => {
        createReadStream('/Users/jackzro/Downloads/NXTELE.csv')
          .pipe(es.split())
          .pipe(
            es.mapSync((line) => {
              let durationCall = 0;
              let tanggal = '';
              if (line.split('|')[0].split(',').length === 16) {
                durationCall = Number(line.split('|')[0].split(',')[11]);
                tanggal = line
                  .split('|')[0]
                  .split(',')[9]
                  .split(' ')[0]
                  .replace('"', '');
              } else if (line.split('|')[0].split(',').length === 17) {
                durationCall = Number(line.split('|')[0].split(',')[13]);
                tanggal = line
                  .split('|')[0]
                  .split(',')[10]
                  .split(' ')[0]
                  .replace('"', '');
              } else if (line.split('|')[0].split(',').length === 18) {
                durationCall = Number(line.split('|')[0].split(',')[13]);
                tanggal = line
                  .split('|')[0]
                  .split(',')[11]
                  .split(' ')[0]
                  .replace('"', '');
              } else if (line.split('|')[0].split(',').length === 19) {
                durationCall = Number(line.split('|')[0].split(',')[14]);
                tanggal = line
                  .split('|')[0]
                  .split(',')[12]
                  .split(' ')[0]
                  .replace('"', '');
              } else if (line.split('|')[0].split(',').length === 20) {
                durationCall = Number(line.split('|')[0].split(',')[15]);
                tanggal = line
                  .split('|')[0]
                  .split(',')[13]
                  .split(' ')[0]
                  .replace('"', '');
              }

              if (!isNaN(durationCall)) {
                results += durationCall;

                if (date[tanggal] === undefined) {
                  date[tanggal] = durationCall;
                } else {
                  date[tanggal] += durationCall;
                }
              }
              // if (line.split('|')[0].split(',').length === 18) {
              //   durationCall = Number(line.split('|')[0].split(',')[13]);
              //   if (!isNaN(durationCall)) {
              //     results += durationCall;
              //     if (
              //       date[
              //         line
              //           .split('|')[0]
              //           .split(',')[9]
              //           .split(' ')[0]
              //           .replace('"', '')
              //       ]! == undefined
              //     ) {
              //       date[
              //         line
              //           .split('|')[0]
              //           .split(',')[9]
              //           .split(' ')[0]
              //           .replace('"', '')
              //       ] = durationCall;
              //     } else {
              //       date[
              //         line
              //           .split('|')[0]
              //           .split(',')[9]
              //           .split(' ')[0]
              //           .replace('"', '')
              //       ] += durationCall;
              //     }
              //   }
              // } else if (line.split('|')[0].split(',').length === 19) {
              //   durationCall = Number(line.split('|')[0].split(',')[14]);
              //   if (!isNaN(durationCall)) {
              //     results += durationCall;
              //     if (
              //       date[
              //         line
              //           .split('|')[0]
              //           .split(',')[9]
              //           .split(' ')[0]
              //           .replace('"', '')
              //       ]! == undefined
              //     ) {
              //       date[
              //         line
              //           .split('|')[0]
              //           .split(',')[9]
              //           .split(' ')[0]
              //           .replace('"', '')
              //       ] = durationCall;
              //     } else {
              //       date[
              //         line
              //           .split('|')[0]
              //           .split(',')[9]
              //           .split(' ')[0]
              //           .replace('"', '')
              //       ] += durationCall;
              //     }
              //   }
              // }

              // if (!isNaN(durationCall)) {
              //   results += durationCall;
              //   if (date[tanggal] === undefined) {
              //     console.log(tanggal);
              //     date[tanggal] = durationCall;
              //   } else {
              //     date[tanggal] += durationCall;
              //   }
              // }

              // if (!isNaN(durationCall)) {
              //   results += durationCall;
              //   if (
              //     date[
              //       line
              //         .split('|')[0]
              //         .split(',')[9]
              //         .split(' ')[0]
              //         .replace('"', '')
              //     ] === undefined
              //   ) {
              //     date[
              //       line
              //         .split('|')[0]
              //         .split(',')[9]
              //         .split(' ')[0]
              //         .replace('"', '')
              //     ] = durationCall;
              //   } else {
              //     date[
              //       line
              //         .split('|')[0]
              //         .split(',')[9]
              //         .split(' ')[0]
              //         .replace('"', '')
              //     ] += durationCall;
              //   }
              // }
            }),
          )
          .on('error', function (err) {
            console.error(err);
          })
          .on('end', () => {
            let test = 0;
            for (const key in date) {
              test += date[key];
            }
            // console.log(date);
            // // console.log(test);
            console.log(results);
            console.log(count);
            // console.log('CSV file successfully processed');
            resolve(date);
          });
      });
    }

    const data = getSHA();

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} sipclient`;
  }

  update(id: number, updateSipclientDto: UpdateSipclientDto) {
    return `This action updates a #${id} sipclient`;
  }

  remove(id: number) {
    return `This action removes a #${id} sipclient`;
  }
}
