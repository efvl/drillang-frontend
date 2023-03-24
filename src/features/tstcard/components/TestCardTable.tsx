import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { TCard } from "../models/TCard";
import TCardTableRow from "./TCardTableRow";

interface TCardTableProps {
    tcards: Array<TCard>,
    remove: (id: number) => void,
}

const TestCardTable = (props:TCardTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                    <th scope="col">Codepart</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tcards.map((item, index) =>
                        <TCardTableRow key={item.id} rowNum={index + 1} tcard={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TestCardTable;