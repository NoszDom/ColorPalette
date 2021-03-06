import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FiMoon, FiSun);

  return (
    <IconButton
      size="md"
      fontSize="2xl"
      variant="ghost"
      color="current"
      marginLeft="1"
      marginRight="-1"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      isRound={true}
      {...props}
    />
  );
};
