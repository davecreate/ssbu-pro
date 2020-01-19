const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');

const smashAfterRoller = {
  dataByCharacterId: {}
};
createReadStream('csv/SSBU Pro Data - Inkling (SH Fair Hits).csv')
.pipe(csv())
.on('data', (row) => {
  const standingHit = row.Standing !== 'N' ? true : false;
  const dashingHit = row.Dashing !== 'N' ? true : false;
  smashAfterRoller.dataByCharacterId[row.ID] = {
    id: row.ID,
    labels: [
      {
        hit: standingHit,
        title: 'standing',
        label: row.Standing
      },
      {
        hit: dashingHit,
        title: 'dashing',
        label: row.Dashing
      }
    ]
  };
})
.on('end', () => {
  const data = JSON.stringify(smashAfterRoller);
  writeFileSync('./tmp/sh-fair-hits.json', data);
  console.log('CSV file successfully processed');
});
