const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');

const stagesMetadata = {};
createReadStream('csv/SSBU Pro Data - Stages.csv')
.pipe(csv())
.on('data', (row) => {
  console.log(row);
  stagesMetadata[row.ID] = {
    id: row.ID,
    name: row.Name,
  };
})
.on('end', () => {
  const data = JSON.stringify(stagesMetadata, null, 2);
  writeFileSync('./tmp/stages.json', data);
  console.log('CSV file successfully processed');
});