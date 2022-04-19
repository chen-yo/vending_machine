import * as originalAxios from "axios";

const axios = originalAxios.create({
  baseURL: "api/",
});

export const fetchFunds = () => {
  return axios
    .get("/funds")
    .then((res) => res.data)
    .catch(handleError);
};

export const addFunds = (value) => {
  return axios
    .post("/funds/deposit", { amount: value })
    .then((res) => res.data)
    .catch(handleError);
};

export const fetchDrinks = () => {
    return axios
      .get("/drinks")
      .then((res) => res.data)
      .catch(handleError);
  };

function handleError(error) {
  console.error(
    "An error occured while performing networking request to Vending machine api",
    error
  );
}
