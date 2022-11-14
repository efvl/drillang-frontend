import React, {useEffect, useState} from "react";
import LangTable from "../features/langs/components/LangTable";
import LangService from "../features/langs/services/LangService";
import LangNavbar from "../layout/LangNavbar";
import Layout from "../layout/Layout";

const Lang = () => {

    const [langs, setLangs] = useState([]);

    useEffect(() => {
        fetchLanguages();
    }, []);

    async function fetchLanguages() {
        const searchData = {
            "ids": [ 0 ],
            "shortName": "string",
            "fullName": "string"
          };
        const response = await LangService.searchLanguages(searchData);
        console.log(response.data);
        setLangs(response.data);
    }

    const deleteLanguage = async (id) => {
        await LangService.deleteLanguage(id);
        fetchLanguages();
    } 

    return (
        <>
        <Layout>
            <LangNavbar/>
            <LangTable langs={langs} remove={deleteLanguage}/>
        </Layout>
        </>
    );

};

export default Lang;