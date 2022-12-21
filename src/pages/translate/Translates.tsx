import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import TranslateTable from "../../features/translate/components/TranslateTable"; 
import { Translate } from "../../features/translate/models/Translate";
import { TranslateSearchRequest } from "../../features/translate/models/TranslateSearchRequest";
import TranslateService from "../../features/translate/services/TranslateServices";
import Layout from "../../layout/Layout";

const Translates = () => {

    const [trns, setTrns] = useState<Translate[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [searchData, setSearchData] = useState<TranslateSearchRequest>({curNumPage:0, sizeOfPage:10});

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

    const handleChangePage = useCallback((page:number) => {
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