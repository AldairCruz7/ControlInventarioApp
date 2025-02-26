import { useEffect, useState, useRef } from "react";
import CommonTable from "../../Components/tables/commonTable.tsx";
import { closeNotification, showNotification } from "../../Components/Notification/CommonNotification.tsx";

const data = [
    { commodity: "Soybean Meal", quantity: 192193, filledQuantity: 150000, isFilled: true, status: "Pending", unitPrice: 320 },
    { commodity: "Soybean Oil", quantity: 400545, filledQuantity: 400000, isFilled: true, status: "Completed", unitPrice: 450 },
    { commodity: "Soybeans", quantity: 421672, filledQuantity: 300000, isFilled: false, status: "Pending", unitPrice: 600 },
    { commodity: "Sugar No.11", quantity: 191327, filledQuantity: 150000, isFilled: true, status: "Completed", unitPrice: 230 },
    { commodity: "Sugar No.14", quantity: 288526, filledQuantity: 250000, isFilled: false, status: "Pending", unitPrice: 280 },
    { commodity: "Wheat", quantity: 368933, filledQuantity: 300000, isFilled: true, status: "Completed", unitPrice: 510 },
];

export const InventaryComponent = () => {
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const isProcessing = useRef(false);

    const handleProcess = async () => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        setLoadingData(true);
        showNotification("loading", "Consultando datos...");

        setTimeout(() => {
            closeNotification();
            showNotification("success", "Carga completada");
            setLoadingData(false);
            isProcessing.current = false;
        }, 3000);
    };

    useEffect(() => {
        handleProcess();
    }, []);

    return (
        <>
            {!loadingData && <CommonTable data={data} />}
        </>
    );
};
