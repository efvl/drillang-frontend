import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import TestLessonActionBar from "../../features/testlesson/components/TestLessonActionBar";
import TestLessonTable from "../../features/testlesson/components/TestLessonTable";
import { TestLesson } from "../../features/testlesson/models/TestLesson";
import { TestLessonSearchRequest } from "../../features/testlesson/models/TestLessonSearchRequest";
import TestLessonService from "../../features/testlesson/services/TestLessonService";
import Layout from "../../layout/Layout";

const TestLessons = () => {

    const [testLessons, setTestLessons] = useState<TestLesson[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(10);
    const [searchData, setSearchData] = useState<TestLessonSearchRequest>({curNumPage:0, sizeOfPage:10});

    useEffect(() => {
        console.log(searchData);
        fetchTestLessons(searchData);
    }, [searchData]);


    const fetchTestLessons = async (searchData:TestLessonSearchRequest) => {
        console.log(searchData);
        const response = await TestLessonService.searchTestLessons(searchData);
        console.log(response.data)
        setTestLessons(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page:number) => {
        console.log(page);
        setSearchData({...searchData, curNumPage : page}); 
    }, []);

    const deleteTestLesson = async (id:number) => {
        await TestLessonService.deleteTestLesson(id);
        fetchTestLessons(searchData);
    } 

    return (
        <>
        <Layout>
            <TestLessonActionBar/>
            <TestLessonTable testLessons={testLessons} remove={deleteTestLesson}/>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
        </Layout>
        </>
    );

};

export default TestLessons;