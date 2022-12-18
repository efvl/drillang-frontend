import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WCardSearchRequest } from "../features/card/models/WCardSearchRequest";
import { AppUserContext } from "./AppUserContext";

const AppContext = React.createContext<AppUserContext>({} as AppUserContext)

const AppUserContextProvider = ({children}) => {

    const [wcardPageSearch, setWCardPageSearch] = useState<WCardSearchRequest>({curNumPage:0, sizeOfPage:10});
    
    const value = useMemo(() => ({wcardPageSearch, setWCardPageSearch}), [wcardPageSearch]);

    console.log(value.wcardPageSearch);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );

};

export { AppUserContextProvider, AppContext };