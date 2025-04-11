import React, { useState, useEffect } from "react";
import { closeNotification, showNotification } from "../Notification/CommonNotification.tsx";

const PaginatedList: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [page, setPage] = useState(1);
  ;

    const fetchData = async (pageNumber: number) => {
        const toastId = showNotification("loading", `Cargando página ${pageNumber}...`);

        setTimeout(() => {
            setData([`Item ${pageNumber * 1}`, `Item ${pageNumber * 2}`, `Item ${pageNumber * 3}`]);

            if (toastId) {
                closeNotification();
            }

            showNotification("success", `Página ${pageNumber} cargada con éxito 🎉`);
        }, 2000);
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    return (
        <div>
            <h2>Página {page}</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => setPage((prev) => prev + 1)}>Siguiente Página</button>
        </div>
    );
};

export default PaginatedList;
