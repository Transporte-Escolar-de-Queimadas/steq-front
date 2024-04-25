import {jwtDecode} from "jwt-decode";

export function decryptJWT(jwt) {
    var decoded = jwtDecode(jwt);

    return decoded
}