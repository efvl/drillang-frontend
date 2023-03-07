import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WCardSearchRequest } from "../features/card/models/WCardSearchRequest";
import Store from "../features/store";
import { AppUserContext } from "./AppUserContext";


const userContext = { store: new Store() } as AppUserContext;

const AppContext = React.createContext<AppUserContext>(userContext)

const AppUserContextProvider = ({children}) => {
    console.log({...userContext.store.wcardPageSearch});

    return (
        <AppContext.Provider value={userContext}>
            {children}
        </AppContext.Provider>
    );

};

export { AppUserContextProvider, AppContext };