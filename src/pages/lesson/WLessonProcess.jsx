import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LessonStepPanel from "../../features/lesson/components/LessonStepPanel";

const WLessonProcess = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('id=' + params.id);
    }, []);

    return (
        <>
        <Layout>
            <LessonStepPanel lessonId={params.id} />
        </Layout>
        </>
    );

};

export default WLessonProcess;