import * as React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Tooltip,
  Image,
  VStack,
  Center,
} from "@chakra-ui/react";
import { AiFillPicture } from "react-icons/ai";
import ImgPalettePreview from "./ImgPalettePreview";

export interface ImgPaletteGeneratorParams {
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ImgPaletteGenerator({
  colors,
  setColors,
}: ImgPaletteGeneratorParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [preview, setPreview] = React.useState<Array<string>>(colors);
  const [imgSrc, setImgSrc] = React.useState<string>("");

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setPreview(colors);
  }, [colors]);

  function onFileUpload() {
    //@ts-ignore
    var file = inputRef.current.files[0];
    if (file === null) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const result = reader.result;
      if (result && typeof result === "string") setImgSrc(result);
    };
  }

  return (
    <>
      <Tooltip label="Image upload">
        <IconButton
          aria-label="Pick a color"
          size="md"
          fontSize="2xl"
          icon={<AiFillPicture />}
          variant="ghost"
          isRound={true}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate palette from image:</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <input
              ref={inputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={onFileUpload}
            />
            <VStack spacing={4}>
              {imgSrc && typeof imgSrc === "string" ? (
                <Image src={imgSrc} borderRadius="lg" maxH="250px" />
              ) : (
                <Center
                  border="2px"
                  borderStyle="dashed"
                  opacity={0.6}
                  w="200px"
                  h="150px"
                  borderRadius="lg"
                >
                  <AiFillPicture size={70} />
                </Center>
              )}

              <Button
                onClick={() => {
                  //@ts-ignore
                  inputRef.current.click();
                }}
              >
                Upload file
              </Button>
            </VStack>
            <Text>Preview:</Text>
            <Box width="100%" height="100px" rounded="xl" overflow="hidden">
              <ImgPalettePreview
                colors={colors}
                imgSrc={imgSrc}
                preview={preview}
                setPreview={setPreview}
              ></ImgPalettePreview>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => {
                setColors(preview);
                onClose();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
