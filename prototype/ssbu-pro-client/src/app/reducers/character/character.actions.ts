import { createAction, props } from '@ngrx/store';
import { CropOffsetDictionary } from 'src/app/@types/crop-offsets';
import { CharacterMetadataDictionary } from 'src/app/@types/character-metadata';
import { Hint } from 'src/app/@types/hint';

export const loadCharactersSortedIds = createAction(
  '[Character] Load Characters Sorted Ids',
  props<{ sortedIds: string[] }>()
);

export const updateCharactersFilterIds = createAction(
  '[Character] Update Characters Filter Ids',
  props<{ filterIds: string[] }>()
);

export const loadCharactersCropOffsets = createAction(
  '[Character] Load Characters Crop Offsets',
  props<{ offsets: CropOffsetDictionary }>()
);

export const loadCharactersMetadata = createAction(
  '[Character] Load Characters Metadata',
  props<{ metadata: CharacterMetadataDictionary }>()
);

export const loadCharacterHint = createAction(
  '[Character] Load Character Hint',
  props<{ characterId: string, hint: Hint }>()
);
