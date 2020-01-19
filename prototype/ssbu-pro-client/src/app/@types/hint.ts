export enum HintId {
  BooYah = '1-boo-yah',
  SmashAfterRoller = '2-smash-after-roller',
  DSmashOnLedge = '3-dsmash-on-ledge',
  SHFairHits = '4-sh-fair-hits',
  MoveInteractions = 'move-interactions',
}

export enum HintName {
  BooYah = 'Up Throw > Up Air (Boo-Yah)',
  SmashAfterRoller = 'Prefer (::REPLACE::) After Roller',
  DSmashOnLedge = 'Down Smash WILL ::REPLACE:: HIT on Ledge',
  SHFairHits = 'Rising Short Hop Forward Air',
  MoveInteractions = 'Move Interactions',
}

export interface Hint {
  id: string;
  name: string;
  data: any;
}

export interface HintDictionary {
  [key: string]: Hint;
}
