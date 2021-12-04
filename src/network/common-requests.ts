import { ColorPalette, JsonPalette } from "../models/ColorPalette";
import axios from "axios";
import { targetApiUrl } from "./config";

export interface getPalettesParams {
  route: string;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
  params: Object;
}

export async function getPalettes({
  route,
  setPalettes,
  params,
}: getPalettesParams) {
  return axios
    .get(targetApiUrl + route, { params: params })
    .then((response) => {
      let palettes = response.data.map((value: JsonPalette) => {
        return { ...value, colors: JSON.parse(value.colors) };
      });
      setPalettes(palettes);
    });
}
