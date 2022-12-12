import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import TranslateTable from "../../features/translate/components/TranslateTable"; 
import TranslateService from "../../features/translate/services/TranslateServices";
import Layout from "../../layout/Layout";

const Translates = () => {

    const [trns, setTrns] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const [searchData, setSearchData] = useState(
        {
            "languageId": 0,
            "word": "string",
            "curNumPage": 0,
            "sizeOfPage": 10
        }
    );

    useEffect(() => {
        fetchTranslations(searchData);
    }, [searchData]);

    const fetchTranslations = async (searchData) => {
        console.log(searchData);  
        const response = await TranslateService.searchTranslates(searchData);
        console.log(response.data);
        setTrns(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page) => {
        console.log(page);
        setSearchData({...searchData, curNumPage : page}); 
    }, []);

    const deleteTranslation = async (id) => {
        await TranslateService.deleteTranslate(id);
        fetchTranslations(searchData);
    } 

    return (
        <>
        <Layout>
            <TranslateTable trns={trns} remove={deleteTranslation}/>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
        </Layout>
        </>
    );

};

export default Translates;