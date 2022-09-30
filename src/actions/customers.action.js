import { HTTP } from "../service/fecthData";

const path = "customers";

export const getCusttomers = async ()=>
  await HTTP.get(path);