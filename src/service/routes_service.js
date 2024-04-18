import { api } from "./api";

export async function getAllRoutes(queryParams) {
    return new Promise((resolve, reject) => {
      api
        .get("/getAllRoutes", {
          params: queryParams,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          reject();
        });
    });
  }