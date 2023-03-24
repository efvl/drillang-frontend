import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from 'react-router-dom';
import { SourceInfo } from "../../features/srcinfo/models/SourceInfo";
import SourceInfoService from "../../features/srcinfo/services/SourceInfoService";
import SourceInfoForm from "../../features/srcinfo/components/SourceInfoForm";

const AddEditSourceInfo = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    const createSourceInfo = async (newSourceInfo:SourceInfo) => {
        const response = await SourceInfoService.addSourceInfo(newSourceInfo);
        console.log(response.data);
        navigate('/srcinfo');
    }

    const toEditSourceInfo = async (sourceInfo:SourceInfo) => {
        const response = await SourceInfoService.updateSourceInfo(sourceInfo);
        console.log(response.data);
        navigate('/srcinfo');
    }

    return (
        <>
        <Layout>
            {params.id
                ? <SourceInfoForm submitAction={toEditSourceInfo} isEdit={true} srcInfoId={Number(params.id)} />
                : <SourceInfoForm submitAction={createSourceInfo} isEdit={false} srcInfoId={null} />
            }
        </Layout>
        </>
    );

};

export default AddEditSourceInfo;