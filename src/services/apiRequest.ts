import { useSessionStore } from "../store/useSessionStore";

const baseUrl = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const { token, expireSession } = useSessionStore.getState();
    console.log('baseUrl', baseUrl)
    const isLogin = endpoint.includes("auth/login");
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && !isLogin ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                expireSession();
                throw new Error("Token expirado, inicia sesión nuevamente.");
            }

            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || "Error desconocido en la petición");
        }

        return response.json();
    } catch (error) {
        console.error("❌ Error en la petición:", error);
        throw error;
    }
};
