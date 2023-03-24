import React, {useCallback, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import SourceInfoActionBar from "../../features/srcinfo/components/SourceInfoActionBar";
import SourceInfoTable from "../../features/srcinfo/components/SourceInfoTable";
import { SourceInfo } from "../../features/srcinfo/models/SourceInfo";
import { SourceInfoSearchRequest } from "../../features/srcinfo/models/SourceInfoSearchRequest";
import SourceInfoService from "../../features/srcinfo/services/SourceInfoService";
import Layout from "../../layout/Layout";

const SourceInfos = () => {

    const [sourceInfos, setSourceInfos] = useState<SourceInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [searchRequest, setSearchRequest] = useState<SourceInfoSearchRequest>({curNumPage:0, sizeOfPage:10});

    useEffect(() => {
        fetchSourceInfos(searchRequest);
    }, [searchRequest]);

    const fetchSourceInfos = async (searchData:SourceInfoSearchRequest) => {
        console.log(searchData);  
        const response = await SourceInfoService.searchSourceInfos(searchData);
        console.log(response.data);
        setSourceInfos(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangeFilter = async (name:string, authors:string) => {
        console.log('handleChangeFilter');
        let filter = { ...searchRequest, 
            name : name,
            authors : authors,
            curNumPage : 0,
        } as SourceInfoSearchRequest;
        setSearchRequest(filter);
        fetchSourceInfos(filter);
    }

    const handleChangePage = useCallback((page:number) => {
        console.log(page);
        setSearchRequest({...searchRequest, curNumPage : page}); 
    }, []);

    const deleteSourceInfo = async (id:number) => {
        await SourceInfoService.deleteSourceInfo(id);
        fetchSourceInfos(searchRequest);
    } 

    return (
        <>
        <Layout>
            <SourceInfoActionBar onChangeFilter={handleChangeFilter}/>
            <SourceInfoTable srcInfos={sourceInfos} remove={deleteSourceInfo}/>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
        </Layout>
        </>
    );

};

export default SourceInfos;