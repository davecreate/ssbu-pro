const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');

const characterMetadata = {};
createReadStream('csv/SSBU Pro Data - Characters.csv')
.pipe(csv())
.on('data', (row) => {
  characterMetadata[row.ID] = {
    id: row.ID,
    name: row.Name,
  };
})
.on('end', () => {
  const data = JSON.stringify(characterMetadata, null, 2);
  writeFileSync('./tmp/metadata.json', data);
  console.log('CSV file successfully processed');
});