export type Version = "uuid4" | "uuid1";

export type HistoryRecord = {
  type: Version;
  value: string;
  generatedDate: Date;
  firstCopiedDate?: Date;
};
// Colors
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;
