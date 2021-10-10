import { ColorPalette, JsonPalette } from "../models/ColorPalette";
import axios from "axios";
import { targetApiUrl } from "./Config";

export interface getPalettesParams {
  route: string;
  loaded?: boolean;
  setLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function getPalettes({
  route,
  loaded,
  setLoaded,
  setPalettes,
  setError,
}: getPalettesParams) {
  if (!loaded || loaded === undefined) {
    axios
      .get(targetApiUrl + route)
      .then((response) => {
        let palettes = response.data.map((value: JsonPalette) => {
          return {
            id: value.id,
            name: value.name,
            creatorId: value.creatorId,
            creatorName: value.creatorName,
            saves: value.saves,
            savedByCurrentUser: value.savedByCurrentUser,
            colors: JSON.parse(value.colors),
          };
        });
        setPalettes(palettes);
        if (setLoaded !== undefined) setLoaded(true);
      })
      .catch(() => {
        if (setLoaded !== undefined) setLoaded(true);
        if (setError !== undefined) setError(true);
      });
  }
}
