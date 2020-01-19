import { Action, createReducer, on } from '@ngrx/store';
import { StageDictionary } from 'src/app/@types/stage';
import { loadStages } from './stage.actions';


export const stageFeatureKey = 'stage';

export interface State {
  dictionary: StageDictionary;
}

export const initialState: State = {
  dictionary: {}
};

const stageReducer = createReducer(
  initialState,
  on(loadStages, (state, action) => {
    return {
      ...state,
      dictionary: action.stages,
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return stageReducer(state, action);
}
