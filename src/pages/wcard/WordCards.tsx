import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import PaginationBar from "../../components/PaginationBar";
import WCardActionBar from "../../features/card/components/WCardActionBar";
import WordCardTable from "../../features/card/components/WordCardTable";
import { WCard } from "../../features/card/models/WCard";
import { Language } from "../../features/langs/models/Language";
import { WCardSearchRequest } from "../../features/card/models/WCardSearchRequest";
import WordCardService from "../../features/card/services/WordCardService";
import Layout from "../../layout/Layout";
import { AppUserContext } from "../../models/AppUserContext";
import { AppContext } from "../../models/AppUserContextProvider";
import { WTag } from "../../features/tags/models/WTag";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Container } from "react-bootstrap";

const WordCards = () => {

    const appUserContext = useContext(AppContext) as AppUserContext;

    const [wcards, setWcards] = useState<WCard[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        console.log('render');
    }, [])

    const fetchWordCards = async () => {
        console.log(toJS(appUserContext.store));
        const response = await WordCardService.searchWordCards({...appUserContext.store.wcardPageSearch} as WCardSearchRequest);
        console.log(response.data);
        setWcards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = (page:number) => {
        console.log('page ' + page);
        let filter = { ...appUserContext.store.wcardPageSearch, curNumPage : page } as WCardSearchRequest;
        appUserContext.store.setWCardPageSearch(filter);
        fetchWordCards();
    }

    const handleChangeFilter = async (word:string, lang:Language, tags:WTag[]) => {
        console.log('handleChangeFilter');
        let filter = { ...appUserContext.store.wcardPageSearch, 
            languageId : lang.id,
            word : word,
            tags: tags,
            curNumPage : 0,
        } as WCardSearchRequest;
        appUserContext.store.setWCardPageSearch(filter);
        fetchWordCards();
    }

    const deleteWordCard = async (id:number) => {
        await WordCardService.deleteWordCard(id);
        fetchWordCards();
    } 

    return (
        <div>
            <Layout>
                <WCardActionBar onChangeFilter={handleChangeFilter}/>
                <WordCardTable wcards={wcards} remove={deleteWordCard}/>
                {totalPages > 0 && <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>}
            </Layout>
        </div>
    );

};

export default observer(WordCards);