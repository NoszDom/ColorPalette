export type ColorPalette = {
    id: number;
    name: string;
    colors: Array<string>;
    creatorId: number;
    creatorName: string;
    saves: number;
    savedByCurrentUser: boolean;
  }

  export type JsonPalette = {
    id: number;
    name: string;
    colors: string;
    creatorId: number;
    creatorName: string;
    saves: number;
    savedByCurrentUser: boolean;
  }