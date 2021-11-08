import { ColorPalette, JsonPalette } from "../models/ColorPalette";
import axios from "axios";
import { targetApiUrl } from "./Config";

export interface getPalettesParams {
  route: string;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
}

export async function getPalettes({ route, setPalettes }: getPalettesParams) {
  axios.get(targetApiUrl + route).then((response) => {
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
  });
}

export interface mapPalettesParams {
  palettes: Array<JsonPalette>;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
}

export async function mapPalettes({
  palettes,
  setPalettes,
}: mapPalettesParams) {
  const mappedPalettes = palettes.map((value: JsonPalette) => {
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
  setPalettes(mappedPalettes);
}
