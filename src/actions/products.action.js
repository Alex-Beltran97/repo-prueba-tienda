import { HTTP } from "../service/fecthData";

const path = "products";

export const getProducts = async ()=>
  await HTTP.get(path);