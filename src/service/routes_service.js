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

export async function createRoute(routeData) {
  return new Promise((resolve, reject) => {
    api
      .post("/administrador/insert-route", routeData, {
        headers: { 
          'Cache-Control': 'no-cache'
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
}

