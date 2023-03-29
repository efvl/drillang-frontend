import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TestLessonStepPanel from "../../features/testlesson/components/TestLessonStepPanel";

const TestLessonProcess = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('id=' + params.id);
    }, []);

    return (
        <>
        <Layout>
            <TestLessonStepPanel testLessonId={Number(params.id)} />
        </Layout>
        </>
    );

};

export default TestLessonProcess;