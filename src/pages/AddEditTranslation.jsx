import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import EditWCardPanel from "../features/card/components/EditWCardPanel";
import AddTranslatePanel from "../features/translate/components/AddTranslatePanel";

const AddEditTranslation = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('id=' + params.id + ' cardId=' + params.cardId);
    }, []);

    return (
        <>
        <Layout>
            {params.id
                ? <EditWCardPanel wcardId={params.id} />
                : <AddTranslatePanel/>
            }
        </Layout>
        </>
    );

};

export default AddEditTranslation;