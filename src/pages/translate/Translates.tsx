import React, {useCallback, useContext, useEffect, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import TranslateTable from "../../features/translate/components/TranslateTable"; 
import { Translate } from "../../features/translate/models/Translate";
import { TranslateSearchRequest } from "../../features/translate/models/TranslateSearchRequest";
import TranslateService from "../../features/translate/services/TranslateServices";
import Layout from "../../layout/Layout";
import { Language } from "../../features/langs/models/Language";
import { WTag } from "../../features/tags/models/WTag";
import { AppUserContext } from "../../models/AppUserContext";
import { AppContext } from "../../models/AppUserContextProvider";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import TranslateActionBar from "../../features/translate/components/TranslateActionBar";

const Translates = () => {

    const appUserContext = useContext(AppContext) as AppUserContext;

    const [trns, setTrns] = useState<Translate[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [searchData, setSearchData] = useState<TranslateSearchRequest>({curNumPage:0, sizeOfPage:10});

    useEffect(() => {
        console.log('render');
    }, []);

    const fetchTranslations = async () => {
        console.log(toJS(appUserContext.store)); 
        const response = await TranslateService.searchTranslates({...appUserContext.store.translatePageSearch} as TranslateSearchRequest);
        console.log(response.data);
        setTrns(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = (page:number) => {
        console.log('page ' + page);
        let filter = { ...appUserContext.store.translatePageSearch, curNumPage : page } as TranslateSearchRequest;
        appUserContext.store.setTranslatePageSearch(filter);
        fetchTranslations();
    }

    const deleteTranslation = async (id) => {
        await TranslateService.deleteTranslate(id);
        fetchTranslations();
    } 

    const handleChangeFilter = async (word:string, lang:Language, tags:WTag[]) => {
        console.log('handleChangeFilter');
        let filter = { ...appUserContext.store.translatePageSearch, 
            languageId : lang.id,
            word : word,
            tags: tags,
            curNumPage : 0,
        } as TranslateSearchRequest;
        appUserContext.store.setTranslatePageSearch(filter);
        fetchTranslations();
    }

    return (
        <>
        <Layout>
            <TranslateActionBar onChangeFilter={handleChangeFilter}/>
            <TranslateTable trns={trns} remove={deleteTranslation}/>
            {totalPages > 0 && <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>}
        </Layout>
        </>
    );

};

export default observer(Translates);