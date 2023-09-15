const readCsv = () => {
  let date = {};
  let results = 0;
  let count = 0;
  function getSHA() {
    return new Promise((resolve, reject) => {
      createReadStream('/Users/jackzro/Downloads/momokogw2/momokogw2.csv')
        .pipe(es.split())
        .pipe(
          es.mapSync((line) => {
            let durationCall = 0;
            let tanggal = '';
            // console.log(
            //   line.split('|')[0].split(',')[9].split(' ')[0].replace('"', ''),
            // );
            console.log(line.split('|')[0].split(','));
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
            // if (line.split('|')[0].split(',')[10] === `300"`) {
            //   console.log(
            //     line.split('|')[0].split(','),
            //     line.split('|')[0].split(',').length,
            //     // [9],
            //     // .split(' ')[0]
            //     // .replace('"', ''),
            //   );
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
            // if (
            //   line.split('|')[0].split(',')[10] === `"2022-02-18 01:31:10"`
            // ) {
            //   console.log(
            //     line.split('|')[0].split(','),
            //     line.split('|')[0].split(',').length,
            //     // [9],
            //     // .split(' ')[0]
            //     // .replace('"', ''),
            //   );
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
};
