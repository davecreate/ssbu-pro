import { Action, createReducer, on } from '@ngrx/store';
import { CropOffsetDictionary } from 'src/app/@types/crop-offsets';
import {
  loadCharactersSortedIds,
  loadCharactersCropOffsets,
  loadCharactersMetadata,
  loadCharacterHint,
  updateCharactersFilterIds,
} from './character.actions';
import { CharacterMetadataDictionary } from 'src/app/@types/character-metadata';
import { HintDictionary } from 'src/app/@types/hint';
import { includes, get } from 'lodash';


export const characterFeatureKey = 'character';

export interface State {
  filterIds: string[];
  sortedIds: string[];
  cropOffsetDictionary: CropOffsetDictionary;
  metadataDictionary: CharacterMetadataDictionary;
  hintsByCharacterId: {
    [key: string]: {
      sortedIds: string[];
      dictionary: HintDictionary;
    }
  };
}

export const initialState: State = {
  filterIds: [],
  sortedIds: [],
  cropOffsetDictionary: {},
  metadataDictionary: {},
  hintsByCharacterId: {},
};

const characterReducer = createReducer(
  initialState,
  on(loadCharactersSortedIds, (state, action) => {
    return {
      ...state,
      sortedIds: action.sortedIds,
    };
  }),
  on(updateCharactersFilterIds, (state, action) => {
    return {
      ...state,
      filterIds: action.filterIds,
    };
  }),
  on(loadCharactersCropOffsets, (state, action) => {
    return {
      ...state,
      cropOffsetDictionary: action.offsets,
    };
  }),
  on(loadCharactersMetadata, (state, action) => {
    return {
      ...state,
      metadataDictionary: action.metadata,
    };
  }),
  on(loadCharacterHint, (state, action) => {
    const updatedIds = [...get(state, `hintsByCharacterId[${action.characterId}].sortedIds`, [])];
    if (!includes(updatedIds, action.hint.id)) {
      updatedIds.push(action.hint.id);
      updatedIds.sort();
    }

    const currentDictionary = (state.hintsByCharacterId[action.characterId])
      ? state.hintsByCharacterId[action.characterId].dictionary : {};

    return {
      ...state,
      hintsByCharacterId: {
        ...state.hintsByCharacterId,
        [action.characterId]: {
          sortedIds: updatedIds,
          dictionary: {
            ...currentDictionary,
            [action.hint.id]: action.hint,
          },
        },
      },
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return characterReducer(state, action);
}
