import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AllTCardsTableRow from "./AllTCardsTableRow";

const AllTCardsTable = ({tCards, addAction}) => {

    return (
        <Container className="pt-2 px-0">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">id</th>
                        <th scope="col">Question</th>
                        <th scope="col" className="text-center">Add</th>
                    </tr>
                </thead>
                <tbody>
                    {tCards.map((item, index) =>
                        <AllTCardsTableRow key={item.id} rowNum={index + 1} tcard={item} addAction={addAction} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default AllTCardsTable;