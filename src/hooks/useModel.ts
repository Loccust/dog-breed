import { useState } from "react";

const useModel = <T>(initialState: T): [T, any, any] => {
  const [model, setModel] = useState<T>(initialState);

  const setObjValue = (obj: T) => setModel(obj);

  type ModelValue = string | number | boolean | Date;
  const setProp = (prop: string, value: ModelValue) =>
    setModel({ ...model, [prop]: value });

  return [model, setObjValue, setProp];
};
export default useModel;