import React, {useContext, useEffect, useState} from "react";
import LangActionBar from "../../features/langs/components/LangActionBar";
import LangTable from "../../features/langs/components/LangTable";
import LangService from "../../features/langs/services/LangService";
import Layout from "../../layout/Layout";
import { Language } from "../../features/langs/models/Language";
import { AppContext } from "../../models/AppUserContextProvider";
import LoginForm from "../../features/login/component/LoginForm";

const RegisterPage = () => {

    return (
        <>
        <Layout>
            <LoginForm/>
        </Layout>
        </>
    );

};

export default RegisterPage;