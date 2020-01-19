export interface CharacterMetadata {
  id: string;
  name: string;
}

export interface CharacterMetadataDictionary {
  [key: string]: CharacterMetadata;
}
