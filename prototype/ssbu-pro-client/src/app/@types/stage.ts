export interface Stage {
  id: string;
  name: string;
  add?: string;
}

export interface StageDictionary {
  [key: string]: Stage;
}
