import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WCardActionBar from "../../features/card/components/WCardActionBar";
import WordCardTable from "../../features/card/components/WordCardTable";
import { WCard } from "../../features/card/models/WCard";
import { Language } from "../../features/langs/models/Language";
import { WCardSearchRequest } from "../../features/card/models/WCardSearchRequest";
import WordCardService from "../../features/card/services/WordCardService";
import Layout from "../../layout/Layout";
import { AppUserContext } from "../../models/AppUserContext";
import { AppContext } from "../../models/AppUserContextProvider";

const WordCards = () => {

    const { wcardPageSearch, setWCardPageSearch } = useContext(AppContext) as AppUserContext;

    const [wcards, setWcards] = useState<WCard[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        console.log('render');
    })

    // ids?:Array<number>;
    // language?:Language;
    // languageId?:number;
    // word?:string;
    // curNumPage?:number;
    // sizeOfPage?:number;

    const fetchWordCards = async (searchData:WCardSearchRequest) => {
        console.log('fetchWordCards: ' + wcardPageSearch.languageId);  
        console.log('fetchWordCards: ' + searchData.languageId); 
        if(searchData.languageId  === undefined){
            searchData.languageId = wcardPageSearch.languageId;
        }
        console.log('searchData.languageId: ' + searchData.languageId);
        if(searchData.word === undefined){
            searchData.word = wcardPageSearch.word;
        }
        const response = await WordCardService.searchWordCards(searchData);
        console.log(response.data);
        setWcards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
        setWCardPageSearch(searchData);
    }

    const handleChangePage = (page:number) => {
        console.log('page ' + page);
        let filter = {
            languageId : wcardPageSearch.languageId,
            word : wcardPageSearch.word,
            curNumPage : page,
            sizeOfPage : wcardPageSearch.sizeOfPage,
        } as WCardSearchRequest;
        fetchWordCards(filter);
        setWCardPageSearch(filter);
    }

    const handleChangeFilter = async (word:string, lang:Language) => {
        let filter = {
            languageId : lang.id,
            word : word,
            curNumPage : 0,
            sizeOfPage : wcardPageSearch.sizeOfPage,
        } as WCardSearchRequest;
        fetchWordCards(filter);
    }

    const deleteWordCard = async (id:number) => {
        await WordCardService.deleteWordCard(id);
        fetchWordCards(wcardPageSearch);
    } 

    return (
        <>
        <Layout>
            <WCardActionBar onChangeFilter={handleChangeFilter}/>
            <WordCardTable wcards={wcards} remove={deleteWordCard}/>
            {totalPages > 0 && <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>}
        </Layout>
        </>
    );

};

export default WordCards;