import { createSelector, createFeatureSelector } from '@ngrx/store';
import { reduce, get, entries, sortBy, each, values } from 'lodash';
import { State as AppState } from '../index';
import { characterFeatureKey, State } from './character.reducer';
import { CharacterGridEntry } from '../../@types/character-grid';
import { selectRouteDashedId } from '../router/router.selectors';
import { CharacterId } from 'src/app/@types/character';
import { selectStageDictionary } from '../stage/stage.selectors';
import { HintId } from 'src/app/@types/hint';

export const selectCharacter = createFeatureSelector<AppState, State>(characterFeatureKey);

export const selectCharacterSortedIds = createSelector(
  selectCharacter,
  (state: State) => state.sortedIds
);

export const selectCharacterFilterIds = createSelector(
  selectCharacter,
  (state: State) => state.filterIds
);

export const selectCharacterCropOffsetDictionary = createSelector(
  selectCharacter,
  (state: State) => state.cropOffsetDictionary
);

export const selectCharacterMetadataDictionary = createSelector(
  selectCharacter,
  (state: State) => state.metadataDictionary
);

export const selectHintsByCharacterId = createSelector(
  selectCharacter,
  (state: State) => state.hintsByCharacterId
);

export const selectCharacterMetadataArray = createSelector(
  selectCharacterSortedIds,
  selectCharacterMetadataDictionary,
  (sortedIds, characterMetadata) => {
    return reduce(sortedIds, (accumulator, sortedId) => {
      accumulator.push(characterMetadata[sortedId]);
      return accumulator;
    }, []);
  }
);

export const selectCharacterGridEntries = createSelector(
  selectCharacterSortedIds,
  selectCharacterFilterIds,
  selectCharacterCropOffsetDictionary,
  selectCharacterMetadataDictionary,
  (sortedIds, filterIds, offsetsDictionary, metadataDictionary) => {
    const gridIds = (filterIds.length > 0) ? filterIds : sortedIds;
    const gridEntries = reduce<string, CharacterGridEntry[]>(gridIds, (accumulator, characterId) => {
      if (
        offsetsDictionary[characterId]
        && metadataDictionary[characterId]
        && characterId !== 'POKEMON_TRAINER_SQUIRTLE'
        && characterId !== 'POKEMON_TRAINER_IVYSAUR'
        && characterId !== 'POKEMON_TRAINER_CHARIZARD'
      ) {
        accumulator.push({
          name: metadataDictionary[characterId].name,
          id: characterId,
          offset: offsetsDictionary[characterId],
        });
      }
      return accumulator;
    }, []);

    return gridEntries;
  }
);

export const selectCharacterIdActive = createSelector(
  selectRouteDashedId,
  (dashedId) => {
    const characterId = (dashedId) ? dashedId.toLocaleUpperCase().replace(/-/g, '_') : '';
    let characterIds = [characterId];
    if (characterId === 'POKEMON_TRAINER') {
      characterIds = [
        'POKEMON_TRAINER_SQUIRTLE',
        'POKEMON_TRAINER_IVYSAUR',
        'POKEMON_TRAINER_CHARIZARD',
      ];
    } else if (
      characterId === 'SQUIRTLE'
      || characterId === 'IVYSAUR'
      || characterId === 'CHARIZARD'
    ) {
      characterIds = [
        `POKEMON_TRAINER_${characterId}`,
      ];
    }
    return characterIds;
  }
);

export const processDSmashOnLedgeHint = (characterId: string, hintRaw: any) => {
  const characterData = get(hintRaw, `data.dataByCharacterId[${characterId}]`, {});
  const labelExtra = (characterData.label) ? ` (${characterData.label})` : '';
  const hitLabel = `Down Smash <strong class="good">HITS</strong> when enemy stalls ledge${labelExtra}`;
  const notHitLabel = 'Down Smash <strong class="bad">MISSES</strong> when enemy stalls ledge';
  const label = `
    <p>
      ::REPLACE::
    </p>
  `;
  // TLDR for the "remember"
  // const label = `
  //   <p>
  //     ::REPLACE::
  //   </p>
  //   <p>
  //     NOTE: Remember <a href="https://www.youtube.com/watch?v=svBnWqWy8ww" target="_blank">ledge intangibility deterioration</a>.
  //     They'll have more invincibility when they grab the ledge based on air time before grabbing it
  //     (note that if they get hit while airbone, it will reset their air time counter),
  //     maxing out at around 2 ~ 3 seconds. However, the higher their percentage, the lower their min / max
  //     invincibility time will be. At higher percents (roughly 111%), they'll have a max of roughly 1 second of invincibility.
  //   </p>
  // `;
  return {
    name: hintRaw.name.replace('::REPLACE::', characterData.hit ? '' : 'NOT'),
    data: {
      hit: characterData.hit,
      label: (characterData.hit) ? label.replace('::REPLACE::', hitLabel) : label.replace('::REPLACE::', notHitLabel),
    }
  };
};

