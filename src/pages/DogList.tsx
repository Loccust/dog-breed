import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dogService from "../services/dog.service";

export default function DogList() {
  const [dogs, setDogs] = useState<string[]>([]);
  const { breed } = useParams();

  useEffect(() => {
    getDogList();
  }, []);

  const getDogList = async () => {
    const response = await dogService.getList();
    if (response.status === 200) {
      setDogs(response.data.list);
    } else {
      console.log(response.status);
    }
  };

  return (
    <div>
      <h1>List</h1>
      <li>
        {dogs.map((dog, idx) => (
          <li key={idx}>
            <img src={dog} />
          </li>
        ))}
      </li>
    </div>
  );
}
