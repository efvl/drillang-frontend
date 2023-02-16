import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WCardSearchRequest } from "../features/card/models/WCardSearchRequest";
import Store from "../features/store";
import { AppUserContext } from "./AppUserContext";


const userContext = { store: new Store() } as AppUserContext;

const AppContext = React.createContext<AppUserContext>(userContext)

const AppUserContextProvider = ({children}) => {
    const [wcardPageSearch, setWCardPageSearch] = useState<WCardSearchRequest>({curNumPage:0, sizeOfPage:10});
    const value = useMemo(() => ({...userContext, wcardPageSearch, setWCardPageSearch}), [wcardPageSearch]);
    console.log(value);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );

};

export { AppUserContextProvider, AppContext };