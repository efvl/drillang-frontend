import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WLessonActionBar from "../../features/lesson/components/WLessonActionBar";
import WLessonTable from "../../features/lesson/components/WLessonTable";
import { Lesson } from "../../features/lesson/models/Lesson";
import { LessonSearchRequest } from "../../features/lesson/models/LessonSearchRequest";
import WordLessonService from '../../features/lesson/services/WordLessonService';
import Layout from "../../layout/Layout";

const WordLessons = () => {

    const [wlessons, setWLessons] = useState<Lesson[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(10);
    const [searchData, setSearchData] = useState<LessonSearchRequest>({curNumPage:0, sizeOfPage:10});

    useEffect(() => {
        console.log(searchData);
        fetchWordLessons(searchData);
    }, [searchData]);


    const fetchWordLessons = async (searchData:LessonSearchRequest) => {
        console.log(searchData);
        const response = await WordLessonService.searchWordLessons(searchData);
        console.log(response.data)
        setWLessons(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page:number) => {
        console.log(page);
        setSearchData({...searchData, curNumPage : page}); 
    }, []);

    const deleteWordLesson = async (id:number) => {
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