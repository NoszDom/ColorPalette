import * as React from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useToast,
} from "@chakra-ui/react";

export default function ChagePwButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPw, setOldPw] = React.useState<string>("");
  const [newPw, setNewPw] = React.useState<string>("");
  const [newPwAg, setNewPwAg] = React.useState<string>("");
  const toast = useToast();

  function saveNewPw() {
    if (newPw === oldPw) {
      toast({
        title: "New password cannot be the same as the old one!",
        status: "error",
        isClosable: true,
      });
    } else {
      if (newPw !== newPwAg) {
        toast({
          title: "The two passwords does not match!",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "old password: " + oldPw + ", new password: " + newPw,
          status: "success",
          isClosable: true,
        });
        onClose();
      }
    }
  }

  return (
    <>
      <Button alignSelf="center" colorScheme="purple" onClick={onOpen}>
        Change password
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setOldPw("");
          setNewPw("");
          setNewPwAg("");
        }}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password:</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="first-name">Old password:</FormLabel>
                <Input
                  ref={React.useRef(null)}
                  id="old-pw"
                  type="password"
                  value={oldPw}
                  onChange={(e) => setOldPw(e.target.value)}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <FormLabel htmlFor="new-pw">New password:</FormLabel>
                <Input
                  id="new-pw"
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="new-pw-again">
                  New password again:
                </FormLabel>
                <Input
                  id="new-pw-again"
                  type="password"
                  value={newPwAg}
                  onChange={(e) => setNewPwAg(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => {
                onClose();
                setOldPw("");
                setNewPw("");
                setNewPwAg("");
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={() => saveNewPw()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}