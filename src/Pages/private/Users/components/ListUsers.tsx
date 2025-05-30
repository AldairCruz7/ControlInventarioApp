import * as React from "react";
import { useState } from "react";
import { getUsers } from "../services/UserService.ts";
import ListModule from "../../Components/tables/ListModuleProps.tsx";
import {RegisterUser} from "./RegisterUser.tsx";

const ListUsers = () => {
    const [open, setOpen] = useState(false);

    const modalContent = (): React.JSX.Element | null => {

        return(
            <RegisterUser open={open} handleClose={() => setOpen(false)} />
        )
    }

    return (
        <ListModule
            title="Usuarios"
            fetchFunction={getUsers}
            onOpenModal={() => setOpen(true)}
            modalComponent={
                open ? modalContent() : null
            }
        />
    );
};

export default ListUsers;
