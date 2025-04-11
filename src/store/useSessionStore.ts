import { create } from "zustand";
import {apiRequest} from "../services/apiRequest.ts";

export type SessionStatus = "loggedIn" | "noSession" | "expired" | "closed";

interface SessionStore {
    status: SessionStatus;
    token: string | null;
    isTokenChecked: boolean;
    setStatus: (status: SessionStatus) => void;
    login: (token: string) => void;
    logout: () => void;
    expireSession: () => void;
    clearSession: () => void;
    validateToken: () => Promise<void>;
   /* user: {
        id: string;
        name: string;
        role: "ADMIN" | "EMPLOYEE";
        email: string;

    } | null;*/
}

export const useSessionStore = create<SessionStore>((set, get) => ({
    status: "noSession",
    token: localStorage.getItem("token") || null,
    isTokenChecked: false,
    setStatus: (status: SessionStatus) => set({ status }),

    login: (token: string) => {
        localStorage.setItem("token", token);
        set({ status: "loggedIn", token, isTokenChecked: true });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ status: "closed", token: null, isTokenChecked: false });
    },

    expireSession: () => {
        localStorage.removeItem("token");
        set({ status: "expired", token: null, isTokenChecked: false });
    },

    clearSession: () => {
        localStorage.removeItem("token");
        set({ status: "noSession", token: null, isTokenChecked: false });
    },

    validateToken: async () => {
        const { token, expireSession, setStatus, isTokenChecked } = get();

        console.log("🔍 1 - Iniciando validación de token");

        if (!token) {
            console.log("🚫 2 - No hay token, cerrando sesión");
            setStatus("noSession");
            set({ isTokenChecked: true });
            return;
        }

        if (isTokenChecked) {
            console.log("✅ 3 - Token ya validado previamente");
            return;
        }

        console.log("🔄 4 - Token encontrado, validando con backend...");

        try {
            const data = await apiRequest("/auth/validate", {
                method: "GET",
            });

            console.log("📩 5 - Respuesta del backend:", data);

            setStatus("loggedIn");
            set({ isTokenChecked: true });
            console.log("✅ 6 - Token válido, sesión activa");
        } catch (error) {
            console.error("❌ 7 - Error validando token:", error);
            expireSession();
            set({ isTokenChecked: true });
        }
    },

}));

export default useSessionStore;
