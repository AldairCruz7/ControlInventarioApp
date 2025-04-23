import * as React from "react";
import { useState } from "react";
import ListModule from "../../Components/tables/ListModuleProps.tsx";
import {getDepartments} from "../services/DepartmentService.ts";
import {RegisterDepartment} from "./RegisterDepartment.tsx";

const ListDepartments = () => {
    const [open, setOpen] = useState(false);

    const modalContent = (): React.JSX.Element | null => {
        return(
            <RegisterDepartment open={open} handleClose={() => setOpen(false)} />
        )
    }

    return (
        <ListModule
            title="Departamentos"
            fetchFunction={getDepartments}
            onOpenModal={() => setOpen(true)}
            modalComponent={
                open ? modalContent() : null
            }
        />
    );
};

export default ListDepartments;
