import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LTagForm from "../../features/lessontags/components/LTagForm";
import { LTag } from "../../features/lessontags/models/LTag";
import LTagService from "../../features/lessontags/services/LTagService";
import Layout from "../../layout/Layout";

const AddEditLTag = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    const createLTag = async (newLTag:LTag) => {
        const response = await LTagService.addLTag(newLTag);
        console.log(response.data);
        navigate('/ltags')
    }

    const toEditLTag = async (ltag:LTag) => {
        const response = await LTagService.editLTag(ltag);
        console.log(response.data);
        navigate('/ltags');
    }

    return (
        <>
        <Layout>
            {params.id
                ? <LTagForm submitAction={toEditLTag} isEdit={true} ltagId={Number(params.id)} />
                : <LTagForm submitAction={createLTag} isEdit={false} ltagId={null} />
            }
        </Layout>
        </>
    );

};

export default AddEditLTag;