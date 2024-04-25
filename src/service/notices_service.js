import { api, apiAuth } from "./api";

export async function getAllNotices(queryParams) {
    return new Promise((resolve, reject) => {
      api
        .get("/getAllNotices", {
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

export async function createNotice(noticeData) {
  return new Promise((resolve, reject) => {
    apiAuth
      .post("/administrador/insert-notice", noticeData, {
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

export async function editNotice(updatedData) {
  return new Promise(async (resolve, reject) => {
    return apiAuth
      .put(`/administrador/update-notice/${updatedData.id}`, updatedData)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
}

export async function deleteNotice(noticeData) {
  return new Promise((resolve, reject) => {
    apiAuth
      .delete(`/administrador/delete-notice/${noticeData.id}`, {
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
}