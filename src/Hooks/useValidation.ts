export const useValidation = () => {
    const isEmpty = (value: string): boolean => value.trim() === "";

    const minLength = (value: string, length: number): boolean =>
        value.trim().length >= length;

    const isEmail = (value: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const isPhone = (value: string): boolean =>
        /^[0-9]{10}$/.test(value); // Teléfono de 10 dígitos

    const onlyLetters = (value: string): boolean =>
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value);

    const isValidSelect = (value: any): boolean =>
        value !== "" && value !== null && value !== undefined;

    const getInputError = (name: string, value: any): string => {
        switch (name) {
            case "name":
                if (isEmpty(value)) return "El nombre es obligatorio";
                if (!minLength(value, 3)) return "Debe tener al menos 3 caracteres";
                if (!onlyLetters(value)) return "Solo letras permitidas";
                return "";

            case "description":
                if (isEmpty(value)) return "La descripción es obligatoria";
                if (!minLength(value, 5)) return "Debe tener al menos 5 caracteres";
                return "";

            case "email":
                if (isEmpty(value)) return "El correo es obligatorio";
                if (!isEmail(value)) return "Correo inválido";
                return "";

            case "phone":
                if (isEmpty(value)) return "El teléfono es obligatorio";
                if (!isPhone(value)) return "Debe tener 10 dígitos numéricos";
                return "";

            case "selectId": // cualquier campo tipo select (ej: departamento)
                if (!isValidSelect(value)) return "Selecciona una opción válida";
                return "";

            default:
                return "";
        }
    };

    return {
        isEmpty,
        minLength,
        isEmail,
        isPhone,
        onlyLetters,
        isValidSelect,
        getInputError,
    };
};
