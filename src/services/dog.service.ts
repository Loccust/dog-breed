import IDogList from "../common/types/IDogList";
import http from "./http-common";

const getList = async (breed?: string) => {
  return await http.get<IDogList>("list", { params: { breed } });
};

export default {
  getList,
};
