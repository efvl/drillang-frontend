import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AddWLessonPanel from "../../features/lesson/components/AddWLessonPanel";

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
                ? <AddWLessonPanel translateId={params.id} />
                : <AddWLessonPanel/>
            }
        </Layout>
        </>
    );

};

export default AddEditWLesson;