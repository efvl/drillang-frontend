import { useContext, useState, useEffect } from "react";
import TagActionBar from "../../features/tags/components/TagActionBar";
import TagTable from "../../features/tags/components/TagTable";
import { WTag } from "../../features/tags/models/WTag";
import TagService from "../../features/tags/services/TagService";
import Layout from "../../layout/Layout";
import { AppContext } from "../../models/AppUserContextProvider";


const Tags = () => {

    const [tags, setTags] = useState<WTag[]>([]);

    useEffect(() => {
        fetchTags();
    }, []);

    async function fetchTags() {
        const response = await TagService.searchTags({});
        console.log(response.data);
        setTags(response.data);
    }

    const deleteTag = async (id:number) => {
        await TagService.deleteTag(id);
        fetchTags();
    } 

    return (
        <>
        <Layout>
            <TagActionBar/>
            <TagTable tags={tags} remove={deleteTag}/>
        </Layout>
        </>
    );

};

export default Tags;