import { api, apiAuth } from "./api";
import cookies from "../utils/cookies";

import { decryptJWT } from "../utils/cryptography";

export async function login(loginData) {

    return api.post("/administrador/login", loginData).then((response) => {
        return new Promise((resolve, reject) => {
            if (response.data) {
                cookies.setCookie("@steq/token", response.data, null);
                // Atualiza o token ao fazer login
                apiAuth.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                resolve();  
            } else {
                reject();
            }
        })
    });
}