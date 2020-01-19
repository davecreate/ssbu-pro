import { CharacterMetadata } from './character-metadata';
import { Hint } from './hint';

export interface CharacterHint extends CharacterMetadata {
  hints?: Hint[];
}
