import {apiRequest} from "../../../../services/apiRequest.ts";

export const getUsers = async () => {
    try {
        const users = await apiRequest("/users", { method: "GET" });
        return users;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        throw error;
    }
};
