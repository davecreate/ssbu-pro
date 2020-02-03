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
    const moveDefaultName = get(movesDictionary, `[${row.MoveId}].name`, '');
    const movePrettyName = get(movesByCharacterDictionary, `[${row.ID}].moves[${row.MoveId}].prettyName`);
    const moveFilename = get(movesByCharacterDictionary, `[${row.ID}].moves[${row.MoveId}].filename`);

    moveInfo = {};

    if (row.CanDashUnder) {
      moveInfo.dashUnder = {value: row.CanDashUnder === 'Y'};
    }

    if (row.SplatBombEffect) {
      moveInfo.splatBomb = {
        effect: row.SplatBombEffect,
        note: row.SplatBombNote,
        clip: row.SplatbombClip
      }
    }

    const prevData = get(moveInteractions, `dataByCharacterId[${row.ID}].data`, {});
    // TODO: rename MoveNote to Variation?
    if (prevData[row.MoveId] && prevData[row.MoveId].variations[row.MoveNote]) {
      console.log("[WARNING] Duplicate variation: " + row.ID + " " + row.MoveId + " " + row.MoveNote)
    }
    const prevVariations = get(prevData, `[${row.MoveId}].variations`, {});
    moveInteractions.dataByCharacterId[row.ID] = {
      id: row.ID,
      data: {
        ...prevData,
        [row.MoveId]: {
          id: row.MoveId,
          name: moveDefaultName,
          prettyName: movePrettyName,
          filename: moveFilename,
          variations: {...prevVariations, [row.MoveNote]: moveInfo}
        }
      }
    };

    const splattershotEffect = row.SplattershotEffect;
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
