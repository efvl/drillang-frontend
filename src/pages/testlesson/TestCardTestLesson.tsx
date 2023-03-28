import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WLessonManagePanel from "../../features/lesson/components/WLessonManagePanel";
import TestLessonManagePanel from "../../features/testlesson/components/TestLessonManagePanel";

const TestCardTestLesson = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('id=' + params.id);
    }, []);

    return (
        <>
        <Layout>
            <TestLessonManagePanel tlessonId={Number(params.id)} />
        </Layout>
        </>
    );

};

export default TestCardTestLesson;