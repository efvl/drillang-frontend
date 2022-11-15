import React, { useEffect } from "react";
import WCardForm from "../features/card/components/WCardForm";
import Layout from "../layout/Layout";
import WordCardService from "../features/card/services/WordCardService";
import { useNavigate, useParams } from 'react-router-dom';

const AddEditWCard = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    const createWCard = async (newWCard) => {
        console.log(newWCard);
        const response = await WordCardService.addWordCard(newWCard);
        console.log(response.data);
        navigate('/wcard');
    }

    const toEditWCard = async (wcard) => {
        const response = await WordCardService.editWordCard(wcard);
        console.log(response.data);
        navigate('/wcard');
    }

    return (
        <>
        <Layout>
            {params.id
                ? <WCardForm submitAction={toEditWCard} isEdit={true} wcardId={params.id} />
                : <WCardForm submitAction={createWCard} isEdit={false} />
            }
        </Layout>
        </>
    );

};

export default AddEditWCard;