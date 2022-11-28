import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WCardActionBar from "../../features/card/components/WCardActionBar";
import WordCardTable from "../../features/card/components/WordCardTable";
import WordCardService from "../../features/card/services/WordCardService";
import Layout from "../../layout/Layout";

const WordCards = () => {

    const [wcards, setWcards] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const [languageId, setLanguageId] = useState();
    const [searchData, setSearchData] = useState(
        {
            "ids": [ 0 ],
            "language": "string",
            "word": "string",
            "curNumPage": 0,
            "sizeOfPage": 5
        }
    );

    useEffect(() => {
        fetchWordCards(searchData);
    }, [searchData]);

    const fetchWordCards = async (searchData) => {
        console.log(searchData);  
        const response = await WordCardService.searchWordCards(searchData);
        console.log(response.data);
        setWcards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page) => {
        console.log(page);
        setSearchData({...searchData, languageId : languageId, curNumPage : page}); 
    }, [searchData]);

    const handleChangeLanguage = useCallback((lang) => {
        console.log(lang);
        setLanguageId(lang.id);
        setSearchData({...searchData, languageId : lang.id, curNumPage : 0});
    }, [searchData])

    const deleteWordCard = async (id) => {
        await WordCardService.deleteWordCard(id);
        fetchWordCards(searchData);
    } 

    return (
        <>
        <Layout>
            <WCardActionBar onChangeLang={handleChangeLanguage}/>
            <WordCardTable wcards={wcards} remove={deleteWordCard}/>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
        </Layout>
        </>
    );

};

export default WordCards;