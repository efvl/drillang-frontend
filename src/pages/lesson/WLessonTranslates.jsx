import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WLessonManagePanel from "../../features/lesson/components/WLessonManagePanel";

const WLessonTranslates = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('id=' + params.id);
    }, []);

    return (
        <>
        <Layout>
            <WLessonManagePanel wlessonId={params.id} />
        </Layout>
        </>
    );

};

export default WLessonTranslates;