import { createAction, props } from '@ngrx/store';
import { StageDictionary } from 'src/app/@types/stage';

export const loadStages = createAction(
  '[Stage] Load Stages',
  props<{ stages: StageDictionary }>()
);




