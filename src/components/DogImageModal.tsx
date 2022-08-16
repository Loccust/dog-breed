import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

interface IDogImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    dogImage: string;
    breed: string;
  }
  
  const DogImageModal = ({
    breed,
    dogImage,
    isOpen,
    onClose,
  }: IDogImageModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{breed}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={dogImage} alt="" boxSize="100%" />
        </ModalBody>
  
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="yellow">Adotar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  export default DogImageModal;