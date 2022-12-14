import React from "react";
import TranslateTableRow from "./TranslateTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Translate } from "../models/Translate";

interface TranslateTableProps {
    trns:Array<Translate>;
    remove:(id:number) => void;
}

const TranslateTable = (props:TranslateTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Lang</th>
                    <th scope="col">Word1</th>
                    <th scope="col">Lang</th>
                    <th scope="col">Word2</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.trns.map((item, index) =>
                        <TranslateTableRow key={item.id} rowNum={index + 1} translate={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TranslateTable;