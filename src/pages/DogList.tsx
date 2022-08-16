import { useNavigate, useSearchParams } from "react-router-dom";
import DogImageModal from "../components/DogImageModal";
import { useEffect, useRef, useState } from "react";
import dogService from "../services/dog.service";
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";

export default function DogList() {
  const [dogs, setDogs] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dogImageSelected, setDogImageSelected] = useState("");

  const [searchParams] = useSearchParams();
  const breed = searchParams.get("breed") || "";
  const navigate = useNavigate();

  const toast = useToast();
  const toastIdRef = useRef();

  useEffect(() => {
    getDogList();
  }, [breed]);

  const getDogList = async () => {
    const response = await dogService.getList(breed);
    if (response.status === 200) {
      setDogs(response.data.list);
    } else {
      console.log(response.status);
      toast.call(toastIdRef, {
        title: "Erro",
        description: "Não foi possível obter a lista de dogs",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const BREEDS = ["chihuahua", "husky", "labrador", "pug"];

  return (
    <>
      <Heading as="h5" size="sm" mx={10} mt={3}>
        Dog List
      </Heading>
      <ButtonGroup size="xs" spacing="3" px={10} py={2}>
        {BREEDS.map((breedListed) => (
          <Button
            onClick={() => navigate({ search: `?breed=${breedListed}` })}
            variant={breed == breedListed ? "solid" : "ghost"}
            colorScheme={breed == breedListed ? "blue" : "black"}
          >
            {breedListed.charAt(0).toUpperCase() + breedListed.slice(1)}
          </Button>
        ))}
      </ButtonGroup>

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap={4}
        px={10}
        py={5}
      >
        {dogs.map((dog, idx) => (
          <GridItem
            w="100%"
            h="200"
            key={idx}
            onClick={() => {
              setDogImageSelected(dog);
              setIsModalOpen(true);
            }}
          >
            <Image src={dog} alt="" boxSize="100%" objectFit="cover" />
          </GridItem>
        ))}
        <DogImageModal
          breed={breed}
          dogImage={dogImageSelected}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Grid>
    </>
  );
}
