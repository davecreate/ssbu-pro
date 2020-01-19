const { createReadStream, writeFileSync } = require('fs');
const csv = require('csv-parser');
const { get, concat } = require('lodash');

const loadMoveIds = async () => {
  return new Promise((resolve, reject) => {
    const movesDictionary = {};
    createReadStream('csv/SSBU Pro Data - MoveIds.csv')
    .pipe(csv())
    .on('data', (row) => {
      movesDictionary[row.MoveId] = {
        id: row.MoveId,
        name: row.MoveName,
      };
    })
    .on('end', () => {
      resolve(movesDictionary);
    });
  });
};

const loadMovesByCharacter = async () => {
  return new Promise((resolve, reject) => {
    const movesByCharacterDictionary = {};
    createReadStream('csv/SSBU Pro Data - Character Moves.csv')
    .pipe(csv())
    .on('data', (row) => {
      const prevMoves = get(movesByCharacterDictionary, `[${row.ID}].moves`, {});
      movesByCharacterDictionary[row.ID] = {
        id: row.ID,
        moves: {
          ...prevMoves,
          [row.MoveID]: {
            prettyName: row.MovePrettyName,
            filename: row.ImageFilename,
          }
        }
      };
    })
    .on('end', () => {
      resolve(movesByCharacterDictionary);
    });
  });
};

const loadSplattershotEffects = async () => {
  return new Promise((resolve, reject) => {
    const splattershotEffectsDictionary = {};
    createReadStream('csv/SSBU Pro Data - Splattershot Collision Effects.csv')
    .pipe(csv())
    .on('data', (row) => {
      splattershotEffectsDictionary[row.ID] = {
        id: row.ID,
        effect: row.Effect,
      };
    })
    .on('end', () => {
      resolve(splattershotEffectsDictionary);
    });
  });
};

const loadAndSaveMoveInteractionsData = async () => {
  const movesDictionary = await loadMoveIds();
  const movesByCharacterDictionary = await loadMovesByCharacter();
  const splattershotEffectsDictionary = await loadSplattershotEffects();

  const moveInteractions = {
    dataByCharacterId: {}
  };
  createReadStream('csv/SSBU Pro Data - Inkling (Enemy Moves) Interactions.csv')
  .pipe(csv())
  .on('data', (row) => {
    const prevData = get(moveInteractions, `dataByCharacterId[${row.ID}].data`, {});
    const moveDefaultName = get(movesDictionary, `[${row.MoveId}].name`, '');
    const movePrettyName = get(movesByCharacterDictionary, `[${row.ID}].moves[${row.MoveId}].prettyName`);
    const moveFilename = get(movesByCharacterDictionary, `[${row.ID}].moves[${row.MoveId}].filename`);
    const splattershotEffect = row.SplattershotEffect;
    const dashUnderValue = row.CanDashUnder;

    if (
      (!splattershotEffect || (splattershotEffect && splattershotEffect === 'None'))
      && !dashUnderValue
    ) {
      return;
    }

    moveInteractions.dataByCharacterId[row.ID] = {
      id: row.ID,
      data: {
        ...prevData,
        [row.MoveId]: {
          id: row.MoveId,
          name: moveDefaultName,
          prettyName: movePrettyName,
          filename: moveFilename,
        }
      }
    };

    const dashUnderNote = row.MoveNote;

    if (dashUnderValue) {
      const prevDashUnder = get(prevData, `[${row.MoveId}].dashUnder`, []);
      const newDashUnder = {
        value: dashUnderValue === 'Y',
        note: dashUnderNote,
      };

      moveInteractions.dataByCharacterId[row.ID].data[row.MoveId].dashUnder = [
        ...prevDashUnder,
        newDashUnder,
      ];
    }

    if (splattershotEffect && splattershotEffect !== 'None') {
      moveInteractions.dataByCharacterId[row.ID].data[row.MoveId].splattershot = {
        effect: splattershotEffect,
        note: row.SplattershotNote,
        clip: row.SplattershotClip,
        label: get(splattershotEffectsDictionary, splattershotEffect),
      }
    }

  })
  .on('end', () => {
    const data = JSON.stringify(moveInteractions);
    writeFileSync('./tmp/move-interactions.json', data);
    console.log('CSV file successfully processed');
  });
}

loadAndSaveMoveInteractionsData();
