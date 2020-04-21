import axios from "axios";

export default axios.create({
  baseURL: "http://15.165.19.70:8080/api",
  header: {
    Authorization: "bearer accessKey",
  },
});
