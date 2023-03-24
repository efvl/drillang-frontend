import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import { WTag } from "../../features/tags/models/WTag";
import { observer } from "mobx-react-lite";
import { TCard } from "../../features/tstcard/models/TCard";
import TestCardService from "../../features/tstcard/services/TestCardService";
import { TCardSearchRequest } from "../../features/tstcard/models/TCardSearchRequest";
import TCardActionBar from "../../features/tstcard/components/TCardActionBar";
import TestCardTable from "../../features/tstcard/components/TestCardTable";
import Layout from "../../layout/Layout";

const TestCards = () => {

    const [searchRequest, setSearchRequest] = useState<TCardSearchRequest>({curNumPage:0, sizeOfPage:15});
    const [tcards, setTcards] = useState<TCard[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        console.log('render');
    }, [])

    const fetchTestCards = async (filter:TCardSearchRequest) => {
        const response = await TestCardService.searchTestCards(filter);
        console.log(response.data);
        setTcards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = (page:number) => {
        console.log('page ' + page);
        let filter = { ...searchRequest, curNumPage : page } as TCardSearchRequest;
        setSearchRequest(filter);
        fetchTestCards(filter);
    }

    const handleChangeFilter = async (question:string, tags:WTag[]) => {
        console.log('handleChangeFilter');
        let filter = { ...searchRequest, 
            question : question,
            tags: tags,
            curNumPage : 0,
        } as TCardSearchRequest;
        setSearchRequest(filter);
        fetchTestCards(filter);
    }

    const deleteTestCard = async (id:number) => {
        await TestCardService.deleteTestCard(id);
        fetchTestCards(searchRequest);
    } 

    return (
        <>
        <Layout>
            <TCardActionBar onChangeFilter={handleChangeFilter}/>
            <TestCardTable tcards={tcards} remove={deleteTestCard}/>
            {totalPages > 0 && <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>}
        </Layout>
        </>
    );

};

export default observer(TestCards);