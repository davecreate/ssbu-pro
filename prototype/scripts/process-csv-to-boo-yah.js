const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');

const booyah = {
  inkAddition: {},
  rageAdditon: {},
  stageAddition: {},
  dataByCharacterId: {}
};
createReadStream('csv/SSBU Pro Data - Inkling (Booyah).csv')
.pipe(csv())
.on('data', (row) => {
  booyah.dataByCharacterId[row.ID] = {
    id: row.ID,
    min: parseInt(row.Min, 10),
    max: parseInt(row.Max, 10),
  };

  if (row.Stage) {
    booyah.stageAddition[row.Stage] = {
      id: row.Stage,
      add: parseInt(row.StageAdd, 10),
    };
  }

  if (row.Rage) {
    booyah.rageAdditon[row.Rage] = {
      id: row.Rage,
      min: parseInt(row.RageMin, 10),
      max: parseInt(row.RageMax, 10),
    };
  }

  if (row.Ink) {
    booyah.inkAddition[row.Ink] = {
      id: row.Ink,
      min: parseInt(row.InkMin, 10),
      max: parseInt(row.InkMax, 10),
    };
  }
  if (row.Escape && row.Escape !== 'N') {
    booyah.dataByCharacterId[row.ID].escape = {
      available: true,
      options: row.Escape.split(','),
    }
  } else {
    booyah.dataByCharacterId[row.ID].escape = {
      available: false,
      options: []
    }
  }
})
.on('end', () => {
  const data = JSON.stringify(booyah);
  writeFileSync('./tmp/boo-yah.json', data);
  console.log('CSV file successfully processed');
});
