import { api, apiAuth } from "./api";

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
    apiAuth
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

export async function editRoute(updatedData) {
  return new Promise(async (resolve, reject) => {
    return apiAuth
      .put(`/administrador/update-route/${updatedData.id}`, updatedData)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
}

export async function deleteRoute(routeData) {
  return new Promise((resolve, reject) => {
    apiAuth
      .delete(`/administrador/delete-route/${routeData.id}`, {
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
}

