import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CommonNotification = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={false} // ✅ Las notificaciones no se cierran automáticamente
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
        />
    );
};

export const showNotification = (type: "loading" | "success" | "error", message: string) => {
    if (type === "loading") {
        return toast.loading(message); // ✅ Loading manualmente controlado
    } else if (type === "success") {
        return toast.success(message, { autoClose: false }); // ✅ Se cierra manualmente
    } else if (type === "error") {
        return toast.error(message, { autoClose: false }); // ✅ Se cierra manualmente
    }
};

// ✅ Ahora `closeNotification()` esperará 3 segundos antes de cerrar
export const closeNotification = () => {
    setTimeout(() => {
        toast.dismiss(); // ✅ Cierra todas las notificaciones después de 3s
    }, 1500);
};
