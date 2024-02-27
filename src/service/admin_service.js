import { api } from "./api";

export async function login(email, password) {
    return api.post("/administrador/login", JSON.stringify({email, password}),
    {
        headers: { 'Content-Type': 'application/json' }
    }
    );
}