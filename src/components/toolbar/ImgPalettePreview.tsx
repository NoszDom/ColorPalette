import * as React from "react";

import ColorPalette from "../common/ColorPalette";
import { usePalette } from "react-palette";

export interface ImgPalettePreviewParams {
  colors: Array<string>;
  imgSrc: string;
  preview: Array<string>;
  setPreview: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ImgPalettePreview({
  colors,
  imgSrc,
  preview,
  setPreview,
}: ImgPalettePreviewParams) {
  const { data, loading } = usePalette(imgSrc);

  React.useEffect(() => {
    setPreview(getImgColors());
  }, [data]);

  function isDataNotReady(): boolean {
    return (
      !data.darkMuted &&
      !data.muted &&
      !data.vibrant &&
      !data.lightVibrant &&
      !data.lightMuted
    );
  }

  function getImgColors(): Array<string> {
    return loading || isDataNotReady()
      ? colors
      : [
          data.darkMuted!.toUpperCase(),
          data.muted!.toUpperCase(),
          data.vibrant!.toUpperCase(),
          data.lightVibrant!.toUpperCase(),
          data.lightMuted!.toUpperCase(),
        ];
  }

  return (
    <ColorPalette height="100%" colors={preview} noText={true}></ColorPalette>
  );
}
