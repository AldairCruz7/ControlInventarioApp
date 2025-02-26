import { create } from "zustand";

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
            const response = await fetch("http://localhost:8080/auth/validate", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json().catch(() => null);
            console.log("📩 5 - Respuesta del backend:", data);

            if (response.ok) {
                setStatus("loggedIn");
                set({ isTokenChecked: true });
                console.log("✅ 6 - Token válido, sesión activa");
            } else {
                console.log("⚠️ 7 - Token inválido o expirado");
                expireSession();
                set({ isTokenChecked: true });
            }
        } catch (error) {
            console.error("❌ 8 - Error validando token:", error);
            expireSession();
            set({ isTokenChecked: true });
        }
    },
}));

export default useSessionStore;
