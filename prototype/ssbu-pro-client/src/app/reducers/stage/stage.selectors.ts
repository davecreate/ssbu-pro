import { createSelector, createFeatureSelector } from '@ngrx/store';
import { reduce, get, entries, sortBy } from 'lodash';
import { State as AppState } from '../index';
import { stageFeatureKey, State } from './stage.reducer';
import { CharacterGridEntry } from '../../@types/character-grid';
import { selectRouteDashedId } from '../router/router.selectors';
import { CharacterId } from 'src/app/@types/character';

export const selectStage = createFeatureSelector<AppState, State>(stageFeatureKey);

export const selectStageDictionary = createSelector(
  selectStage,
  (state: State) => state.dictionary
);
