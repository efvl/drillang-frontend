import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import WTranslateTableRow from "./WTranslateTableRow";

const WTranslateTable = ({trns, remove}) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">id</th>
                        <th scope="col">Word1</th>
                        <th scope="col">Word2</th>
                        <th scope="col" className="text-center">Add</th>
                    </tr>
                </thead>
                <tbody>
                    {trns.map((item, index) =>
                        <WTranslateTableRow key={item.id} rowNum={index + 1} translate={item} remove={remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default WTranslateTable;