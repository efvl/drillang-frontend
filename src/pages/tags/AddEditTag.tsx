import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LangForm from "../../features/langs/components/LangForm";
import { Language } from "../../features/langs/models/Language";
import LangService from "../../features/langs/services/LangService";
import TagForm from "../../features/tags/components/TagForm";
import { Tag } from "../../features/tags/models/Tag";
import TagService from "../../features/tags/services/TagService";
import Layout from "../../layout/Layout";

const AddEditTag = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    const createTag = async (newTag:Tag) => {
        const response = await TagService.addTag(newTag);
        console.log(response.data);
        navigate('/tags')
    }

    const toEditTag = async (tag:Tag) => {
        const response = await TagService.editTag(tag);
        console.log(response.data);
        navigate('/tags');
    }

    return (
        <>
        <Layout>
            {params.id
                ? <TagForm submitAction={toEditTag} isEdit={true} tagId={Number(params.id)} />
                : <TagForm submitAction={createTag} isEdit={false} tagId={null} />
            }
        </Layout>
        </>
    );

};

export default AddEditTag;