import axios from "axios";

const instance = () =>axios.create({
  baseURL:" http://localhost:3005/"
});

const HTTP = {
  get:(path)=>instance().get(path)
};

export { HTTP };