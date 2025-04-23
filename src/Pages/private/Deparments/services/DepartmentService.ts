import {apiRequest} from "../../../../services/apiRequest.ts";

export const getDepartments = async () => {
    try {
        return await apiRequest("/Department", {method: "GET"});
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        throw error;
    }
};
