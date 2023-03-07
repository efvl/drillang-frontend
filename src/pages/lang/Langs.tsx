import React, {useContext, useEffect, useState} from "react";
import LangActionBar from "../../features/langs/components/LangActionBar";
import LangTable from "../../features/langs/components/LangTable";
import LangService from "../../features/langs/services/LangService";
import Layout from "../../layout/Layout";
import { Language } from "../../features/langs/models/Language";
import { AppContext } from "../../models/AppUserContextProvider";
import { AppUserContext } from "../../models/AppUserContext";
import { observer } from "mobx-react-lite";

const Langs = () => {

    const appUserContext = useContext(AppContext) as AppUserContext;

    const [langs, setLangs] = useState<Language[]>([]);

    useEffect(() => {
        console.log({...appUserContext.store.wcardPageSearch});
        fetchLanguages();
    }, []);

    async function fetchLanguages() {
        const response = await LangService.searchLanguages({});
        console.log(response.data);
        if(response.status == 200){
            setLangs(response.data);
        }
    }

    const deleteLanguage = async (id:number) => {
        await LangService.deleteLanguage(id);
        fetchLanguages();
    } 

    return (
        <>
        <Layout>
            <LangActionBar/>
            <LangTable langs={langs} remove={deleteLanguage}/>
        </Layout>
        </>
    );

};

export default observer(Langs);