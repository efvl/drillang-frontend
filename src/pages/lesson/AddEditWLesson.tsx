import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WLessonForm from "../../features/lesson/components/WLessonForm";

const AddEditWLesson = () => {

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
                ? <WLessonForm isEdit={true} wlessonId={Number(params.id)} />
                : <WLessonForm isEdit={false} />
            }
        </Layout>
        </>
    );

};

export default AddEditWLesson;