import * as React from "react";
import{IconButton} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";


export default function ChangePicButton(){

    return(
        <IconButton
        isRound
        fontSize="3xl"
        colorScheme="purple"
        icon={<AiOutlineEdit />}
        aria-label="edit_pic"
      />
    );
}