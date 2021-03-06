import axios from "axios";

const databaseAws = process.env.REACT_APP_DATABASE_AWS;

export const fetchData = () => {
  const userPromise = fetchUser();
  return {
    user: wrapPromise(userPromise),
  };
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

const fetchUser = () => {
  console.log("Fetching User...");
  return axios
    .get(databaseAws)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
