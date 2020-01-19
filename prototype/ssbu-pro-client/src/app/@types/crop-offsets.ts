export interface CropOffset {
  left: number;
  top: number;
  scale: number;
}

export interface CropOffsetDictionary {
  [key: string]: CropOffset;
}
