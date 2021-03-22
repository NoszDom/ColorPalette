import * as React from "react";
import {
  IconButton,
  Box,
  Button,
  Popover,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";
import ColorPicker, { useColor } from "react-color-palette";

export interface ColorPickerParams {
  textColor: string;
  color: string;
}

export default function ColorPickerPopUp({
  textColor,
  color,
}: ColorPickerParams) {
  const [col, setCol] = useColor("hex", color);

  return (
    <Popover placement="bottom" autoFocus>
      <PopoverTrigger>
        <IconButton
          aria-label="Pick a color"
          size="md"
          color={textColor}
          fontSize="2xl"
          icon={<CgColorPicker />}
          variant="outline"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <ColorPicker height={100} width={318} onChange={() => {}} color={col} />
      </PopoverContent>
    </Popover>
  );
}
