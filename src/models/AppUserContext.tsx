import { Dispatch } from "react";
import { WCardSearchRequest } from "../features/card/models/WCardSearchRequest";
import Store from "../features/store";

export type AppUserContext = {

    wcardPageSearch?:WCardSearchRequest;

    setWCardPageSearch?: Dispatch<React.SetStateAction<WCardSearchRequest>>;

    store: Store;

}