import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WCardActionBar from "../../features/card/components/WCardActionBar";
import WordCardTable from "../../features/card/components/WordCardTable";
import { WCard } from "../../features/card/models/WCard";
import { Language } from "../../features/langs/models/Language";
import { WCardSearchRequest } from "../../features/card/models/WCardSearchRequest";
import WordCardService from "../../features/card/services/WordCardService";
import Layout from "../../layout/Layout";

const WordCards = () => {

    const [wcards, setWcards] = useState<WCard[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(10);
    const [languageId, setLanguageId] = useState<number>();
    const [searchData, setSearchData] = useState<WCardSearchRequest>({curNumPage:0, sizeOfPage:10});

    useEffect(() => {
        fetchWordCards(searchData);
    }, []);

    const fetchWordCards = async (searchData:WCardSearchRequest) => {
        console.log(searchData);  
        const response = await WordCardService.searchWordCards(searchData);
        console.log(response.data);
        setWcards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page:number) => {
        console.log(page);
        searchData.languageId = languageId;
        searchData.curNumPage = page;
        fetchWordCards(searchData);
    }, [searchData]);

    const handleChangeFilter = useCallback((word:string, lang:Language) => {
        setLanguageId(lang.id);
        searchData.languageId = lang.id;
        searchData.curNumPage = 0;
        searchData.word = word;
        console.log(searchData);
        fetchWordCards(searchData);
    }, [searchData])

    const deleteWordCard = async (id:number) => {
        await WordCardService.deleteWordCard(id);
        fetchWordCards(searchData);
    } 

    return (
        <>
        <Layout>
            <WCardActionBar onChangeFilter={handleChangeFilter}/>
            <WordCardTable wcards={wcards} remove={deleteWordCard}/>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
        </Layout>
        </>
    );

};

export default WordCards;