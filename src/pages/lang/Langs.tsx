import React, {useContext, useEffect, useState} from "react";
import LangActionBar from "../../features/langs/components/LangActionBar";
import LangTable from "../../features/langs/components/LangTable";
import LangService from "../../features/langs/services/LangService";
import Layout from "../../layout/Layout";
import { Language } from "../../features/langs/models/Language";
import { AppContext } from "../../models/AppUserContextProvider";

const Langs = () => {

    const { wcardPageSearch, setWCardPageSearch } = useContext(AppContext);

    const [langs, setLangs] = useState<Language[]>([]);

    useEffect(() => {
        console.log(wcardPageSearch);
        fetchLanguages();
    }, []);

    async function fetchLanguages() {
        const response = await LangService.searchLanguages({});
        console.log(response.data);
        setLangs(response.data);
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

export default Langs;