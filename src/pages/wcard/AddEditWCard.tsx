import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from 'react-router-dom';
import AddWCardPanel from "../../features/card/components/AddWCardPanel";
import EditWCardPanel from "../../features/card/components/EditWCardPanel";

const AddEditWCard = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    return (
        <>
        <Layout>
            {params.id
                ? <EditWCardPanel wcardId={Number(params.id)} />
                : <AddWCardPanel/>
            }
        </Layout>
        </>
    );

};

export default AddEditWCard;