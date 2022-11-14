import { React } from "react";
import EditLangForm from "../features/langs/components/EditLangForm";
import Layout from "../layout/Layout";
import LangService from "../features/langs/services/LangService";
import { useNavigate, useParams } from 'react-router-dom';

const EditLang = () => {

    const navigate = useNavigate();

    const params = useParams();

    const toEditLang = async (lang) => {
        const response = await LangService.editLanguage(lang);
        console.log(response.data);
        navigate('/');
    }

    return (
        <>
        <Layout>
            <EditLangForm update={toEditLang} languageId={params.id}/>
        </Layout>
        </>
    );

};

export default EditLang;