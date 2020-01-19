const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');

const smashAfterRoller = {
  dataByCharacterId: {}
};
createReadStream('csv/SSBU Pro Data - Inkling (USmash on Roller).csv')
.pipe(csv())
.on('data', (row) => {
  const hit = row.Hit === 'Y' ? true : false;
  smashAfterRoller.dataByCharacterId[row.ID] = {
    id: row.ID,
    hit,
    move: hit ? 'Up Smash' : 'Foward Smash'
  };
})
.on('end', () => {
  const data = JSON.stringify(smashAfterRoller);
  writeFileSync('./tmp/smash-after-roller.json', data);
  console.log('CSV file successfully processed');
});
