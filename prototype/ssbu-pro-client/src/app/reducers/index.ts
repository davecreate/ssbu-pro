import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCharacter from './character/character.reducer';
import * as fromStage from './stage/stage.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface State {
  router: RouterReducerState;
  character: fromCharacter.State;
  stage: fromStage.State;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  character: fromCharacter.reducer,
  stage: fromStage.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
