import { ColorPalette, JsonPalette } from "../models/ColorPalette";
import axios from "axios";
import {targetApiUrl} from "./Config";

export interface getPalettesParams {
  route: string;
  loaded?: boolean;
  setLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
}

export async function getPalettes({
  route,
  loaded,
  setLoaded,
  setPalettes,
}: getPalettesParams) {
  if (!loaded || loaded === undefined) {
    setPalettes(new Array<ColorPalette>());
    axios.get(targetApiUrl+route).then((response) => {
      response.data.map((value: JsonPalette) => {
        var palette = {
          id: value.id,
          name: value.name,
          creatorId: value.creatorId,
          creatorName: value.creatorName,
          saves: value.saves,
          savedByCurrentUser: value.savedByCurrentUser,
          colors: JSON.parse(value.colors),
        };
        setPalettes((palettes) => [...palettes, palette]);
      });
      if (setLoaded !== undefined) setLoaded(true);
    });
  }
}
