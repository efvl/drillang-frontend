import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WLessonActionBar from "../../features/lesson/components/WLessonActionBar";
import WLessonTable from "../../features/lesson/components/WLessonTable";
import WordLessonService from '../../features/lesson/services/WordLessonService';
import Layout from "../../layout/Layout";

const WordLessons = () => {

    const [wlessons, setWLessons] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const [searchData, setSearchData] = useState(
        {
            "name": "string",
            "fromLanguage": 0,
            "toLanguage": 0,
            "curNumPage": 0,
            "sizeOfPage": 5
        }
    );

    useEffect(() => {
        console.log(searchData);
        fetchWordLessons(searchData);
    }, [searchData]);


    const fetchWordLessons = async (searchData) => {
        console.log(searchData);
        const response = await WordLessonService.searchWordLessons(searchData);
        console.log(response.data)
        setWLessons(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page) => {
        console.log(page);
        setSearchData({...searchData, curNumPage : page}); 
    }, []);

    const deleteWordLesson = async (id) => {
        await WordLessonService.deleteWordLesson(id);
        fetchWordLessons(searchData);
    } 

    return (
        <>
        <Layout>
            <WLessonActionBar/>
            <WLessonTable wlessons={wlessons} remove={deleteWordLesson}/>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
        </Layout>
        </>
    );

};

export default WordLessons;