export const processSmashAfterRollerHint = (characterId: string, hintRaw: any) => {
  const characterData = get(hintRaw, `data.dataByCharacterId[${characterId}]`, {});
  const hitLabel = `
    <p>
      First hit of Up Smash <strong class="good">WILL</strong> unbury enemy
    </p>
  `;
  const notHitLabel = `
    <p>
      First hit of Up Smash <strong class="bad">WILL NOT</strong> unbury enemy,
      use Forward Smash or wait until bury is almost over
    </p>
  `;
  return {
    name: hintRaw.name.replace('::REPLACE::', characterData.move),
    data: {
      hit: characterData.hit,
      label: (characterData.hit) ? hitLabel : notHitLabel,
    }
  };
};

export const processSHFairHitsHint = (characterId: string, hintRaw: any) => {
  const characterData = get(hintRaw, `data.dataByCharacterId[${characterId}]`, {});
  const label = reduce(characterData.labels, (acc, val) => {
    const classname = val.hit ? 'good' : 'bad';
    const text = val.hit ? 'HITS' : 'MISSES';
    const extraText = (val.label !== 'Y' && val.label !== 'N') ? `(${val.label})` : '';
    acc += `
      <p>
        <strong class="${classname}">${text}</strong> when enemy is <strong>${val.title}</strong> ${extraText}
      </p>
    `;
    return acc;
  }, '');
  return {
    name: hintRaw.name,
    data: {
      hit: characterData.hit,
      label,
    }
  };
};

export const processRawBooyahHint = (characterId: string, hintRaw: any, stagesDictionary: any) => {
  const characterData = get(hintRaw, `data.dataByCharacterId[${characterId}]`);
  const stages = sortBy(reduce(entries(hintRaw.data.stageAddition), (stageAcc, [stageKey, stageHint]: any) => {
    const stageId = get(stageHint, 'id');
    const stageName = get(stagesDictionary, `${stageId}.name`, stageId);
    const stageAdd = get(stageHint, 'add', 0);
    // Adds a "Between"
    const modifiedInkAddition = {
      ['HALF']: hintRaw.data.inkAddition.HALF,
      ['>']: {
        min: hintRaw.data.inkAddition.FULL.min,
      },
      ['FULL']: hintRaw.data.inkAddition.FULL,
    };
    const inkEntries = entries(modifiedInkAddition);

    const titles = [
      'NONE'
    ];
    const headings = [
      '+0',
    ];
    const initialRow = ['0%', '+0', characterData.min + stageAdd];
    each(inkEntries, ([inkKey, inkVal]: any) => {
      if (inkKey === 'FULL') {
        initialRow.push(characterData.min + inkVal.max + stageAdd);
        headings.push(inkVal.max);
      } else {
        initialRow.push(characterData.min + inkVal.min + stageAdd);
        headings.push(inkVal.min);
      }
      titles.push(inkKey);
      // headings.push(`${inkKey} (${inkVal.max}/${inkVal.min})`);
    });

    const rows = [
      initialRow,
    ];

    each(entries(hintRaw.data.rageAdditon), ([rageKey, rageVal]: any) => {
      const minRageRow = [
        `${rageKey}`,
        `${rageVal.min}`,
        characterData.min + rageVal.min + stageAdd,
      ];
      const maxRageRow = [
        `${rageVal.max}`,
        characterData.min + rageVal.max + stageAdd,
      ];
      each(inkEntries, ([inkKey, inkVal]: any) => {
        if (inkKey === 'FULL') {
          minRageRow.push(characterData.min + inkVal.max + stageAdd + rageVal.min);
          maxRageRow.push(characterData.min + inkVal.max + stageAdd + rageVal.max);
        } else {
          minRageRow.push(characterData.min + inkVal.min + stageAdd + rageVal.min);
          maxRageRow.push(characterData.min + inkVal.min + stageAdd + rageVal.max);
        }

      });
      rows.push(minRageRow);
      rows.push(maxRageRow);
    });

    stageAcc.push({
      ...stageHint,
      name: `${stageName} (+${stageAdd})`,
      table: {
        titles,
        headings,
        rows,
      },
    });
    return stageAcc;
  }, []), 'add');
  const hintData = {
    stages,
    characterData,
  };
  const hint = {
    ...hintRaw,
    data: hintData
  };

  return hint;
};

