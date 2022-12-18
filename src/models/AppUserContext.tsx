import { Dispatch } from "react";
import { WCardSearchRequest } from "../features/card/models/WCardSearchRequest";

export type AppUserContext = {

    wcardPageSearch?:WCardSearchRequest;

    setWCardPageSearch?: Dispatch<React.SetStateAction<WCardSearchRequest>>;

}