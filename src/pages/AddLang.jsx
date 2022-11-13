import React from "react";
import AddLangForm from "../features/langs/components/AddLangForm";
import Layout from "../layout/Layout";
import LangService from "../features/langs/services/LangService";
import { useNavigate } from 'react-router-dom';

const AddLang = () => {

    const navigate = useNavigate();

    const createLang = async (newLang) => {
        const response = await LangService.addLanguage(newLang);
        console.log(response.data);
        navigate('/');
    }

    return (
        <>
        <Layout>
            <AddLangForm create={createLang}/>
        </Layout>
        </>
    );

};

export default AddLang;