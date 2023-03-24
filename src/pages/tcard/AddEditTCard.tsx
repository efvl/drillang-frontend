import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from 'react-router-dom';
import EditTCardPanel from "../../features/tstcard/components/EditTCardPanel";
import AddTCardPanel from "../../features/tstcard/components/AddTCardPanel";

const AddEditTCard = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    return (
        <>
        <Layout>
            {params.id
                ? <EditTCardPanel tcardId={Number(params.id)} />
                : <AddTCardPanel/>
            }
        </Layout>
        </>
    );

};

export default AddEditTCard;