export const processMoveInteractionsHint = (characterId: string, hintRaw: any) => {
  const movesDictionary = get(hintRaw, `data.dataByCharacterId[${characterId}].data`, {});
  const moves = sortBy(values(movesDictionary).sort(), 'id');
  return {
    id: HintId.MoveInteractions,
    name: hintRaw.name,
    data: {
      moves,
    }
  };
};

export const selectCharacterHintArray = createSelector(
  selectCharacterIdActive,
  selectCharacterMetadataDictionary,
  selectHintsByCharacterId,
  selectStageDictionary,
  (characterIds, metadataDictionary, hintsByCharacterId, stagesDictionary) => {
    const characterHints = reduce(characterIds, (accumulator, characterId) => {
      if (metadataDictionary[characterId]) {
        const sortedHintIds = get(hintsByCharacterId, `[${CharacterId.Inkling}].sortedIds`, []);
        const hints = reduce(sortedHintIds, (hintAcc, hintId) => {
          const hintRaw = get<any, any>(hintsByCharacterId, `[${CharacterId.Inkling}].dictionary[${hintId}]`);
          const characterData = get(hintRaw, `data.dataByCharacterId[${characterId}]`);
          // If there is no character data return early from this hint
          if (!characterData) {
            return hintAcc;
          }
          let hint: any;
          if (hintId === HintId.BooYah) {
            hint = processRawBooyahHint(characterId, hintRaw, stagesDictionary);
          } else if (hintId === HintId.SmashAfterRoller) {
            hint = processSmashAfterRollerHint(characterId, hintRaw);
          } else if (hintId === HintId.DSmashOnLedge) {
            hint = processDSmashOnLedgeHint(characterId, hintRaw);
          } else if (hintId === HintId.SHFairHits) {
            hint = processSHFairHitsHint(characterId, hintRaw);
          } else if (hintId === HintId.MoveInteractions) {
            hint = processMoveInteractionsHint(characterId, hintRaw);
          }

          if (hint) {
            hintAcc.push(hint);
          }
          return hintAcc;
        }, []);
        accumulator.push({
          ...metadataDictionary[characterId],
          hints,
        });
      }
      return accumulator;
    }, []);
    return characterHints;
  }
);

export const selectCharacterOGTags = createSelector(
  selectCharacterHintArray,
  (characterHints) => {
    // Default page title
    let title = 'SSBU Pro | Inkling';
    let ogDescription = 'Mobile-friendly reference for inkling character matchups';
    let ogImage = '/assets/og-image.png';
    if (get(characterHints, 'length') === 1) {
      const characterName = get(characterHints, '[0].name');
      const characterId = get(characterHints, '[0].id');
      const booyahHint = get(characterHints, '[0].hints[0]');
      title = `${title} vs ${characterName}`;

      const characterData = get(booyahHint, 'data.characterData', {});

      if (characterData.max > 0) {
        ogDescription = `Boo-Yah Range: ${characterData.min}% — ${characterData.max}% [${characterData.max - characterData.min + 1}%]`;
        const escapeOption = get(booyahHint, 'data.characterData.escape.available', false);
        const escapeOptionsArray = get(booyahHint, 'data.characterData.escape.options', []);
        if (escapeOption) {
          ogDescription = `${ogDescription}, escapes via ${escapeOptionsArray.join(',')}`;
        }
      } else {
        ogDescription = 'Range not available';
      }

      ogImage = `/assets/characters/${characterId}@2x.png`;
    } else if (get(characterHints, 'length') > 1) { // Pokemon trainer only for now
      title = `${title} vs Pokemon Trainer`;
      ogImage = `/assets/characters/POKEMON_TRAINER@2x.png`;
      // Start off as empty string so we can add more to it.
      const ogDescriptions = reduce(characterHints, (acc, characterHint) => {
        const characterName = get(characterHint, 'name');
        const booyahHint = get(characterHint, 'hints[0]');
        const characterData = get(booyahHint, 'data.characterData', {});
        let description = '';
        if (characterData.max > 0) {
          description = `${characterName} Boo-Yah Range: ${characterData.min}% — ${characterData.max}% [${
            characterData.max - characterData.min + 1
          }%]`;
          const escapeOption = get(booyahHint, 'data.characterData.escape.available', false);
          if (escapeOption) {
            description = `${description} (has escape option)`;
          }
        } else {
          description = `${characterName} Boo-Yah Range not available`;
        }
        acc.push(description);
        return acc;
      }, []);
      ogDescription = ogDescriptions.join(', ');
    }

    return {
      title,
      ogDescription,
      ogImage,
    };
  }
);
