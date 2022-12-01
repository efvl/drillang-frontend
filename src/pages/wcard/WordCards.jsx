import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WCardActionBar from "../../features/card/components/WCardActionBar";
import WordCardTable from "../../features/card/components/WordCardTable";
import WordCardService from "../../features/card/services/WordCardService";
import Layout from "../../layout/Layout";

const WordCards = () => {

    const [wcards, setWcards] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const [languageId, setLanguageId] = useState();
    const [searchData, setSearchData] = useState(
        {
            "ids": [ 0 ],
            "language": "",
            "word": "",
            "curNumPage": 0,
            "sizeOfPage": 10
        }
    );

    useEffect(() => {
        fetchWordCards(searchData);
    }, []);

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
        searchData.languageId = languageId;
        searchData.curNumPage = page;
        fetchWordCards(searchData);
    });

    const handleChangeFilter = useCallback((word, lang) => {
        setLanguageId(lang.id);
        searchData.languageId = lang.id;
        searchData.curNumPage = 0;
        searchData.word = word;
        console.log(searchData);
        fetchWordCards(searchData);
    })

    const deleteWordCard = async (id) => {
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