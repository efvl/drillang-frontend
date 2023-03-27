import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TestLessonForm from "../../features/testlesson/components/TestLessonForm";

const AddEditTestLesson = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('id=' + params.id);
    }, []);

    return (
        <>
        <Layout>
            {params?.id
                ? <TestLessonForm isEdit={true} testLessonId={Number(params.id)} />
                : <TestLessonForm isEdit={false} />
            }
        </Layout>
        </>
    );

};

export default AddEditTestLesson;