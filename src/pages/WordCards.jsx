import React, {useEffect, useState} from "react";
import WCardActionBar from "../features/card/components/WCardActionBar";
import WordCardTable from "../features/card/components/WordCardTable";
import WordCardService from "../features/card/services/WordCardService";
import Layout from "../layout/Layout";

const WordCards = () => {

    const [wcards, setWcards] = useState([]);

    useEffect(() => {
        fetchWordCards();
    }, []);

    async function fetchWordCards() {
        const searchData = {
            "ids": [ 0 ],
            "language": "string",
            "word": "string"
          };
        const response = await WordCardService.searchWordCards(searchData);
        console.log(response.data);
        setWcards(response.data);
    }

    const deleteWordCard = async (id) => {
        await WordCardService.deleteWordCard(id);
        fetchWordCards();
    } 

    return (
        <>
        <Layout>
            <WCardActionBar/>
            <WordCardTable wcards={wcards} remove={deleteWordCard}/>
        </Layout>
        </>
    );

};

export default WordCards;