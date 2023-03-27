import { useContext, useState, useEffect } from "react";
import LTagActionBar from "../../features/lessontags/components/LTagActionBar";
import LTagTable from "../../features/lessontags/components/LTagTable";
import { LTag } from "../../features/lessontags/models/LTag";
import LTagService from "../../features/lessontags/services/LTagService";
import Layout from "../../layout/Layout";

const LTags = () => {

    const [ltags, setLTags] = useState<LTag[]>([]);

    useEffect(() => {
        fetchLTags();
    }, []);

    async function fetchLTags() {
        const response = await LTagService.searchLTags({});
        console.log(response.data);
        if(response.status == 200){
            setLTags(response.data);
        }
    }

    const deleteLTag = async (id:number) => {
        await LTagService.deleteLTag(id);
        fetchLTags();
    } 

    return (
        <>
        <Layout>
            <LTagActionBar/>
            <LTagTable ltags={ltags} remove={deleteLTag}/>
        </Layout>
        </>
    );

};

export default LTags;