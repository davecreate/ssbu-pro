const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');

const dsmashOnLedge = {
  dataByCharacterId: {}
};
createReadStream('csv/SSBU Pro Data - Inkling (DSmash on Ledge).csv')
.pipe(csv())
.on('data', (row) => {
  const hit = row.Hit !== 'N' ? true : false;
  const label = (hit && row.Hit !== 'Y') ? row.Hit : '';
  dsmashOnLedge.dataByCharacterId[row.ID] = {
    id: row.ID,
    hit,
    label,
  };
})
.on('end', () => {
  const data = JSON.stringify(dsmashOnLedge);
  writeFileSync('./tmp/dsmash-on-ledge.json', data);
  console.log('CSV file successfully processed');
});
